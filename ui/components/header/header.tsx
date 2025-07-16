// The is added for testing. This header will be deleted once the data is driven from contentful
'use client'
import { Close, Logo, Menu } from '@/public/icons'
import CustomLink from '@/ui/components/core-ui/CustomLink'
import { Link } from '@/i18n/navigation'
import React, { useState } from 'react'
import LanguageSelector from './LanguageSelector'
import clsx from 'clsx'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const navLinks = [
        { href: '/shop-all', label: 'Shop All' },
        { href: '/new-products', label: 'New Products' },
        { href: '/bars', label: 'Bars' }
    ]
    return (
        <header className="header-wrapper shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.1607843137)]">
            <div className="flex gap-5 flex-wrap items-center justify-center max-w-[90rem] mx-auto p-5 md:justify-between lg:px-10">
                <button onClick={toggleMenu} className="md:hidden">
                    <span className="sr-only">Toggle Menu</span>
                    {isMenuOpen ? <Close /> : <Menu />}
                </button>
                <div className="header-logo mx-auto md:mx-0 md:mr-4">
                    <Link href={'/'} className="logo">
                        <span className="sr-only">Logo</span>
                        <Logo />
                    </Link>
                </div>
                <div
                    className={clsx(
                        'md:flex md:flex-row basis-full md:basis-auto gap-5',
                        {
                            'flex flex-col': isMenuOpen,
                            hidden: !isMenuOpen
                        }
                    )}
                >
                    <ul className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-4">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <CustomLink
                                    to={link.href}
                                    className="text-black inline-block md:block no-underline"
                                >
                                    {link.label}
                                </CustomLink>
                            </li>
                        ))}
                    </ul>
                    <LanguageSelector />
                </div>
            </div>
        </header>
    )
}

export default Header
