# Cool Cats Website
The Cool Cats website that runs on AWS, it uses standard NPM run commands.

- npm run build
- npm run start
- npm run cloud-functions (this is currently hard coded to link to my cloud functions folder)

## AWS Amplify CI/CD

The site will automatically push to Amplify whenever anything is saved to the master branch. DO NOT work on the master branch, work on the development branch and merge into master when it is ready to go to production. For new work we just create feature branches off of development branch.

## Phaser Game Dev / Deployment
There is currently a copyfiles command inside the build and start react scripts. It will copy anything inside /src/games/**/assets/ to /build/assets/ - This means you can reference assets/ inside your game and then when the site is built, it will copy the files to the assets/ folder inside build, so they still link up correctly.

Use a naming convention for all of your game assets, for example CT_ for Cool Town.

