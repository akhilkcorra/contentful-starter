import clsx from 'clsx'
import React from 'react'

export type SelectProps = Omit<React.ComponentProps<'select'>, 'size'> & {
    options: {
        label: string
        value: string
    }[] // Array of options to display in the select element
    size?: 'large' | 'small' // Optional size for the select element
    label?: string // Optional label for the select element
}

const Select: React.FC<SelectProps> = ({
    options,
    name,
    size = 'small',
    required = false,
    label, // Destructure label,
    defaultValue,
    ...props
}) => {
    return (
        <div className="form-group flex flex-col w-fit">
            {label && (
                <label htmlFor={name} className="text-black text-base">
                    {label}
                </label>
            )}
            <select
                name={name}
                id={name} // Make sure the select has the correct id for accessibility
                className={clsx(
                    "text-base leading-7 border border-[#d2d2d4] bg-transparent rounded-[0.4375rem] pl-4 pr-7 py-2 appearance-none bg-[url('~/public/downArrow.svg')] bg-[right_10px_center] bg-no-repeat",

                    {
                        'w-full': size === 'large',
                        'min-w-[127px]': size === 'small'
                    }
                )}
                defaultValue={defaultValue ?? options[0]?.value}
                required={required}
                style={{ backgroundSize: '11px' }}
                {...props}
            >
                {Array.isArray(options) &&
                    options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
            </select>
        </div>
    )
}

export default Select
