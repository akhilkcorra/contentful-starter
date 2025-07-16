import { draftMode } from 'next/headers'
export async function generateStaticParams() {
    return [
        {
            locale: 'en-us'
        }
    ]
}
export const revalidate = 144400
export default async function Page({
    params
}: {
    params: Promise<{ locale: string }>
}) {
    const locale = (await params).locale
    const draftModeEnabled = (await draftMode()).isEnabled

    console.log({ draftModeEnabled })
    const serverTime = Date.now()

    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {})
    const data = await res.json()

    return (
        <main style={{ fontFamily: 'monospace', padding: 20 }}>
            <h1>🧪 Test Cache - JSONPlaceholder</h1>
            Locale - {locale}
            <p>
                <strong>Build Time:</strong> {new Date().toISOString()}
            </p>
            <p>
                <strong>Server Time:</strong> {serverTime}
            </p>
            <p>
                <strong>Fetched Post Title:</strong> {data.title}
            </p>
            <hr />
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </main>
    )
}
