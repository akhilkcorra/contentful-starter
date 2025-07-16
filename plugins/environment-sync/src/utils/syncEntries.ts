import { plainClient } from './client'
import { EntryProps } from 'contentful-management'
import { runInBatches } from './runInBatches'
import { getAllItems } from './getAllItems'

type SyncEntriesOptions = {
    spaceId: string
    entries: EntryProps[]
    targetEnvironments: string[]
}
export const syncEntries = async ({ spaceId, entries, targetEnvironments }: SyncEntriesOptions) => {
    const syncedEntries: EntryProps[] = []
    for (const targetEnv of targetEnvironments) {
        const entryIds = entries.map(entry => entry.sys.id)
        const existingEntries = await getAllItems(
            plainClient.entry.getMany,
            entryIds,
            spaceId,
            targetEnv
        )
        const creatingEntries: EntryProps[] = []
        const updatingEntries: {
            currVersion: number,
            entry: EntryProps
        }[] = []
        entries.forEach(entry => {
            const existingEntryIndex = existingEntries
                .findIndex(exEntry => exEntry.sys.id === entry.sys.id)
            if (existingEntryIndex !== -1) {
                updatingEntries.push({
                    currVersion: existingEntries[existingEntryIndex].sys.version,
                    entry: entry
                })
            } else {
                creatingEntries.push(entry)
            }
        })
        if (creatingEntries.length) {
            const inputs = creatingEntries.map(entry =>
                [{
                    spaceId,
                    environmentId: targetEnv,
                    entryId: entry.sys.id,
                    contentTypeId: entry.sys.contentType.sys.id,
                }, entry])
            const createdEntries = await runInBatches(plainClient.entry.createWithId, inputs)
            syncedEntries.push(...createdEntries)
        }
        if (updatingEntries.length) {
            const inputs = updatingEntries.map(({ entry, currVersion }) =>
                [{
                    spaceId,
                    environmentId: targetEnv,
                    entryId: entry.sys.id,
                    contentTypeId: entry.sys.contentType.sys.id,
                }, entry, {
                    'X-Contentful-Version': currVersion
                }])
            const updatedEntries = await runInBatches(plainClient.entry.update, inputs)
            syncedEntries.push(...updatedEntries)
        }
    }
    return syncedEntries
}
