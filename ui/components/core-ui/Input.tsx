import React, { useState } from 'react'

interface InputProps {
    label: string
    placeholder: string
    error?: string // Optional error message prop
    id: string // Add an ID for accessibility purposes
    type?: 'text' | 'password' // Allow type to be either 'text' or 'password'
}

const Input: React.FC<InputProps> = ({
    label,
    placeholder,
    error,
    id,
    type = 'text' // Default to 'text' if no type is provided
}) => {
    const [value, setValue] = useState<string>('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    return (
        <form>
            <div className="mb-3">
                <label
                    htmlFor={id} // Associate the label with the input via id
                    className="block capitalize text-black text-base relative"
                >
                    {label}
                </label>
                <input
                    id={id} // ID helps associate the label with this input for screen readers
                    type={type} // Set the type dynamically
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                    className="appearance-none w-full border border-[#BCBEC2] bg-transparent rounded-[0.4375rem] px-4 py-2 text-[0.9375rem] leading-7 focus:shadow-none focus:outline-none focus:border-[#d02e2e]"
                    aria-invalid={error ? 'true' : 'false'} // Indicate if there is an error
                    aria-describedby={error ? `${id}-error` : undefined} // Link the error message to the input
                />
                {error && (
                    <span
                        id={`${id}-error`} // Associate the error message with the input using id
                        className="text-[#d02e2e] text-[0.8125rem] mt-1"
                        role="alert" // Alert role informs screen readers of an error message
                    >
                        {error}
                    </span>
                )}
            </div>
        </form>
    )
}

export default Input
