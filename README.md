# Repo Viewer

A web app listing the repositories from the official GitHub account of <b>Facebook</b>.

## Installing / Getting started

`npm install`

## Developing

### Built with

- Frameworks: create-react-app, express.

- Testing: cypress.

- Others: GraphQL, Docker.

### Prerequisites

- To be able to have access to the Github's API, you need to generate an access token from your account. Please see
[here](https://github.com/settings/tokens). Select the <b>repo/public_repo</b> scope to allow adding or removing stars
to and from the repos.

- Create an file name `.env` in the root folder. It should contain `REACT_APP_TOKEN='secret123'` where `secret123`
should be replaced by the token you have just generated.

### Setting up Dev

- Start the local dev server. It automatically reloads when you change the code.

`npm start`

- Start the static file server:

`npm run start:server`

### Deploying

- Create a docker image named "repo-viewer":

`docker build -t repo-viewer .`

- Start a container from this image:

`docker run -dp 3000:3000 repo-viewer`

- Open `localhost:3000`

## Tests

- Tests are located at `cypress/integration`.

- Run the tests and exammine the results in the console:

`npm run test`

- Debug the tests with Cypress:

`npm run test:dev`
