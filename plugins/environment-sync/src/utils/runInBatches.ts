import { PlainClientAPI } from 'contentful-management'
import chunk from './chunk'

type CreateEntry = PlainClientAPI['entry']['createWithId']
type UpdateEntry = PlainClientAPI['entry']['update']
type CreateAsset = PlainClientAPI['asset']['createWithId']
type UpdateAsset = PlainClientAPI['asset']['update']

// Function implementation
export async function runInBatches <
    F extends (...args: any) => any = CreateEntry | UpdateEntry | CreateAsset | UpdateAsset,
    T extends Array<unknown> = Parameters<F>,
    R = Awaited<ReturnType<F>>
>(executeFn: F, args: T[], batchSize: number = 6): Promise<R[]> {
    const batches: T[][] = chunk<T>(args, batchSize)
    const results: R[][] = []
    for (const batch of batches) {
        const batchResults: R[] = await Promise.all(
                batch.map(
                    (item) => executeFn(...item)
                )
            )
        results.push(batchResults)
        // Contentful management API has a limit of 7r/s, but we use 80% of it
        // This is delay avoids running into the "throttle" limit too much
        await new Promise(r => setTimeout(r, 1000))
    }
    return results.flat()
}
