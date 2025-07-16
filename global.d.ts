import { type Locale } from '@/i18n/routing'
import { formats } from '@/i18n/request'
import messages from '@/i18n/locales/en.json'

declare module 'next-intl' {
    interface AppConfig {
        Locale: Locale
        Messages: typeof messages
        Formats: typeof formats
    }
}
