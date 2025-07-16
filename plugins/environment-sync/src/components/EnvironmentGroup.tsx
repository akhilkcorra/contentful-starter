import React from 'react'
import { Checkbox, CheckboxGroupProps, FormControl, FormLabel, Paragraph, Text } from '@contentful/f36-components';
import { EnvironmentProps } from 'contentful-management';

interface Props extends Omit<CheckboxGroupProps, 'children' | 'name'> {
    environments?: EnvironmentProps[]
    currentEnvironment?: EnvironmentProps
    nonSyncableEnvironments?: string[]
    title: string
    subtitle: string
}

const EnvironmentGroup: React.FC<Props> = ({ environments, currentEnvironment, nonSyncableEnvironments, title, subtitle, ...rest }) => {
    if (!environments) return null

    return (
        <FormControl as="fieldset">
            <FormLabel as="legend" marginBottom="none">{title}</FormLabel>
            <Paragraph>{subtitle}</Paragraph>
            <Checkbox.Group name="environment" {...rest} >
                {environments?.map(({ sys, name }) => (
                    <Checkbox
                        value={sys.id}
                        key={sys.id}
                        id={sys.id}
                        isDisabled={nonSyncableEnvironments?.includes(sys.id)}
                    >
                        <Text as="span" style={{ textTransform: 'capitalize' }}>
                            {name}
                        </Text>
                    </Checkbox>
                ))}
                {currentEnvironment && (
                    <Checkbox value={currentEnvironment.sys.id} key={currentEnvironment.sys.id} id={currentEnvironment.sys.id} helpText="Current environment" isDisabled>
                        <Text as="span" style={{ textTransform: 'capitalize' }}>
                            {currentEnvironment.name}
                        </Text>
                    </Checkbox>
                )}
            </Checkbox.Group>
        </FormControl>
    )
};

export default EnvironmentGroup
