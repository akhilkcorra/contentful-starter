import { createClient } from 'contentful'
export const client = createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: process.env.CONTENTFUL_SPACE_ID || '',
    environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: process.env.CONTENTFUL_CONTENT_DELIVERY_TOKEN! as string,
    host: 'cdn.contentful.com'
})

// This is the same as the client but it will allow us to access draft content
export const previewClient = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
    accessToken: process.env.CONTENTFUL_CONTENT_PREVIEW_TOKEN || '',
    host: 'preview.contentful.com'
})
