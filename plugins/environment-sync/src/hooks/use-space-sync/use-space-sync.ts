import { IdsAPI } from '@contentful/app-sdk'
import { CollectionProp, EnvironmentProps } from 'contentful-management'
import { useEffect, useState } from 'react'
import { plainClient } from '../../utils/client'
import sync from '../../utils/sync'
import handleError from '../../utils/handleError'

type SpaceObj = {
    environments?: EnvironmentProps[]
    currentEnvironment?: EnvironmentProps
    allEnvironments?: EnvironmentProps[]
    syncEntries: (envIds: string[], syncAsset?: boolean) => Promise<void>
}

const useSpaceSync = (ids: Omit<IdsAPI, 'field'>): SpaceObj => {
    const [environments, setEnvironments] =
        useState<CollectionProp<EnvironmentProps>>()

    const currentEnvironment = environments?.items.find(
        (item) => item.sys.id === ids.environment
    )
    const filteredEnvironments = environments?.items.filter(
        (item) => item.sys.id !== ids.environment
    )
    useEffect(() => {
        const getEnvironments = async () => {
            const environments = await plainClient.environment.getMany({
                spaceId: ids.space
            })
            setEnvironments(environments)
        }
        getEnvironments()
    }, [ids.space, currentEnvironment?.name])

    const syncEntries = async (envIds: string[], syncAsset?: boolean) => {
        try {
            await sync({
                spaceId: ids.space,
                environmentId: ids.environment,
                entryId: ids.entry,
                targetEnvironments: envIds,
                syncAsset
            })
        } catch (error) {
            console.log(handleError(error))
            console.error(error)
            throw handleError(error)
        }
    }

    return {
        environments: filteredEnvironments,
        currentEnvironment,
        allEnvironments: environments?.items,
        syncEntries
    }
}

export default useSpaceSync
