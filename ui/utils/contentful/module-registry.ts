'use client'

import { ModuleRendererModuleRegistry } from '@/types/globals'
//import ChapterNavigation from '@/ui/modules/chapter-navigation/chapter-navigation';
import { contentfulCoreModuleRegistry } from '@/ui/utils/contentful/core-module-registry'
//import { ComponentType } from 'react';

/**
 * Map of ALL available modules (including hero modules) in the in the `ModuleRenderer`.
 * The key must match the module's content type id in Contentful (`entry.sys.contentType.sys.id`)
 */
export const contentfulModuleRegistry: ModuleRendererModuleRegistry = {
    // Merging all core modules available, the ones available in the `ChapterNavigation`/`ChapterModules` module
    ...contentfulCoreModuleRegistry

    // Adding `ChapterNavigation` separately to avoid circular references, which causes errors when not loading modules dynamically
    //chapterNavigation: ChapterNavigation as ComponentType,
}
