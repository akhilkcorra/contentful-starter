import { defineRouting, LocalePrefix } from 'next-intl/routing'

export const localePrefix = {
    mode: 'as-needed'
}

export const localeOptions = {
    en: 'English',
    fr: 'French'
}

export const routing = defineRouting({
    locales: Object.keys(localeOptions) as (keyof typeof localeOptions)[],
    defaultLocale: 'en',
    localePrefix: localePrefix as LocalePrefix
})

export type Locale = (typeof routing.locales)[number]
