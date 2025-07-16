import { EntriesQueries, EntryCollection, EntrySkeletonType } from 'contentful'
import {
    client as contentFulClient,
    previewClient
} from '@lib/contentful/client'
import { handleContentfulError } from '@/lib/contentful/error-handler'
import { DefaultChainModifiers } from '@/types/contentful/fields'
import { handleContentfulResponse } from '@/lib/contentful/response-handler'

type QueryOptions<EntrySkeleton extends EntrySkeletonType = EntrySkeletonType> =
    EntriesQueries<EntrySkeleton, DefaultChainModifiers> & {
        isPreview?: boolean
        locale?: string
    }

export const getEntries = async <
    EntrySkeleton extends EntrySkeletonType = EntrySkeletonType
>(
    queryOptions?: QueryOptions<EntrySkeleton>
) => {
    const { isPreview = false, ...query } = queryOptions ?? {}
    const client = isPreview ? previewClient : contentFulClient
    try {
        // Fetching page entries without unresolvable links
        const entries =
            await client.withoutUnresolvableLinks.getEntries<EntrySkeleton>(
                query
            )
        // Note: because of the possibility of having circular references in Contentful
        // (e.g. entry 1 linking to entry 2, then linking back to entry 1),
        // this seems to be the best solution to avoid this error in the rich text data
        const parsedEntries =
            handleContentfulResponse<
                EntryCollection<EntrySkeleton, DefaultChainModifiers>
            >(entries)

        // Return the collection
        return parsedEntries
    } catch (error) {
        return handleContentfulError(
            error,
            'Contentful request error while getting entries'
        )
    }
}

export const getEntry = async <
    EntrySkeleton extends EntrySkeletonType = EntrySkeletonType
>(
    queryOptions?: QueryOptions<EntrySkeleton>
) => {
    const { isPreview = false, locale, ...query } = queryOptions ?? {}
    const client = isPreview ? previewClient : contentFulClient

    try {
        // Fetching page entries without unresolvable links
        const entries =
            await client.withoutUnresolvableLinks.getEntries<EntrySkeleton>({
                //This is a sample locale add your local value based on the project scope
                locale,
                limit: 1,
                order: ['-sys.updatedAt', '-sys.createdAt'],
                // Link levels to return; `10` is the maximum
                // Keeping it at the maximum does not have much of a payload size impact on the pages
                include: 10,
                ...query
            })

        const parsedEntries =
            handleContentfulResponse<
                EntryCollection<EntrySkeleton, DefaultChainModifiers>
            >(entries)

        return parsedEntries?.items[0]

        // Return the single entry rather than the collection
        // return regionEntries?.length && regionEntries[0];
    } catch (error) {
        return handleContentfulError(
            error,
            `Contentful request error while getting a landing page by query: ${JSON.stringify(query, null, 1)} locale:${locale}`
        )
    }
}
