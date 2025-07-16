import { plainClient } from './client'
import { AssetProps } from 'contentful-management'
import { findFields } from './getFields'
import removeAssetsFromEntries from './removeAssetsFromEntries'
import { getAllItems } from './getAllItems'

type GetEntriesOptions = {
    spaceId: string
    environmentId: string
    entryId: string,
    syncAsset?: boolean
}

export const getContent = async ({ spaceId, environmentId, entryId, syncAsset }: GetEntriesOptions) => {
    const currentEntryRef = await plainClient
        .entry
        .references({
            spaceId,
            environmentId,
            entryId,
            include: 10
        })
    let entries = [...currentEntryRef.items, ...currentEntryRef?.includes?.Entry ?? []]
    let assets: AssetProps[] = []
    if (syncAsset) {
        const assetFieldIds: string[] = []
        entries.forEach(entry => {
            const assetFields = findFields('Asset', entry.fields)
            assetFieldIds.push(...assetFields.map(field => field.sys.id))
        })
        assets = await getAllItems(plainClient.asset.getMany, assetFieldIds, spaceId, environmentId)

    } else {
        entries = removeAssetsFromEntries(entries)
    }
    return {
        entries,
        assets
    }
}
