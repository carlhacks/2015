import urllib

from envelopes import Envelope, GMailSMTP

from to_accept import accept
from config import PASS


for name, email, id_ in accept:
    name_esc = urllib.quote_plus(name)
    print 'emailing {} <{}>, id: {}'.format(name, email, id_)
    url = ("https://docs.google.com/forms/d/1slf5fwjCimmfcDTcwpFWYbcYOtLkMiPk9"
           "0l4FAvr5GY/viewform?entry.1756404128={}&entry.2122951986={}&entry."
           "217987429={}".format(name_esc, email, id_))
    envelope = Envelope(
        from_addr=(u'info@carlhacks.io', u'CarlHacks'),
        to_addr=(email, name),
        subject=u'CarlHacks Acceptance',
        text_body=(u"Welcome to CarlHacks!\n\n"
                    "This email confirms that you are accepted to CarlHacks. "
                    "We are looking forward to seeing you at the event!\n\n"
                    "Please fill out this form to confirm your attendance:\n"
                    "{}\n\nAlso check out our \"What to Bring\" list:\n"
                    "http://carlhacks.io/bring\n\n"
                    "Unfortunately, travel grant decisions are not available "
                    "at this time.\n\n"
                    "Feel free to reply to this email with any questions.\n"
                    "See you soon!\nThe CarlHacks Team".format(url))
    )
    try:
        envelope.send('mail.gandi.net', login='info@carlhacks.io',
                      password=PASS, tls=True)
    except Exception as e:
        print 'Failed:'
        print name, email, id_, '\n'
        print e, '\n'
