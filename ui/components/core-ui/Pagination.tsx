import React from 'react'
import { ArrowNext, ArrowPrev } from '@/public/icons'

type PaginationProps = {
    paginationArray: number[] // Array of page numbers to be displayed in the pagination
    currentPage: number // The current active page
    onPageChange: (page: number) => void // Function to handle page changes
}

const Pagination: React.FC<PaginationProps> = ({
    paginationArray,
    currentPage,
    onPageChange
}) => {
    const handlePageClick = (page: number) => {
        onPageChange(page)
    }

    const handlePrevClick = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    const handleNextClick = () => {
        if (currentPage < paginationArray.length) {
            onPageChange(currentPage + 1)
        }
    }

    // Create the page numbers to display, including ellipsis
    const createVisiblePages = () => {
        const maxPages = 4
        const totalPages = paginationArray.length

        // Initialize pages array as a number[] or string[] (for ellipsis)
        const pages: (number | string)[] = []

        // Show the first few pages
        pages.push(...paginationArray.slice(0, maxPages))

        if (totalPages > maxPages) {
            // If there are more pages, add dots after the first few pages
            if (currentPage < totalPages - 1) {
                pages.push('...') // Push the ellipsis
            }
            // Always show the last page, plus a page before it if needed
            pages.push(totalPages)
        }

        return pages
    }

    const visiblePages = createVisiblePages()

    return (
        <nav aria-label="Pagination">
            <ul className="flex items-center space-x-2">
                {/* Prev Button */}
                <li className="!m-0">
                    <button
                        onClick={handlePrevClick}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center mx-2.5 p-3 border ${
                            currentPage === 1
                                ? 'border-gray-300 cursor-default'
                                : 'bg-white border-[#234b91] cursor-pointer hover:border-[#8fd1ff]'
                        }`}
                        aria-label="Previous Page"
                    >
                        <ArrowPrev />
                        <span className="sr-only">Previous</span>
                    </button>
                </li>

                {/* Page Number Links */}
                {visiblePages.map((page, index) => (
                    <li key={index} className="!m-0">
                        {page === '...' ? (
                            <span className="text-black">...</span>
                        ) : (
                            <button
                                onClick={() => handlePageClick(page as number)} // Type assertion for page as number
                                className={`text-base text-[#234b91] leading-none px-3 py-2 hover:text-[#8fd1ff] ${
                                    currentPage === page
                                        ? 'text-black font-bold no-underline hover:text-black'
                                        : 'font-normal underline'
                                }`}
                                aria-current={
                                    currentPage === page ? 'page' : undefined
                                }
                            >
                                {page}
                            </button>
                        )}
                    </li>
                ))}

                {/* Next Button */}
                <li className="!m-0">
                    <button
                        onClick={handleNextClick}
                        disabled={currentPage === paginationArray.length}
                        className={`flex items-center justify-center mx-2.5 p-3 border ${
                            currentPage === paginationArray.length
                                ? 'border-gray-300 cursor-default'
                                : 'bg-white border-[#234b91] hover:border-[#8fd1ff]'
                        }`}
                        aria-label="Next Page"
                    >
                        <ArrowNext />
                        <span className="sr-only">Next</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination
