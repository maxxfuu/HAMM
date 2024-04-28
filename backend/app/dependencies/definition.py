"""Dependencies for meeting data definitions endpoint."""

import os

from langchain.chat_models import ChatOpenAI
from langchain.prompts.chat import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)


def generate_definition(meeting_data):
    # set up model and prompt template
    model = ChatOpenAI(
        openai_api_key=os.getenv("OPENAI_API_KEY"),
        model="gpt-3.5-turbo-16k",
        temperature=0.7,
    )  # initialize model
    template = f"""
        You are a helpful medical assistant that analyzes the content of a medical meeting.
        Explain the medical terms, explain the input terms very easily for someone to understand without a high school level education or previous knowledge about healthcare, within one sentence.”
        Format output in the following structure:
        ```
        [medical term] means [output].
    ```
    """  # system prompt
    system_message_prompt = SystemMessagePromptTemplate.from_template(template)
    human_template = "{text}"
    human_message_prompt = HumanMessagePromptTemplate.from_template(human_template)
    chat_prompt = ChatPromptTemplate.from_messages(
        [system_message_prompt, human_message_prompt]
    )

    return model(chat_prompt.format_prompt(text=meeting_data).to_messages()).content
