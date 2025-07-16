import { Link } from '@/i18n/navigation'

type ButtonProps = {
    as?: 'button' | 'link' // Specifies if the element should render as a button or a link.
    to?: string // `to` represents the target link
    children: React.ReactNode // Content inside the button or link.
    className?: string // Additional CSS class names.
    disabled?: boolean // Whether the button is disabled.
    fullWidth?: boolean // If the button should take up the full width.
    href?: string // The URL for the link (used only when 'as' is 'a').
    prefetch?: boolean // Prefetch option for the link.
    label?: string // ARIA label for accessibility.
    smaller?: boolean // If the button should be smaller.
    variant?:
        | 'primary'
        | 'secondary'
        | 'disabled'
        | 'inverse'
        | 'inverseDisabled'
        | 'link' // Button variant.
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> // The onClick handler.
    buttonRef?: React.Ref<HTMLButtonElement> // Ref for the button element.
    type?: 'button' | 'submit' | 'reset' // ADA-compliant type attribute (button, submit, reset).
}

const Button: React.FC<ButtonProps> = ({
    as = 'link',
    to,
    children,
    className = '',
    disabled = false,
    fullWidth = false,
    prefetch = 'none',
    label = '',
    smaller = false,
    variant = 'primary',
    onClick,
    buttonRef,
    type = 'button',
    ...rest
}) => {
    const defaultButtonClassNames = `${
        className ? className : ''
    }font-normal text-white leading-normal tracking-normal capitalize text-center rounded-[1.875rem] ${
        smaller ? 'text-xs p-3' : 'text-base py-[0.875rem] px-8'
    } ${fullWidth ? 'min-w-full' : ''}`

    const variantOptionClassNames = {
        primary: 'bg-[#cb0027] hover:bg-[#a90020]',
        secondary:
            ' bg-[#1b75bc] border border-solid border-transparent py-[0.8125rem] hover:text-[#1b75bc] hover:bg-white hover:border-[#1b75bc]',
        disabled: 'bg-[#BCBEC2]',
        inverse: 'bg-transparent border hover:bg-white hover:text-black',
        inverseDisabled:
            'bg-transparent text-[#BCBEC2] border border-[#BCBEC2] opacity-100',
        link: 'font-normal text-base text-[#234b91] leading-[1.625rem] underline hover:text-[#8fd1ff]'
    }

    return (
        <>
            {as === 'button' || disabled ? (
                <button
                    className={`${defaultButtonClassNames} ${variantOptionClassNames[variant]}`}
                    aria-label={label ?? ''}
                    aria-disabled={as !== 'button' ? disabled : undefined}
                    disabled={as === 'button' ? disabled : undefined}
                    onClick={onClick}
                    ref={buttonRef}
                    type={type} // Adding the ADA-compliant `type` attribute
                    {...rest}
                >
                    {children}
                </button>
            ) : (
                <Link
                    href={to || '#'} // Provide a fallback value in case `to` is `undefined`
                    className={`${variantOptionClassNames[variant]}`}
                    aria-disabled={disabled ? 'true' : undefined}
                    prefetch={prefetch === true ? true : false}
                    onClick={onClick}
                    {...rest}
                >
                    {children}
                </Link>
            )}
        </>
    )
}

export default Button
