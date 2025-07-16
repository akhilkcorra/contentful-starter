import React, { useState } from 'react'
import RadioButton from './RadioButton'

const RadioGroup: React.FC = () => {
    const [selectedValue, setSelectedValue] = useState<string>('option2')

    const handleSelect = (value: string) => {
        setSelectedValue(value)
    }

    return (
        <div>
            <RadioButton
                id="radio1"
                name="options"
                value="option1"
                selectedValue={selectedValue}
                onSelect={handleSelect}
            >
                Option 1
            </RadioButton>

            <RadioButton
                id="radio2"
                name="options"
                value="option2"
                selectedValue={selectedValue}
                onSelect={handleSelect}
            >
                Option 2
            </RadioButton>

            <RadioButton
                id="radio3"
                name="options"
                value="option3"
                selectedValue={selectedValue}
                onSelect={handleSelect}
                disabled={true} // Disable this option
            >
                Option 3 (Disabled)
            </RadioButton>
        </div>
    )
}

export default RadioGroup
