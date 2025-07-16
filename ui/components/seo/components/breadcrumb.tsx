import React from 'react'
import JsonLd from '@/ui/components/seo/components/json-ld'
import { Breadcrumbs, BreadCrumbDataType } from '../types/SeoSchema.types'

export const Breadcrumb = ({ breadcrumbs }: Breadcrumbs) => {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map(
            (breadcrumb: BreadCrumbDataType, index: number) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: breadcrumb.name,
                ...(breadcrumb.url && { item: breadcrumb.url })
            })
        )
    }

    return <JsonLd data={schema} />
}
