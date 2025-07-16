import { Metadata } from 'next'
import { generateCanonicalUrl } from '@/ui/components/seo/utils/generateCanonicalUrl'
import { SeoData } from '@/ui/components/seo/types/SeoSchema.types'
import { getImageTypeFromURL } from '@/ui/components/seo/utils/getImageType'

export function createMetadata(seoData: SeoData, locale: string): Metadata {
    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
        title: seoData?.title,
        description: seoData?.description,
        openGraph: {
            type: seoData?.openGraphType || 'website',
            title: seoData?.openGraphTitle,
            description: seoData?.openGraphDescription,
            locale: locale,
            url: seoData?.openGraphUrl,
            siteName: seoData?.openGraphSiteName,
            images: [
                {
                    url: seoData?.openGraphImage?.fields?.file?.url ?? '',
                    width: seoData?.openGraphImage?.fields?.file?.details?.image
                        ?.width,
                    height: seoData?.openGraphImage?.fields?.file?.details
                        ?.image?.height,
                    alt: seoData?.openGraphImage?.fields?.file?.fileName,
                    type: getImageTypeFromURL(
                        seoData?.openGraphImage?.fields?.file?.url as string
                    )
                }
            ]
        },
        twitter: {
            card: seoData?.twitterCard ?? 'summary_large_image',
            title: seoData?.twitterTitle,
            description: seoData?.twitterDescription,
            site: seoData?.twitterSite,
            images: [seoData?.twitterImage?.fields?.file?.url ?? '']
        },
        alternates: {
            canonical: generateCanonicalUrl()
        }
    }
}
