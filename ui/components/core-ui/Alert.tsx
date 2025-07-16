import React, { useEffect } from 'react'
import {
    Success,
    Error,
    Warning,
    Information,
    Notification,
    Cross
} from '@/public/icons'

type AlertProps = {
    message: string
    type: 'success' | 'error' | 'info' | 'warning' | 'notification' // Different alert types
    onClose: () => void
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
    // Focus the alert for screen reader support
    useEffect(() => {
        const alertElement = document.getElementById('alert')
        if (alertElement) {
            alertElement.focus()
        }
    }, [])

    // Color schemes based on alert type
    const alertColors = {
        success: {
            icon: '#0C8293',
            text: '#0C8293',
            close: '#0C8293'
        },
        error: {
            icon: '#CE0004',
            text: '#CE0004',
            close: '#CE0004'
        },
        info: {
            icon: '#000',
            text: '#000',
            close: '#000'
        },
        warning: {
            icon: '#CE0004',
            text: '#CE0004',
            close: '#CE0004'
        },
        notification: {
            icon: '#000',
            text: '#000',
            close: '#000'
        }
    }

    const { icon, text, close } = alertColors[type]

    // Icon based on the type of alert
    const getIcon = (type: string) => {
        switch (type) {
            case 'success':
                return <Success /> // Success icon
            case 'error':
                return <Error /> // Error icon
            case 'warning':
                return <Warning /> // Warning icon
            case 'info':
                return <Information /> // Info icon
            case 'notification':
                return <Notification /> // Warning icon
            default:
                return <Success />
        }
    }

    return (
        <div id="alert" className="alert p-4">
            <div className="alert-content flex items-center gap-3 text-sm leading-[1.4375rem]">
                {/* Icon next to the alert message */}
                <span
                    className="alert-icon"
                    role="icon"
                    aria-hidden="true"
                    style={{ color: icon }}
                >
                    {getIcon(type)}
                </span>
                <p style={{ color: text }}>{message}</p>
                {/* Close icon */}
                <button
                    aria-label="Close alert"
                    className="close-icon"
                    onClick={onClose}
                    style={{
                        color: close,
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <Cross width="11" height="11" />
                </button>
            </div>
        </div>
    )
}

export default Alert
