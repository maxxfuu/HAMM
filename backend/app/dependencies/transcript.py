import asyncio, json, os, json
from dotenv import load_dotenv
from deepgram import Deepgram


load_dotenv()

dg = Deepgram(os.getenv("DEEPGRAM_API_KEY"))


MIMETYPE = "mp3"
TAG = "Speaker"

# Feel free to modify your model's parameters as you wish!
options = {"punctuate": True, "diarize": True, "model": "general", "tier": "nova"}


def parse_transcript(output_json, output_transcript):
    lines = []
    with open(output_json, "r") as file:
        words = json.load(file)["results"]["channels"][0]["alternatives"][0]["words"]
        curr_speaker = 0
        curr_line = ""
        for word_struct in words:
            word_speaker = word_struct["speaker"]
            word = word_struct["punctuated_word"]
            if word_speaker == curr_speaker:
                curr_line += " " + word
            else:
                tag = TAG + str(curr_speaker) + ":"
                full_line = tag + curr_line + "\n"
                curr_speaker = word_speaker
                lines.append(full_line)
                curr_line = " " + word
        lines.append(TAG + str(curr_speaker) + ":" + curr_line)
        with open(output_transcript, "w") as f:
            for line in lines:
                f.write(line)
                f.write("\n")

    return output_transcript


def generate_transcript(audio_dir: str) -> str:
    with open(f"{audio_dir}/audio.mp3", "rb") as f:
        source = {"buffer": f, "mimetype": "audio/" + MIMETYPE}
        res = dg.transcription.sync_prerecorded(source, options)
        with open(f"{audio_dir}/audio.json", "w") as transcript:
            json.dump(res, transcript, indent=4)

    output_transcript = parse_transcript(
        f"{audio_dir}/audio.json", f"{audio_dir}/audio.txt"
    )

    with open(output_transcript) as f:
        return f.read()
