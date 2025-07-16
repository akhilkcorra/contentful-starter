import React, { useState } from 'react'
import { SidebarAppSDK } from '@contentful/app-sdk'
import {
    Box,
    Button,
    Checkbox,
    Text,
    Notification,
    Note
} from '@contentful/f36-components'
import { useSDK } from '@contentful/react-apps-toolkit'
import EnvironmentGroup from '../components/EnvironmentGroup'
import useSpaceSync from '../hooks/use-space-sync/use-space-sync'
import useAutoResize from '../hooks/use-auto-resize'

const Sidebar = () => {
    const sdk = useSDK<SidebarAppSDK>()
    useAutoResize(sdk.window)
    const [syncEnvironments, setSyncEnvironments] = useState<string[]>([])
    const [isSyncAssets, setIsSyncAssets] = useState<boolean>(true)
    const [error, setError] = useState<any>()
    const [isLoading, setLoading] = useState<boolean>(false)
    const { syncEntries, environments, currentEnvironment } = useSpaceSync(
        sdk.ids
    )
    const nonSyncableParameter =
        sdk.parameters.installation?.nonSyncableEnvironments
    const nonSyncableEnvironments =
        nonSyncableParameter?.split(',').filter(Boolean) || []

    const syncContentEntries = async () => {
        setError('')
        setLoading(true)
        try {
            await syncEntries(syncEnvironments, isSyncAssets)
            await Notification.setPlacement('bottom', { offset: 0 })
            await Notification.success('Entry synced successfully!', {
                duration: 2000,
                withClose: false
            })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    return (
        <>
            <EnvironmentGroup
                key={nonSyncableParameter}
                environments={environments}
                currentEnvironment={currentEnvironment}
                nonSyncableEnvironments={nonSyncableEnvironments}
                defaultValue={syncEnvironments}
                title="Sync content between environments"
                subtitle="Select environments you want to sync"
                onChange={(e) => {
                    const { value, checked } = e.target
                    if (checked) {
                        setSyncEnvironments((prevItems) => [
                            ...prevItems,
                            value
                        ])
                    } else {
                        setSyncEnvironments((prevItems) =>
                            prevItems.filter((item) => item !== value)
                        )
                    }
                }}
            />
            {error && (
                <Box marginTop="spacingM" marginBottom="spacingS">
                    <Note
                        variant="negative"
                        withCloseButton
                        onClose={() => setError('')}
                    >
                        {error}
                    </Note>
                </Box>
            )}
            <Box marginBottom="spacingS">
                <Checkbox
                    color="pos"
                    isChecked={isSyncAssets}
                    onChange={(e) => {
                        setIsSyncAssets(e.target.checked)
                    }}
                >
                    <Text as="span">Include assets</Text>
                </Checkbox>
            </Box>
            <Button
                isLoading={isLoading}
                isDisabled={isLoading || !syncEnvironments.length}
                variant="primary"
                isFullWidth
                aria-label="sync"
                onClick={syncContentEntries}
            >
                Sync
            </Button>
        </>
    )
}

export default Sidebar
