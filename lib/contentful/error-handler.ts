export const handleContentfulError = (
    error: Error | unknown,
    message?: string
): null => {
    console.error(message ? `${message}:` : `Contentful request error:`)
    console.error(error)
    return null
}
