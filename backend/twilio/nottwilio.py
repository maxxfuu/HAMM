# Download the helper library from https://www.twilio.com/docs/python/install
import os
from dotenv import load_dotenv 
from twilio.rest import Client

# Load the environment variables from .env file

load_dotenv() 

def send_message(input):
    # Find your Account SID and Auth Token at twilio.com/console
    # and set the environment variables. See http://twil.io/secure
    account_sid = os.getenv('TWILIO_ACCOUNT_SID')
    auth_token = os.getenv('TWILIO_AUTH_TOKEN')
    client = Client(account_sid, auth_token)

    message = client.messages \
        .create(
            body=f'{input}',
            from_='+18888948030',
            #media_url=['https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg'],
            to='+18777804236'
        )
 
    
    return print(message.sid) 

message = input("What is your message")
send_message(message)
