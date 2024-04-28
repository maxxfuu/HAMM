"""Feature routes."""

import os
from pathlib import Path
from typing import Annotated
from moviepy.editor import *
from fastapi import (
    APIRouter,
    status,
    HTTPException,
    File,
    UploadFile,
    Form,
)
from pydub import AudioSegment
import shutil

from app.dependencies.definition import generate_definition
from app.dependencies.summary import generate_summary
from app.dependencies.transcript import generate_transcript
from app.dependencies.db import update_meeting


router = APIRouter()


MEDIA_EXTENSIONS = {
    "image": ["png", "jpg", "webp"],
    "video": ["mp3", "mp4", "webm"],
}


@router.post("/notes")
def get_notes(meeting_id: Annotated[str, Form()], file: UploadFile = File(...)):
    """Get meeting analysis from audio."""
    # Define the directory to save the file, change as per your requirement
    upload_folder = Path(__file__).parent / "audio"
    upload_folder.mkdir(parents=True, exist_ok=True)
    [f.unlink() for f in Path("audio").glob("*") if f.is_file()]

    try:
        # Define the location to save the incoming file temporarily
        temp_file_path = upload_folder / f"temp_{file.filename}"

        # Save the uploaded file temporarily
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Check if the file is already in mp3 format
        if file.content_type == "audio/mp3":
            final_path = upload_folder / audio
            temp_file_path.rename(
                final_path
            )  # Rename temp file to final file directly if it's already mp3
        else:
            # Convert the file to mp3 using pydub
            audio = AudioSegment.from_file(temp_file_path)
            final_path = upload_folder / ("audio.mp3")
            audio.export(final_path, format="mp3")

    except Exception as e:
        # Handle errors in file processing
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"File {file.filename} has unsupported extension type",
        )

    finally:
        # Clean up: close the file and delete the temporary file if it exists
        file.close()
        if temp_file_path.exists():
            temp_file_path.unlink()  # Remove temporary file

        trancript = generate_transcript(upload_folder)
        definition = generate_definition(trancript)
        summary = generate_summary(trancript)

        print(definition)

        update_meeting(
            meeting_id,
            summary,
            [
                {"term": "Term", "definition": f"{definition}"},
            ],
        )

        return
