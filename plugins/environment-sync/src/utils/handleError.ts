const handleError = (error: any): string => {
    let errorMessage = 'An unknown error occurred.'

    const parseErrorMessage = (message: string): string => {
        try {
            const parsedMessage = JSON.parse(message)
            return parsedMessage?.message || message
        } catch {
            return message
        }
    }

    if (error?.message) {
        if (typeof error.message === 'string') {
            errorMessage = parseErrorMessage(error.message)
        } else {
            errorMessage = JSON.stringify(error.message)
        }
    } else if (typeof error === 'string') {
        errorMessage = parseErrorMessage(error)
    } else {
        errorMessage = JSON.stringify(error)
    }

    console.error('Error Message:', errorMessage)
    return errorMessage
}

export default handleError
