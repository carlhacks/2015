CarlHacks Website
=======

## Installation

1. Install [NodeJS](http://nodejs.org/) and [MongoDB](http://www.mongodb.org/downloads).
1. Start the Mongo server by opening a new terminal and typing `mongod`.
1. Clone the repo by opening another new terminal, and typing `git clone https://github.com/carlhacks/website.git`.
1. Change into the new repo's directory with `cd website`.
1. Install dependencies with `npm install`.
1. Then do `npm install stylus`.
1. Then do `touch api_keys.js`.
1. Start the Node server with `npm start`.
1. Visit <http://localhost:8080> to see the site!

## Setting Up Deploys

1. Get the RSA keys and deploy scripts from Adam or Ken, and drop them in the project directory. There should be 3: `carlhacks_rsa`, `carlhacks_rsa.pub`, and `carlhacks_publish`.
1. Make sure they permissions are set correctly on the new files with `chmod 600 carlhacks_*`
1. Make sure you're using [Github with SSH keys](https://help.github.com/articles/generating-ssh-keys/)
1. Make sure your checking out this repo with SSH. Type `git remote -v` in the repo. If you don't see two `origin` listings that start with `git@github.com`, you'll need to change your origin to SSH with `git remote set-url origin git@github.com:carlhacks/website.git`. Make sure `git push` and `git pull` still work after doing this — if they don't you probably didn't set up your SSH keys correctly.

## Deploying

Once you're done with the deploy setup above, just type `./carlhacks_publish` while in the repo's directory.

## Export
````
mongoexport --db carlhacks --collection users --csv --fieldFile userfields.txt --out ./applicants.csv
````
