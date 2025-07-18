import { Link } from '@/i18n/navigation'

export const metadata = {
    title: '404 - Page Not Found'
}

export default function NotFound() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist</p>
            <Link
                href="/"
                style={{ color: 'blue', textDecoration: 'underline' }}
            >
                Go back home
            </Link>
        </div>
    )
}
