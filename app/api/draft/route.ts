import { routing } from '@/i18n/routing'
import { LocalePrefixMode } from 'next-intl/routing'
import { cookies, draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

type ParsedRequestUrl = {
    origin: string
    host: string
    slug: string
    pathPrefix: string
    locale: string
    contentfulPreviewSecret: string
}

const parseRequestUrl = (requestUrl?: string): ParsedRequestUrl => {
    if (!requestUrl) throw new Error('Missing `url` value in request')

    const url = new URL(requestUrl)
    return {
        origin: url.origin,
        host: url.host,
        slug: url.searchParams.get('slug') || '',
        pathPrefix: url.searchParams.get('pathPrefix') || '',
        locale: url.searchParams.get('locale') || '',
        contentfulPreviewSecret: url.searchParams.get('secret') || ''
    }
}

const getLocalePrefix = (locale?: string): string => {
    if (!locale) return ''
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const localePrefixMode = (routing?.localePrefix as any)
        ?.mode as LocalePrefixMode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const localePrefixPrefixes = (routing?.localePrefix as any)?.prefixes
    if (localePrefixMode === 'always') {
        return localePrefixPrefixes[locale] ?? ''
    }
    if (localePrefixMode === 'as-needed') {
        return routing.defaultLocale === locale
            ? ''
            : (localePrefixPrefixes[locale] ?? '')
    }
    return ''
}

const buildRedirectUrl = ({
    pathPrefix,
    slug,
    base,
    locale
}: {
    pathPrefix: string
    slug: string
    locale?: string
    base: string
}): string => {
    return new URL(
        `${getLocalePrefix(locale)}${pathPrefix ? `/${pathPrefix}` : ''}/${slug}`,
        base
    ).toString()
}

const enableDraftMode = async () => {
    const draft = await draftMode()
    draft.enable()
    const cookieStore = await cookies()
    const cookie = cookieStore.get('__prerender_bypass')!
    cookieStore.set({
        name: '__prerender_bypass',
        value: cookie?.value,
        httpOnly: true,
        path: '/',
        secure: true,
        sameSite: 'none'
    })
}

export async function GET(request: NextRequest): Promise<Response | void> {
    const { origin, slug, pathPrefix, locale, contentfulPreviewSecret } =
        parseRequestUrl(request.url)

    if (process.env.NODE_ENV === 'development') {
        await enableDraftMode()
        return redirect(
            buildRedirectUrl({ slug, pathPrefix, base: origin, locale })
        )
    }

    if (contentfulPreviewSecret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
        return new Response(
            'Invalid bypass token. Please check your link and try again.',
            { status: 403 }
        )
    }

    if (!slug) {
        return new Response('Missing required query parameter `slug`', {
            status: 400
        })
    }

    await enableDraftMode()
    return redirect(
        buildRedirectUrl({ slug, pathPrefix, base: origin, locale })
    )
}
