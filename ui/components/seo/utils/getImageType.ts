export function getImageTypeFromURL(url: string): string {
    const extension =
        url?.split('.')?.pop()?.split(/[#?]/)[0].toLowerCase() || ''
    const imageTypes: Record<string, string> = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        webp: 'image/webp',
        svg: 'image/svg+xml',
        bmp: 'image/bmp',
        ico: 'image/x-icon'
    }
    return imageTypes[extension] || 'unknown'
}
