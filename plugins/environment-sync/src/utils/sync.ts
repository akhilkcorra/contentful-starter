import { getContent } from "./getContent"
import { syncAssets } from "./syncAssets"
import { syncEntries } from "./syncEntries"

type Options = {
    spaceId: string
    environmentId: string
    entryId: string
    targetEnvironments: string[]
    syncAsset?: boolean
}

const sync = async ({ spaceId, environmentId, entryId, targetEnvironments, syncAsset }: Options) => {
    const { entries, assets } = await getContent({
        spaceId: spaceId,
        environmentId: environmentId,
        entryId: entryId,
        syncAsset
    })
    const syncedEntries = await syncEntries({
        spaceId: spaceId,
        entries,
        targetEnvironments
    })
    if (syncAsset) {
        await syncAssets({
            spaceId: spaceId,
            assets,
            targetEnvironments
        })
    }
    return syncedEntries
}

export default sync
