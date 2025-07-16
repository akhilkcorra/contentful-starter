import { ModuleRendererModuleRegistry } from '@/types/globals'
import ItemDetails from '@/ui/modules/ItemDetails'
import { ComponentType } from 'react'

/**
 * Map of ALL available modules (including hero modules) in the `ModuleRenderer` and `ChapterNavigation`/`ChapterModules` module renderer.
 * Update whenever new modules are added to Contentful.
 * The key must match the module's content type id in Contentful (`entry.sys.contentType.sys.id`)
 */
export const contentfulCoreModuleRegistry: ModuleRendererModuleRegistry = {
    // Note: Keep organized alphabetically
    itemDetails: ItemDetails as ComponentType
}
