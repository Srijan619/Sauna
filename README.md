# Saunaan
Saunaan changes the way how we find, pay and rate saunas.

This app uses:
- React
- Firebase
- Stripe
- Husky, ESLint & Prettier

## Get Started
`git clone git@gitlab.com:ted.sjoblom/project-sauna.git`

`cd project-sauna`

To connect locally to Firebase, add a file named `.env` to the project root. Copy and paste the contents found in the project Drive folder.

Install dependencies and start the development server: `npm install && npm run start`

visit `localhost:3000`

And you're done! [See all available scripts](#available-scripts)

## Deploy
Install the firebase CLI `npm i -g firebase-cli`

Run the build `npm run build`

Test your site locally by running `firebase serve` and visit [http://localhost:5000](http://localhost:5000)

If everything is looking good, run `firebase deploy`

And you're done! Visit the site at [https://sauna-app.firebaseapp.com/](https://sauna-app.firebaseapp.com/)

## Main Branches

#### Develop
-   Feature branches can be merged here anytime for testing purposes
-   This branch can be reset to master anytime. No code living only in this branch will end up in production!

#### Master
-   QA for next release
-   Base branch for all new features

#### Production
-   Always equal to code currently running on production servers  

## Development Workflow

### New Feature
-  Create new branch from master
	-  feature/[ticketID]-[ticketTitle]
-   Merge to develop for testing/acceptance
-   Create merge request to master

### Release

-   Merge all accepted and finished feature branches to master
-   Cleanup and remove finished feature branches
-   Tag new release and merge to production
  

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br  />

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### `npm run build`


Builds the app for production to the `build` folder.<br  />

It correctly bundles React in production mode and optimizes the build for the best performance. After this, your app is ready to be deployed!


### `npm run lint` and `npm run lint:fix`
Checks for/fixes errors in your code. This project is setup with Husky to automatically run linting in a pre-commit hook.


## Additional Info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
