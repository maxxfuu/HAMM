import creds
from models import AuthToken, BglHistory, Phone, User
from twilio.rest import Client


def create_twilio_client():
    return Client(
        creds.TWILIO_ACCOUNT_SID, creds.TWILIO_AUTH_TOKEN, creds.TWILIO_ACCOUNT_SID
    )


def send_twilio_verification(e164_phone_number):
    """Send Twilio verification code."""
    # Creates a twilio client object to send messages to
    client = create_twilio_client()
    try:
        # Creates verification through the Twilio API,
        # Then returns the SID, which can be used to access information about the SID
        verification = client.verify.v2.services(
            creds.TWILIO_SERVICE_SID
        ).verifications.create(
            to=e164_phone_number, channel="sms"
        )  # Sends SMS message to number
        return verification.status
        # return verification.sid
    except Exception as e:
        return str(e)


def check_twilio_verification(e164_phone_number, code):
    """Check Twilio verification code."""
    client = create_twilio_client()
    try:
        verification_check = client.verify.v2.services(
            creds.TWILIO_SERVICE_SID
        ).verification_checks.create(
            to=e164_phone_number, code=code
        )  # Checks code that the client against Twilio's API
        return verification_check.status
    except Exception as e:
        return str(e)

    # Creates Phone, User (if not already created), and AuthToken objects in GCloud and stores them


def create_auth_token(e164_phone_number):
    phone = Phone.get_by_id(
        e164_phone_number
    )  # Checks if there is a user object with this phone number yet
    if not phone:
        # Creates new phone and user objects in google app engine
        phone = Phone(
            id=e164_phone_number
        )  # When instantiating Phone, set its entity id in gcloud as e164_phone_number
        user = User.create(e164_phone_number)

        # .put(): A GCloud NDB method which stores the entity in the DB and returns a key for what was stored
        # So here, the user object is stored, and then the user object's ID is set as the phone object's user property
        phone.user = user.put()
        phone.put()  # Stores the newly instantiated phone object in GCloud

    # Always creates new auth token
    auth_token = AuthToken.create(phone.user)
    auth_token.put()
    return auth_token.token()
