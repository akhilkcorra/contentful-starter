import safeJsonStringify from 'safe-json-stringify'

/**
 * Safely parse the `entries` from a Contentful request.
 *
 * @param response The response to parse.
 * @returns The safely stringified and parsed entries.
 */
export const handleContentfulResponse = <T extends object>(
    response: T
): T | undefined => {
    try {
        // Note: because of the possibility of having circular references in Contentful
        // (e.g. entry 1 linking to entry 2, then linking back to entry 1),
        // this seems to be the best solution to avoid this error in the rich text data

        return JSON.parse(safeJsonStringify(response))
    } catch (error) {
        console.error('Error parsing Contentful response', error)
        return undefined
    }
}
