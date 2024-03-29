# DevOps Knowledge Share UI (DKS UI)

The DevOps Knowledge Share UI is a React application containing a simple form and table which
allows users to submit links to articles, blogs, or sites containing knowledge they would like to share with others.
The application works in conjunction with the [DevOps Knowledge Share API](https://github.com/liatrio/dks-api),
a simple Spring Boot application that provides a RESTful API for the DevOps Knowledge Share application.
The purpose of DKS UI is to act as an example of a simple React application allowing us to demonstrate
how one might build, test, and deploy a React application.

## Getting Started

> **_Note:_** Please note that the contents of this repo were sanitized and some links/references may no longer function

### Prerequisites

- nvm (`brew install nvm`)
- Node 20.x (`nvm install` & `nvm use` - These commands will read the `.nvmrc` file included in the project)
  - npm 10.x
- [Docker](https://docs.docker.com/get-docker/)

### Run locally

1. Change your working directory to application root folder

2. Install dependencies using below command

   ```bash
   npm install
   ```

3. Start the [DevOps Knowledge Share API](https://github.com/liatrio/dks-api) locally following the instructions in that project.

4. Set the `DKS_API_BASE_URL` environment variable for API communication.

   ```bash
   # if running on Host machine
   export DKS_API_BASE_URL=http://localhost:8080

   # if running on Remote Container with VS Code
   export DKS_API_BASE_URL=<your host machine ip>
   ```

5. To run the application with hot reloading, run the below command

   ```bash
   npm run dev
   ```

6. Navigate to `http://localhost:3000` to view your application

7. To execute testcases, run the below command

   ```bash
   npm run test
   ```

8. To execute contract tests, run the below command

> :warning: **_NOTE:_** Not currently functional

   ```bash
   npm run testContract
   ```

9. To execute functional tests, run the below command.

> :warning: **_NOTE:_** Not currently functional

   ```bash
   npm run wdio-local
   ```

### Build and Run via Docker

1. Make sure that you have [Docker](https://docs.docker.com/get-docker/) installed and running

2. Use the `dockerBuild` npm script to build your Docker image

   ```bash
   npm run dockerBuild
   ```

3. Use the `dockerRun` npm script to start a container with port `3000` forwarded to your local machine

   ```bash
   npm run dockerRun
   ```

4. Navigate to `http://localhost:3000` to view your application

### VS Code Remote Development

1. Get [VSCode](https://code.visualstudio.com/download)

2. Add [Remote Code - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) Extension to VSCode

3. Make sure you have [Docker Desktop](https://docs.docker.com/desktop/#download-and-install) installed and running

4. Make sure to setup your SSH Agent. Follow [this guide](https://code.visualstudio.com/docs/remote/containers#_using-ssh-keys)

5. When opening the project with VSCode it should automatically startup your remote container environment

   - If not, go to **View** -> **Command Palette** and search for **Remote-Container: Open Folder in Container**

6. Now that you have your environment up and running follow the above **Run Locally** steps to get your app up and running.

> The Remote Container environment is codified according to the `.devcontainer/devcontainer.json` [specifications](https://code.visualstudio.com/docs/remote/devcontainerjson-reference). This definition is shared across the team via Git to produce a consistent development environment.

[More info on Remote Containers](https://code.visualstudio.com/docs/remote/containers#_dev-container-features-preview)

## Feature Flags

We currently have an example feature flag that is set via the environment variable `ENABLE_IMAGE_URL`.
When set, the application will render a new `Image Url` field as an input. This is meant to serve as an example of
merging in code that is not ready to be released and delivering work in small batches.

### Using the Flag

- If running locally
  - Prior to starting the app make sure you have ran `export ENABLE_IMAGE_URL=true`
- If deploying via the Helm Chart
  - `npm run helm -- --set featureFlags.enableImageUrl=true`

## Steps to access the API and application index page

1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

2. [API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

3. The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
