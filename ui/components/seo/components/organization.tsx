import React from 'react'
import JsonLd from '@/ui/components/seo/components/json-ld'
import { organizationData } from '@/config/seo'

export const Organization = () => {
    const schema = {
        ...(organizationData?.context && {
            '@context': organizationData?.context
        }),
        ...(organizationData?.type && { '@type': organizationData?.type }),
        ...(organizationData?.url && { url: organizationData?.url }),
        ...(organizationData?.logo && { logo: organizationData?.logo }),
        ...(organizationData?.name && { name: organizationData?.name }),
        ...(organizationData?.description && {
            description: organizationData?.description
        }),
        address: {
            ...(organizationData?.address?.type && {
                '@type': organizationData?.address?.type
            }),
            ...(organizationData?.address?.streetAddress && {
                streetAddress: organizationData?.address?.streetAddress
            }),
            ...(organizationData?.address?.addressLocality && {
                addressLocality: organizationData?.address?.addressLocality
            }),
            ...(organizationData?.address?.addressCountry && {
                addressCountry: organizationData?.address?.addressCountry
            }),
            ...(organizationData?.address?.addressRegion && {
                addressRegion: organizationData?.address?.addressRegion
            }),
            ...(organizationData?.address?.postalCode && {
                postalCode: organizationData?.address?.postalCode
            })
        }
    }

    return <JsonLd data={schema} />
}
