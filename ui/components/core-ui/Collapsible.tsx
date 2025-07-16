import React, { useState } from 'react'
import { Plus, Minus } from '@/public/icons'

type CollapsibleProps = {
    title: string
    children: React.ReactNode
}

const Collapsible: React.FC<CollapsibleProps> = ({ title, children }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    // Toggle the collapse state
    const toggleCollapse = () => setIsExpanded((prev) => !prev)

    // Define the icon based on the expanded state
    const icon = isExpanded ? <Minus /> : <Plus /> // Use ± for collapse/expand

    return (
        <div className="collapsible shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.1607843137)]">
            <button
                className="collapsible-header text-lg font-bold flex items-center justify-between w-full p-4"
                type="button"
                aria-expanded={isExpanded} // Indicates whether the content is expanded or collapsed
                aria-controls="collapsible-content"
                onClick={toggleCollapse} // Toggle on click
            >
                {/* Displaying the icon and title */}
                {title}
                <span className="collapsible-icon">{icon}</span>{' '}
                {/* Expand/Collapse icon */}
            </button>

            {/* Collapsible content */}
            <div
                id="collapsible-content"
                className="collapsible-content py-2 px-4"
                style={{ display: isExpanded ? 'block' : 'none' }}
                aria-hidden={!isExpanded} // Announce visibility to screen readers
            >
                {children}
            </div>
        </div>
    )
}

export default Collapsible
