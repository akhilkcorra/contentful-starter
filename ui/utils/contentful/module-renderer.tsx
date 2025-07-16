import { Locale } from '@/i18n/routing'
import { DefaultChainModifiers } from '@/types/contentful/fields'
import {
    ModuleRendererModuleProps,
    ModuleRendererModuleRegistry,
    RendererType
} from '@/types/globals'
//import { ThemeAll } from
import { Entry } from 'contentful'
import { FunctionComponent } from 'react'

/**
 * Resolves a module in `moduleMap` based on its `contentTypeId` (`module.sys.contentType.sys.id`).
 */
const resolveModule = (
    moduleMap: ModuleRendererModuleRegistry,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    module: Entry<any, DefaultChainModifiers, Locale>
) => {
    const contentTypeId = module?.sys?.contentType?.sys?.id

    if (!contentTypeId) return null

    const Module = moduleMap[contentTypeId]

    if (Module) return Module

    console.info(
        `Module Renderer error: Cannot find module of type ${contentTypeId}`
    )

    return null
}

export type ModuleRendererProps = {
    modules?: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Entry<any, DefaultChainModifiers, Locale> | undefined)[]

    moduleRegistry?: ModuleRendererModuleRegistry
    rendererType?: RendererType

    /**
     * If set, will be passed to child modules to override the module's own theme.
     */
    //themeOverride?: ThemeAll;
}

/**
 * Attempts to resolve and render modules from a Contentful reference field as project modules.
 */
export const ModuleRenderer: FunctionComponent<ModuleRendererProps> = ({
    modules,
    moduleRegistry,
    rendererType = 'content'
    //themeOverride
}) => {
    if (modules?.length === 0 || !moduleRegistry) return null

    return (
        <>
            {modules?.map((module, index) => {
                if (!module) return null

                const ContentfulModule = resolveModule(moduleRegistry, module)

                if (!ContentfulModule) return null

                const props: ModuleRendererModuleProps = {
                    index,
                    rendererType
                    //themeOverride
                }

                return (
                    <ContentfulModule
                        key={`module-${index}`}
                        {...props}
                        {...module.fields}
                        //{...(themeOverride ? { theme: themeOverride } : null)}
                    />
                )
            })}
        </>
    )
}
