export const chunk = <T>(input: T[], chunkSize: number): T[][] => {
    const result = []
    for (let i = 0; i < input.length; i += chunkSize) {
        result.push(input.slice(i, i + chunkSize))
    }
    return result
}

export default chunk
