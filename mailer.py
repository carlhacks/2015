import urllib

from envelopes import Envelope, GMailSMTP

from config import PASS
from to_email import emails
from to_exclude import exclude


ACCEPT = (u"Welcome to CarlHacks!\n\n"
           "This email confirms that you are accepted to CarlHacks. "
           "We are looking forward to seeing you at the event!\n\n"
           "Please fill out this form to confirm your attendance:\n"
           "{form_url}\n\nAlso check out our \"What to Bring\" list and "
           "full event schedule:\n"
           "http://carlhacks.io/bring\n"
           "http://carlhacks.io/schedule\n\n"
           "Feel free to reply to this email with any questions.\n"
           "See you soon!\nThe CarlHacks Team",
          u'CarlHacks Acceptance')

REMIND = (u"Hi {name},\n\n"
           "This is just a reminder to fill out this form to confirm or "
           "withdraw your CarlHacks attendance:\n{form_url}\n\n"
           "If you have any questions, feel free to respond to this email.\n\n"
           "We hope to see you at CarlHacks!\nThe CarlHacks Team",
          u'Confirm Your CarlHacks Attendance')

GIVE_GRANT = (u"Hi {name},\n\n"
               "Congratulations! You've been chosen to receive a travel grant "
               "for CarlHacks. We are offering you up to $100 for your bus or "
               "airplane ticket. You will receive this money after the event "
               "(contingent on your attendance).\n\n"
               "To confirm your travel grant:\n"
               "1) Respond to this email by Saturday (4/18) at noon accepting "
               "the grant and confirming your attendance. If you do not do "
               "this, the grant will be offered to another applicant.\n"
               "2) Let us know if you are spending less than $100 on travel "
               "(for bus tickets, for example) so that we can adjust your "
               "grant appropriately.\n\n"
               "Thank you for your patience, and we are excited to see you at "
               "CarlHacks!\n\n"
               "The CarlHacks Team\n\n"
               "P.S. If you have not yet confirmed or withdrawn your "
               "attendance to CarlHacks, please fill out this form! "
               "{form_url})",
              u'CarlHacks Travel Grant Decision')

NO_GRANT = (u"Hi {name},\n\n"
             "We regret to inform you that you have not been selected to "
             "receive a travel grant. However, there are two opportunities "
             "to still receive a grant if you choose to attend CarlHacks.\n\n"
             "1) LAST-MINUTE GRANTS. Applicants who have been awarded grants "
             "have until Saturday (4/18) at noon to accept the grant and "
             "reconfirm their attendance. If they do not accept, then the "
             "grant will be awarded to someone else who has requested one.\n"
             "2) RETROACTIVE GRANTS. For budgeting reasons, we are "
             "withholding some contingency money until the event ends. After "
             "that, we will be awarding all remaining CarlHacks money to "
             "attendees who purchased a plane or bus ticket to attend "
             "CarlHacks.\n\n"
             "Thank you for your patience, and we hope to see you at "
             "CarlHacks!\n\n"
             "The CarlHacks Team\n\n"
             "P.S. If you have not yet confirmed or withdrawn your attendance "
             "to CarlHacks, please fill out this form! {form_url}",
            u'CarlHacks Travel Grant Decision')

SORRY_MINOR = (u"Dear {name},\n\n"
                "We regret to inform you that this year, CarlHacks is unable "
                "to admit any minors not attending Carleton College. Our "
                "plan all along had been to accept anyone wishing to "
                "participate. Just this week however, we were informed by the "
                "person in charge of liability for our venue that they were "
                "no longer going to allow us to have minors attend the "
                "event. Though the circumstances are beyond our control, "
                "we apologize for the suddenness of this news.\n\n"
                "We are deeply sorry that we can't invite you to CarlHacks "
                "this year, but we hope you keep us in mind in the future. "
                "We also want you to know that we are working with liability "
                "to resolve this issue and allow minors for future "
                "CarlHacks hackathons.\n\n"
                "Sorry to have to be emailing with bad news, but we wish you "
                "all the best. If you have any questions, please feel free "
                "to email us.\n\n"
                "Sincerely,\nThe CarlHacks Board",
               u'CarlHacks Update')

USE = SORRY_MINOR

for name, email, id_ in emails:
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
