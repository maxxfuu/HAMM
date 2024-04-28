from twilio.rest import Client
import os

account_sid = os.getenv('TWILIO_ACCOUNT_SID')
auth_token = '[AuthToken]'
client = Client(account_sid, auth_token)

message = client.messages.create(
  from='+18888177340',
  body='Test Message',
  to='+18587841153'
)

print(message.sid)
