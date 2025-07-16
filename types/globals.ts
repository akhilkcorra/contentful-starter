import { ComponentType } from 'react'

export type PageLocalizationParams = {
    region: string | undefined
    locale: string | undefined
}

export type PageSlugParams = {
    slug: string[] | undefined
}

export type ModuleRendererModuleRegistry = Record<string, ComponentType>

/**
 * All available render types as a readonly array.
 */
const rendererTypes = ['hero', 'content', 'chapter'] as const

/**
 * The type of module renderer.
 */
export type RendererType = (typeof rendererTypes)[number]

export type ModuleRendererModuleProps = {
    /**
     * Determines what type of renderer is loading a particular module.
     */
    rendererType?: RendererType

    /**
     * The index of the module it is rendered at in the `ModuleRenderer`.
     * Can be used to determine if it should load images lazily or as a priority.
     * It can also be used, along with the value of `rendererType`, to determine
     * if a hero module should render a heading as an `h1` or `h2`.
     */
    index?: number

    //themeOverride?: ThemeAll
}
