import { ReactNode } from 'react'
import { Radio } from '@/public/icons'

interface RadioButtonProps {
    checked?: boolean // Initial checked state for the radio button
    required?: boolean // Optional required flag for the radio button
    id: string // ID for the radio button
    name: string // Name for the radio button group, ensures only one button is selected
    value: string // Value of the radio button, used to identify the selected option
    disabled?: boolean // Disabled state for the radio button
    ariaLabel?: string // Optional ARIA label for accessibility
    ariaDescribedBy?: string // Optional ARIA description for further explanation
    children: ReactNode // Label or content that will be shown next to the radio button
    legend?: string // Optional legend for the radio button group
    selectedValue: string // The currently selected value
    onSelect: (value: string) => void // Function to update the selected value in the parent
}

const RadioButton: React.FC<RadioButtonProps> = ({
    required = false,
    id,
    name,
    value,
    disabled = false,
    ariaLabel,
    ariaDescribedBy,
    children,
    legend,
    selectedValue,
    onSelect
}) => {
    // Handle state change on click, but prevent it if disabled
    const handleChange = () => {
        if (!disabled) {
            onSelect(value) // Update the selected value in the parent
        }
    }

    // Disabled and selected class name logic
    const radioClassNames = `appearance-none select-none h-6 w-6 rounded-full border text-transparent ${
        selectedValue === value
            ? 'checked:bg-none checked:border-[#1b75bc]'
            : ''
    } ${disabled ? 'border-[#949698] cursor-not-allowed opacity-50 pointer-events-none' : 'border-[#949698] cursor-pointer'}`

    const labelClassNames = `text-base ${disabled ? 'text-[#949698] cursor-default' : 'text-black cursor-pointer'}`

    return (
        <fieldset className="relative pb-[14px] last:pb-0">
            {/* Render the <legend> if provided */}
            {legend && <legend className="sr-only">{legend}</legend>}

            <div className="flex items-center gap-2">
                <input
                    name={name} // All radio buttons in a group should have the same name
                    id={id}
                    role="radio"
                    type="radio"
                    checked={selectedValue === value} // Check if this radio button is selected
                    value={value} // Value for this radio button
                    required={required}
                    disabled={disabled} // Apply disabled state to radio button
                    className={radioClassNames}
                    onChange={handleChange}
                    aria-checked={selectedValue === value} // ARIA attribute to indicate the radio button's state
                    aria-label={ariaLabel} // Optional ARIA label for accessibility
                    aria-describedby={ariaDescribedBy} // Optional ARIA description for further explanation
                />
                <label className={labelClassNames} htmlFor={id}>
                    {children}
                </label>
            </div>

            {selectedValue === value && !disabled && (
                <div className="absolute left-0 top-0 -z-10 border-[9px] border-[#1b75bc] rounded-full text-white">
                    <Radio width="8" height="8" />
                </div>
            )}
        </fieldset>
    )
}

export default RadioButton
