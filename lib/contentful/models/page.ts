import { getEntries, getEntry } from '@/lib/contentful/request'
import {
    TypePageFields,
    TypePageSkeleton
} from '@/types/contentful/generated/skeletons'
import { getLocale } from 'next-intl/server'
import { EntrySelectFilterWithFields } from 'contentful'

type GetOptions = {
    isPreview?: boolean
    select?: EntrySelectFilterWithFields<TypePageFields>['select']
    locale?: string
}

export const getPageBySlug = async (slug: string, options?: GetOptions) => {
    const { isPreview = false, select } = options ?? {}
    const locale = options?.locale ?? (await getLocale())
    const page = await getEntry<TypePageSkeleton>({
        content_type: 'page',
        isPreview,
        locale,
        'fields.slug': slug,
        select
    })
    return page
}

export const getPageList = async (options?: GetOptions) => {
    const { isPreview = false, select, locale } = options ?? {}
    const pages = await getEntries<TypePageSkeleton>({
        content_type: 'page',
        isPreview,
        locale,
        select
    })
    return pages
}
