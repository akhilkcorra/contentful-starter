import { useState, ReactNode } from 'react'
import { Check } from '@/public/icons'

interface CheckboxProps {
    checked?: boolean // Initial checked state
    required?: boolean // Optional required flag for the checkbox
    id: string // ID for the checkbox element
    name?: string // Optional name attribute
    disabled?: boolean // Disabled state of the checkbox
    ariaLabel?: string // Optional ARIA label for accessibility
    ariaDescribedBy?: string // Optional ARIA description ID
    children: ReactNode // Label or content that will be shown next to the checkbox
    legend?: string // Optional legend text for grouping checkboxes
}

const Checkbox: React.FC<CheckboxProps> = ({
    checked = false,
    required = false,
    id,
    name,
    disabled = false,
    ariaLabel,
    ariaDescribedBy,
    children,
    legend
}) => {
    const [selected, setSelected] = useState<boolean>(checked)

    // Handle state change on click
    const handleChange = () => {
        if (!disabled) {
            setSelected(!selected)
        }
    }
    // Disabled and selected class name logic
    const checkboxClassNames = `appearance-none select-none h-6 w-6 rounded border text-transparent ${
        selected ? 'checked:bg-none checked:border-[#1b75bc]' : ''
    } ${disabled ? 'border-[#949698] cursor-default' : 'border-[#949698] cursor-pointer'}`
    const labelClassNames = `text-base ${disabled ? 'text-[#949698] cursor-default' : 'text-black cursor-pointer'}`
    return (
        <fieldset className="relative pb-[14px] last:pb-0">
            {/* Add a <legend> tag if legend is provided */}
            {legend && <legend className="sr-only">{legend}</legend>}

            <div className="flex items-center gap-2">
                <input
                    name={name}
                    id={id}
                    role="checkbox"
                    type="checkbox"
                    checked={selected}
                    required={required}
                    disabled={disabled} // Apply disabled state to input
                    className={checkboxClassNames}
                    onChange={handleChange}
                    aria-checked={selected} // ARIA attribute to indicate the checkbox's state
                    aria-label={ariaLabel} // Optional ARIA label for accessibility
                    aria-describedby={ariaDescribedBy} // Optional ARIA description for further explanation
                />
                <label className={labelClassNames} htmlFor={id}>
                    {children}
                </label>
            </div>

            {selected && !disabled && (
                <div className="absolute left-0 -z-10 top-0 rounded-sm text-white bg-[#1b75bc]">
                    <Check width="24" height="24" />
                </div>
            )}
        </fieldset>
    )
}

export default Checkbox
