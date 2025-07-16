import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.ctfassets.net'
            }
        ],
        loader: 'custom',
        loaderFile: './utils/images/contentful-image-loader.ts'
    },
    async redirects() {
        return [
            {
                source: '/home',
                destination: '/',
                permanent: true
            }
        ]
    }
}

export default withNextIntl(nextConfig)
