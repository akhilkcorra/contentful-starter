// The is added for testing. This Footer will be deleted once the data is driven from contentful
'use client'
import { Facebook, Instagram, Twitter, Youtube } from '@/public/icons'
import CustomLink from '@/ui/components/core-ui/CustomLink'
import { AppConfig, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

type FooterLink = {
    label: keyof AppConfig['Messages']['Footer']
    href: `/${string}`
}

const footerLinks: FooterLink[] = [
    { label: 'home', href: '/' },
    { label: 'aboutUs', href: '/about' },
    { label: 'services', href: '/services' },
    { label: 'contact', href: '/contact' }
]

const socialIcons = [
    { name: 'Facebook', icon: <Facebook />, href: 'https://facebook.com' },
    { name: 'Twitter', icon: <Twitter />, href: 'https://twitter.com' },
    { name: 'Instagram', icon: <Instagram />, href: 'https://instagram.com' },
    { name: 'Youtube', icon: <Youtube />, href: 'https://www.youtube.com/' }
]

const Footer = () => {
    const t = useTranslations('Footer')
    return (
        <footer className="footer text-center mt-auto">
            <div className="max-w-[90rem] mx-auto px-5 lg:px-10">
                <div className="footer-links after:content-[''] after:block after:border-b-[#BCBEC2] after:border-b after:border-solid md:after:w-[8.125rem] md:after:mx-auto">
                    <ul className="py-5 md:flex md:items-center justify-center gap-8">
                        {footerLinks.map((link) => (
                            <li key={link.href}>
                                <CustomLink
                                    to={link.href}
                                    variant="linkSecondary"
                                    className="py-1 inline-block no-underline"
                                >
                                    {t(link.label)}
                                </CustomLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="footer-social after:content-[''] after:block after:border-b-[#BCBEC2] after:border-b after:border-solid md:after:w-[8.125rem] md:after:mx-auto">
                    <ul className="flex items-center justify-center gap-5 py-5">
                        {socialIcons.map((social) => (
                            <li key={social.name}>
                                <Link
                                    href={social.href}
                                    className="bg-[#2b71bd] w-10 h-10 flex items-center justify-center"
                                    target="_blank"
                                >
                                    <span className="sr-only">
                                        {social.name}
                                    </span>
                                    {social.icon}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="footer-copyright pt-5 pb-10 text-sm">
                    <p>&copy; 2025 Your Company Name. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
