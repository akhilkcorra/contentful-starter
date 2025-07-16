import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url)
        const path = url.pathname.replace('/api/revalidate', '') || '/'

        // Revalidate the path
        await revalidatePath(path)

        // Return a successful JSON response
        return NextResponse.json({
            revalidated: true,
            url: path,
            now: Date.now()
        })
    } catch (error) {
        console.error('Error during revalidation:', error)
        return NextResponse.json({
            revalidated: false,
            now: Date.now(),
            message: 'Error during revalidation'
        })
    }
}
