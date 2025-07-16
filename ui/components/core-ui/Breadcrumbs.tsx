import { Link } from '@/i18n/navigation'

type BreadcrumbItem = {
    title: string
    link: string
}

type BreadcrumbsProps = {
    breadcrumbArray: BreadcrumbItem[] // Array of breadcrumb items
    className?: string // Optional wrapper class name for styling
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
    breadcrumbArray,
    className = ''
}) => {
    return (
        <nav aria-label="breadcrumb">
            <ul className={`inline-block ${className}`}>
                {breadcrumbArray.map((item, index) => (
                    <li key={item.link} className="inline-flex items-center">
                        {index < breadcrumbArray.length - 1 ? (
                            // Render link for every breadcrumb except the last one
                            <Link
                                href={item.link}
                                className="text-[#1b75bc] text-xs font-bold uppercase underline"
                            >
                                {item.title}
                            </Link>
                        ) : (
                            // Last breadcrumb is just text, no link
                            <span className="text-xs text-[#1b75bc] font-bold uppercase">
                                {item.title}
                            </span>
                        )}
                        {/* Render separator (like > or /) between breadcrumbs */}
                        {index < breadcrumbArray.length - 1 && (
                            <span className="mx-2 text-xs text-[#1b75bc] font-bold">
                                /
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Breadcrumbs
