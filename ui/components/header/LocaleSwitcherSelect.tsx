import { useParams } from 'next/navigation'
import { Locale } from 'next-intl'
import { ChangeEvent, useTransition } from 'react'
import { usePathname, useRouter } from '@/i18n/navigation'
import Select, { SelectProps } from '@/ui/components/core-ui/Select'

type Props = {
    options: SelectProps['options']
    defaultValue: string
    label: string
}

export default function LocaleSwitcherSelect({
    defaultValue,
    label,
    options
}: Props) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const pathname = usePathname()
    const params = useParams()

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const nextLocale = event.target.value as Locale
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                { locale: nextLocale }
            )
        })
    }

    return (
        <Select
            defaultValue={defaultValue}
            disabled={isPending}
            onChange={onSelectChange}
            options={options}
            label={label}
        />
    )
}
