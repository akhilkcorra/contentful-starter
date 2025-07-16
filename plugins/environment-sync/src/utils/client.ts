import { createClient } from 'contentful-management'

export const plainClient = createClient(
    {
        // Before pushing the app to Contentful, put an actual access token here
        // Using the SDK adapter is not possible, as it doesn't allow certain methods (getMany)
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
        // @see https://github.com/contentful/contentful-management.js#throttle-default-0
        // Throttle requests after reaching a percentage of the limit
        // Do not set to 100%, since this number is shared for the whole space (dev, staging and prod)
        throttle: '80%',
        retryOnError: true,
        retryLimit: 5
    },
    {
        type: 'plain'
    }
)

export const client = createClient({
    // Before pushing the app to Contentful, put an actual access token here
    // Using the SDK adapter is not possible, as it doesn't allow certain methods (getMany)
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
    // @see https://github.com/contentful/contentful-management.js#throttle-default-0
    // Throttle requests after reaching a percentage of the limit
    // Do not set to 100%, since this number is shared for the whole space (dev, staging and prod)
    throttle: '80%',
    retryOnError: true,
    retryLimit: 5
})
