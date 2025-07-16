import { Geist, Geist_Mono } from 'next/font/google'
import './global.css'
import Header from '@/ui/components/header/header'
import Footer from '@/ui/components/footer/footer'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { setRequestLocale } from 'next-intl/server'
import { draftMode } from 'next/headers'

interface LayoutProps {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}
const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
})

export default async function RootLayout({ children, params }: LayoutProps) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params
    if (!hasLocale(routing.locales, locale)) {
        notFound()
    }
    const { isEnabled } = await draftMode()

    // Enable static rendering
    setRequestLocale(locale)

    return (
        <html lang={locale}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} text-base leading-[1.625rem] font-normal  min-h-dvh flex flex-col overflow-x-hidden antialiased`}
            >
                {isEnabled && 'IS Draft enabled'}
                <NextIntlClientProvider>
                    <Header />
                    {children}
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
