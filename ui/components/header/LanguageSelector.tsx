import { routing } from '@/i18n/routing'
import LocaleSwitcherSelect from '@/ui/components/header/LocaleSwitcherSelect'
import { useTranslations, useLocale } from 'next-intl'
import React from 'react'

const LanguageSelector = () => {
    const t = useTranslations('LocaleSwitcher')
    const locale = useLocale()
    return (
        <LocaleSwitcherSelect
            defaultValue={locale}
            label={t('label')}
            options={routing.locales.map((cur) => ({
                label: t('locale', { locale: cur }),
                value: cur
            }))}
        />
    )
}

export default LanguageSelector
