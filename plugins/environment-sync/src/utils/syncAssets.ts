import { AssetProps } from "contentful-management";
import { plainClient } from "./client";
import { runInBatches } from './runInBatches'
import { getAllItems } from './getAllItems'

type SyncAssetsOptions = {
    spaceId: string
    assets: AssetProps[]
    targetEnvironments: string[]
}

export const syncAssets = async ({ spaceId, assets, targetEnvironments }: SyncAssetsOptions) => {
    const syncedAssets: AssetProps[] = []
    for (const targetEnv of targetEnvironments) {
        const assetIds = assets.map(asset => asset.sys.id)
        const existingAssets = await getAllItems(
            plainClient.asset.getMany,
            assetIds,
            spaceId,
            targetEnv
        )
        const creatingAssets: AssetProps[] = []
        const updatingAssets: {
            currVersion: number,
            asset: AssetProps
        }[] = []
        assets.forEach(asset => {
            const existingassetIndex = existingAssets
                .findIndex(exasset => exasset.sys.id === asset.sys.id)
            if (existingassetIndex !== -1) {
                updatingAssets.push({
                    currVersion: existingAssets[existingassetIndex].sys.version,
                    asset: asset
                })
            } else {
                creatingAssets.push(asset)
            }
        })
        if (creatingAssets.length) {
            const inputs = creatingAssets.map(asset =>
                [{
                    spaceId,
                    environmentId: targetEnv,
                    assetId: asset.sys.id,
                }, asset])
            const createdAssets = await runInBatches(plainClient.asset.createWithId, inputs)
            syncedAssets.push(...createdAssets)
        }
        if (updatingAssets.length) {
            const inputs = updatingAssets.map(({ asset, currVersion }) =>
                [{
                    spaceId,
                    environmentId: targetEnv,
                    assetId: asset.sys.id,
                }, asset, {
                    'X-Contentful-Version': currVersion
                }])
            const updatedAssets = await runInBatches(plainClient.asset.update, inputs)
            syncedAssets.push(...updatedAssets)
        }
    }
    return syncedAssets
}
