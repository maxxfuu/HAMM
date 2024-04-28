"""Dependencies for meeting data definitions endpoint."""

import os

from langchain.chat_models import ChatOpenAI
from langchain.prompts.chat import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)


def generate_summary(meeting_data):
    # set up model and prompt template
    model = ChatOpenAI(
        openai_api_key=os.getenv("OPENAI_API_KEY"),
        model="gpt-3.5-turbo-16k",
        temperature=0.7,
    )  # initialize model
    template = f"""
    Summarize the input into notes in maximum one paragraph form, make it easy to understand but concise with key information mentioned, catch the medical terms and make it into a simple explanation that people without high school education can understand. identify a reminder schedule in the input and organize it into a calendar schedule for reminders''
    ``` 
    Here’s the summary of the visit: [summary].
    Details about your follow up visit / medication refill:
	Location: [location of the clinic or pharmacy]
	Date and Time: [Scheduled date and time]
    ```
    """  # system prompt
    system_message_prompt = SystemMessagePromptTemplate.from_template(template)
    human_template = "{text}"
    human_message_prompt = HumanMessagePromptTemplate.from_template(human_template)
    chat_prompt = ChatPromptTemplate.from_messages(
        [system_message_prompt, human_message_prompt]
    )

    return model(chat_prompt.format_prompt(text=meeting_data).to_messages()).content
