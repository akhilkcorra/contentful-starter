import React, { forwardRef } from 'react'

type HeadingProps = {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' // Specifies which heading level (defaults to 'h1')
    children: React.ReactNode // Content inside the heading
    className?: string // Tailwind CSS class names (and additional styles)
    style?: React.CSSProperties // Optional inline styles
} & React.HTMLProps<HTMLHeadingElement> // Extend the props with HTMLAttributes for headings

/**
 * Custom Heading component that renders dynamic heading tags with Tailwind classes.
 * @param {HeadingProps} props - The props for the Heading component.
 */
const Heading = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
    const {
        as = 'h1', // Default tag is 'h1'
        children,
        className = '',
        style,
        ...rest
    } = props

    // Define a mapping of heading tags to their respective Tailwind CSS classes
    const styles = {
        h1: 'font-normal text-[2.75rem] leading-normal mb-2.5',
        h2: 'font-normal text-4xl leading-normal mb-2.5',
        h3: 'font-normal text-xl leading-normal mb-2.5',
        h4: 'font-normal text-lg leading-normal mb-2.5',
        h5: 'font-normal text-base leading-normal mb-2.5',
        h6: 'font-normal text-sm leading-normal mb-2.5'
    }

    // Get the class names for the selected heading tag
    const headingClass = styles[as] || styles.h1 // Default to h1 styles if 'as' is not valid

    // Combine the dynamic styles with any additional classes passed via className
    const combinedClassNames = `${headingClass} ${className}`

    // The component will render the appropriate heading tag based on the 'as' prop
    const HeadingTag = as

    return (
        <HeadingTag
            className={combinedClassNames}
            style={style}
            ref={ref} // Use ref as typed
            {...rest}
        >
            {children}
        </HeadingTag>
    )
})
// Manually setting the displayName to ensure clarity
Heading.displayName = 'Heading'

export default Heading
