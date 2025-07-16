import { getPageBySlug, getPageList } from '@/lib/contentful/models/page'
import { notFound } from 'next/navigation'
import { ModuleRenderer } from '@/ui/utils/contentful'
import { contentfulModuleRegistry } from '@/ui/utils/contentful/module-registry'
import { Metadata } from 'next'
import {
    Seo,
    createMetadata,
    generateBreadcrumbsData,
    SeoData
} from '@/ui/components/seo'
import { routing } from '@/i18n/routing'
import { homeSlug } from '@/config/routing'

interface PageParams {
    locale: string
    slug: string[]
}

type MetaProps = {
    params: Promise<PageParams>
}

export async function generateMetadata({
    params
}: MetaProps): Promise<Metadata> {
    try {
        const { slug = [homeSlug], locale } = (await params) || {}
        const page = await getPageBySlug(slug.join('/'), {
            locale
        })
        // if no page is returned return {}
        if (!page) {
            return {}
        }

        const {
            fields: { seoMetadata }
        } = page
        return createMetadata(
            seoMetadata?.fields as SeoData,
            routing.defaultLocale
        )
    } catch (error) {
        console.error('Error generating metadata:', error)
        return {}
    }
}

/**
 * Generate params for static generation of pages.
 *
 * @returns An array of `PageParams` objects that is handled internally by Next.js to build static pages.
 */

export const generateStaticParams = async (): Promise<PageParams[]> => {
    try {
        // Get all pages for all locales, with only the fields that we need
        const pages = await getPageList({
            select: ['fields.slug']
        })
        if (!pages?.items?.length) {
            return []
        }

        const params: PageParams[] = []

        // For each page, and its available regions and translations, construct a `PageParams` object
        pages.items.forEach(({ fields }) => {
            if (fields.slug === homeSlug) {
                routing.locales.forEach((locale) => {
                    params.push({
                        locale,
                        slug: []
                    })
                })
            }
            if (fields.slug)
                routing.locales.forEach((locale) => {
                    params.push({
                        locale,
                        slug: [fields.slug]
                    })
                })
        })

        return params
    } catch (error) {
        console.error('Error generating static params:', error)
        return []
    }
}

/**
 * Display a page based on locale and slug.
 */
// @ts-expect-error: TBD
const Page = async ({ params }: PageProps) => {
    const { slug = [homeSlug], locale } = (await params) || {}
    const page = await getPageBySlug(slug.join('/'), {
        locale
    })

    // 404 redirect if no page is returned, or the page has no `region` set
    if (!page) notFound()

    const {
        fields: { heroModule, contentModules }
    } = page

    return (
        <>
            <Seo
                pageName={page?.fields?.internalName as string}
                breadCrumbData={generateBreadcrumbsData()}
            />
            <div className={`page-${slug}`}>
                {heroModule && (
                    <ModuleRenderer
                        rendererType="hero"
                        modules={[heroModule]}
                        moduleRegistry={contentfulModuleRegistry}
                    />
                )}
                {contentModules && (
                    <ModuleRenderer
                        rendererType="content"
                        modules={contentModules}
                        moduleRegistry={contentfulModuleRegistry}
                    />
                )}
            </div>
        </>
    )
}

export default Page
