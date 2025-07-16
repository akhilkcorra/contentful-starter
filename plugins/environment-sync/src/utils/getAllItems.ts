import { AssetProps, EntryProps, PlainClientAPI } from 'contentful-management'
import chunk from "./chunk";

const ITEMS_PER_BATCH = 100

// Get all entries
export async function getAllItems<
    F extends (...args: any) => any  = PlainClientAPI['entry']['getMany'],
    R = EntryProps
>(executeFn: F, ids: string[], spaceId: string, targetEnv: string): Promise<R[]>

// Get all assets
export async function getAllItems<
    F extends (...args: any) => any  = PlainClientAPI['asset']['getMany'],
    R = AssetProps
>(executeFn: F, ids: string[], spaceId: string, targetEnv: string): Promise<R[]>

// Generic "get all" function
export async function getAllItems<
    F extends (...args: any) => any  = PlainClientAPI['asset']['getMany'] | PlainClientAPI['entry']['getMany'],
    R = Awaited<ReturnType<F>>['items']
>(executeFn: F, ids: string[], spaceId: string, targetEnv: string): Promise<R[]> {
    const idChunks = chunk(ids, ITEMS_PER_BATCH)
    // Split requests into batches to avoid running into the URL length limit error
    const collections: Awaited<ReturnType<F>>[] = await Promise.all(
        idChunks.map(
            (idBatch) => executeFn(
                {
                    spaceId,
                    environmentId: targetEnv,
                    query: {
                        'sys.id[in]': idBatch.join(','),
                    },
                }
            ).catch(
                (e: any) => console.log(e)
            )
        )
    )

    return collections.reduce(
        (items, collection) => {
            items.push(...collection.items)
            return items
        },
        [] as R[]
    )
}
