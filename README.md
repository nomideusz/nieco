## Usage

Those templates dependencies are maintained via [pnpm](https://pnpm.io) via `pnpm up -Lri`.

This is the reason you see a `pnpm-lock.yaml`. That being said, any package manager will work. This file can be safely be removed once you clone a template.

```bash
$ npm install # or pnpm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)

### Deploying to CapRover

This project contains a `captain-definition` file for deploying to CapRover. To deploy:

1. Install the [CapRover CLI](https://caprover.com/docs/get-started.html#step-4-install-caprover-cli):
   ```bash
   npm install -g caprover
   ```

2. Setup your CapRover instance:
   ```bash
   caprover login
   ```

3. Deploy your application:
   ```bash
   caprover deploy
   ```

The deployment uses a multi-stage build process to:
1. Build the application using Node.js and pnpm
2. Serve the static files using Nginx with optimized settings
