import { Link } from '@/i18n/navigation'
import { AnchorHTMLAttributes } from 'react'

type LinkProps = {
    to: string // `to` represents the target link
    className?: string // Optional CSS classes for styling
    disabled?: boolean // Optional disabled prop
    variant?: 'link' | 'linkSecondary' // Variant for color scheme
    target?: '_self' | '_blank' | '_parent' | '_top' | string // Optional target attribute
} & AnchorHTMLAttributes<HTMLAnchorElement> // Extend with the correct type for anchor element attributes

/**
 * Custom link component with disabled state, variants, and styles.
 * @param {LinkProps} props - The props for the Link component.
 */
export default function CustomLink({
    to,
    className,
    disabled = false,
    variant = 'link', // Default variant is 'primary'
    target = '_self', // Default target is '_self'
    ...rest
}: LinkProps) {
    // Default styles for the link
    const defaultClasses =
        'font-normal text-base leading-[1.625rem] underline text-[#234b91] hover:text-[#8fd1ff]'

    // Disabled styles (change colors, prevent hover)
    const disabledClasses =
        'text-[#949698] hover:text-[#949698] cursor-default pointer-events-none'

    // Variant styles based on the `variant` prop
    const variantClasses = {
        link: '',
        linkSecondary: 'hover:no-underline'
    }

    // Combine the default classes, variant, size, and disabled styles
    const combinedClasses = `${defaultClasses} ${variantClasses[variant]} ${disabled ? disabledClasses : ''} ${className || ''}`

    // Prevent link click behavior if disabled
    const handleClick = (e: React.MouseEvent) => {
        if (disabled) {
            e.preventDefault() // Prevent navigation if disabled
        }
    }

    return (
        <Link
            href={to}
            aria-disabled={disabled ? 'true' : 'false'}
            className={combinedClasses}
            target={target}
            onClick={handleClick}
            tabIndex={disabled ? -1 : 0}
            {...rest}
        >
            {rest.children}
        </Link>
    )
}
