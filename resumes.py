import shutil

import pymongo

def main():
    client = pymongo.MongoClient()
    db = client.carlhacks
    for email in db.users.distinct('email'):
        usr = db.users.find({'email': email})[0]
        if 'resume' not in usr or not usr['resume']:
            continue
        respath = usr['resume']['path']
        ext = ''.join(respath.rpartition('.')[1:])
        shutil.copy2(respath, 'res/{}{}'.format(email, ext))


if __name__ == '__main__':
    main()
