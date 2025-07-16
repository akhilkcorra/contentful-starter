# Contentful App

This project was bootstrapped with [Create Contentful App](https://github.com/contentful/create-contentful-app).

Once the App is installed you can remove the code inside "plugin/environment-sync"

---

## Table of Contents

1. [How to Use](#how-to-use)
2. [Development](#development)
    - [Local Testing](#local-testing)
    - [Building for Production](#building-for-production)
3. [Deployment](#deployment)
4. [Libraries Used](#libraries-used)
5. [Using the `contentful-management` SDK](#using-the-contentful-management-sdk)
6. [Learn More](#learn-more)

---

## How to Use

This app integrates with Contentful's App Framework and provides custom functionality to sync content between environments. Follow the steps below to test, build, and deploy the app.

---

## Development

### Local Testing

1. From terminal change directory to plugins/environment-sync

2. Install dependencies:
    ```bash
    npm install  or yarn
    ```
3. Start the development server:
    ```bash
    npm start or yarn start
    ```

- Runs the app in development mode.
- The page reloads automatically on edits.
- Lint errors are displayed in the console.

### Building for Production

#### To create a production-ready build:

1. Run the build command:
    ```bash
    npm run build or yarn build
    ```

- Outputs the production build to the build folder.
    - Your app is now ready to be deployed.

### Deployment

1. Ensure the following environment variables are set:

    - `CONTENTFUL_ORG_ID` - The ID of your organization.
    - `CONTENTFUL_APP_DEF_ID` - The ID of the app to which to add the bundle. To get this id, find the heading "How to get CONTENTFUL_APP_DEF_ID"
    - `CONTENTFUL_ACCESS_TOKEN` - A personal [Content Management access token](https://www.contentful.com/developers/docs/references/content-management-api/).

2. Upload the production build:
    ```bash
     npm run upload or yarn upload
    ```
    It will fetch the access token, organization id and app definition id from .env file and deploy to your contentful.

Now install the app into required space.

To install the app go to Contentful → Apps → Custom Apps → Install

Now app is ready to use. To view the environment sync app in the side bar.

1. Open any content model
2. Click on Sidebar from left pane
3. You can see your app name on the RHS, click on plus icon, so it will be available on the side bar. Do the same for your other environment.
4. To start sync, you can go to any content entry, add you changes, select your target environment from the RHS and click on Sync button.

More details

- This uploads the build folder to Contentful.
- The command guides you through the deployment process and asks for any required arguments.
- For more details on deployment, refer to the [official Contentful documentation](https://www.contentful.com/developers/docs/extensibility/app-framework/deploy-app/).

### How to get CONTENTFUL_APP_DEF_ID

Go to Contentful → Apps → Custom Apps → Manage app definition → Create app
Now you can see the id just below the app name. Add the basic details and save. Next you can go to Deployment heading and continue.

### Libraries Used

The following libraries are used to maintain consistency with Contentful's UI:

- [Forma 36](https://f36.contentful.com/) – Contentful's design system.
- [Contentful Field Editors](https://www.contentful.com/developers/docs/extensibility/field-editors/) – React components for Contentful field editors.

### Using the contentful-management SDK

- The app provides a contentful-management client to interact with Contentful's Management API. The client is passed into each location and can be used as follows:

    ```bash
    // Example: Fetch all locales
    cma.locale.getMany({}).then((locales) => console.log(locales));

    ```

- Learn more about the SDK:
    - [contentful-management documentation](https://www.contentful.com/developers/docs/extensibility/app-framework/sdk/#using-the-contentful-management-library)

### Learn More

- [Create Contentful App Documentation](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/)
- [Deploy a Custom App](https://www.contentful.com/developers/docs/extensibility/app-framework/deploy-app/)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
