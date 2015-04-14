import urllib

from envelopes import Envelope, GMailSMTP

from config import PASS
from to_accept import accept
from to_exclude import exclude


ACCEPT = (u"Welcome to CarlHacks!\n\n"
           "This email confirms that you are accepted to CarlHacks. "
           "We are looking forward to seeing you at the event!\n\n"
           "Please fill out this form to confirm your attendance:\n"
           "{form_url}\n\nAlso check out our \"What to Bring\" list:\n"
           "http://carlhacks.io/bring\n\n"
           "Unfortunately, travel grant decisions are not available "
           "at this time.\n\n"
           "Feel free to reply to this email with any questions.\n"
           "See you soon!\nThe CarlHacks Team",
          u'CarlHacks Acceptance')

REMIND = (u"Hi {name},\n\n"
           "This is just a reminder to fill out this form to confirm or "
           "withdraw your CarlHacks attendance:\n{form_url}\n\n"
           "If you have any questions, feel free to respond to this email.\n\n"
           "We hope to see you at CarlHacks!\nThe CarlHacks Team",
          u'Confirm Your CarlHacks Attendance')

USE = REMIND

for name, email, id_ in accept:
    if email in exclude:
        continue
    name_esc = urllib.quote_plus(name)
    print 'emailing {} <{}>, id: {}'.format(name, email, id_)
    url = ("https://docs.google.com/forms/d/1slf5fwjCimmfcDTcwpFWYbcYOtLkMiPk9"
           "0l4FAvr5GY/viewform?entry.1756404128={}&entry.2122951986={}&entry."
           "217987429={}".format(name_esc, email, id_))
    envelope = Envelope(
        from_addr=(u'info@carlhacks.io', u'CarlHacks'),
        to_addr=(email, name),
        subject=USE[1],
        text_body=USE[0].format(**{
            'form_url': url,
            'name': name.rpartition(' ')[0],
            'email': email,
        })
    )
    try:
        envelope.send('mail.gandi.net', login='info@carlhacks.io',
                      password=PASS, tls=True)
    except Exception as e:
        print 'Failed:'
        print name, email, id_, '\n'
        print e, '\n'
