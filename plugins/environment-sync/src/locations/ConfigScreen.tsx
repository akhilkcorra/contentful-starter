import React, { useCallback, useState, useEffect } from 'react'
import { ConfigAppSDK } from '@contentful/app-sdk'
import {
    Form,
    FormControl,
    Flex,
    HelpText,
    Checkbox,
    Text
} from '@contentful/f36-components'
import { css } from 'emotion'
import { useSDK } from '@contentful/react-apps-toolkit'
import useSpaceSync from '../hooks/use-space-sync/use-space-sync'

export interface AppInstallationParameters {
    nonSyncableEnvironments: string | undefined
}

const ConfigScreen = () => {
    const sdk = useSDK<ConfigAppSDK>()
    const [parameters, setParameters] = useState<AppInstallationParameters>({
        nonSyncableEnvironments: undefined
    })
    const [currentEnvironment, setCurrentEnvironment] = useState<
        string | undefined
    >(undefined)
    const { environments } = useSpaceSync({
        ...sdk.ids,
        entry: '',
        contentType: ''
    })

    // Save configuration on app setup
    const onConfigure = useCallback(async () => {
        const currentState = await sdk.app.getCurrentState()

        return {
            parameters,
            targetState: currentState
        }
    }, [parameters, sdk])

    // Register onConfigure callback
    useEffect(() => {
        sdk.app.onConfigure(() => onConfigure())
        sdk.app.onConfigurationCompleted(() => {
            sdk.notifier.success('Configuration saved successfully.')
        })
    }, [sdk, onConfigure])

    // Fetch saved parameters and initialize state
    useEffect(() => {
        ;(async () => {
            const currentParameters: AppInstallationParameters | null =
                await sdk.app.getParameters()
            if (currentParameters) {
                setParameters(currentParameters)
            }
            const environment = sdk.ids.environment
            setCurrentEnvironment(environment)
            sdk.app.setReady()
        })()
    }, [sdk])

    // Handle checkbox selection
    const handleCheckboxChange = (value: string) => {
        const currentValues = parameters.nonSyncableEnvironments
            ? parameters.nonSyncableEnvironments.split(',')
            : []

        const updatedValues = currentValues.includes(value)
            ? currentValues.filter((item) => item !== value) // Remove unchecked value
            : [...currentValues, value] // Add checked value

        setParameters({
            ...parameters,
            nonSyncableEnvironments: updatedValues.join(',')
        })
    }

    return (
        <Flex
            flexDirection="column"
            className={css({ margin: '100px', maxWidth: '800px' })}
        >
            <Form>
                <FormControl>
                    <FormControl.Label>
                        {`Non Syncable Environments from ${currentEnvironment}`}
                    </FormControl.Label>
                    <HelpText>
                        {`Select the environments that the current environment (${currentEnvironment}) should be restricted from syncing into.`}
                    </HelpText>
                    <Checkbox.Group
                        value={
                            parameters.nonSyncableEnvironments
                                ? parameters.nonSyncableEnvironments.split(',')
                                : []
                        }
                        onChange={() => {}} // Handle updates individually
                    >
                        {environments?.map(({ sys, name }) => (
                            <Checkbox
                                value={sys.id}
                                key={sys.id}
                                onChange={() => handleCheckboxChange(sys.id)}
                            >
                                <Text
                                    as="span"
                                    style={{ textTransform: 'capitalize' }}
                                >
                                    {name}
                                </Text>
                            </Checkbox>
                        ))}
                    </Checkbox.Group>
                </FormControl>
            </Form>
        </Flex>
    )
}

export default ConfigScreen
