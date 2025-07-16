import React, { FC } from 'react'
import { Organization, Breadcrumb, SeoDataType } from '@/ui/components/seo'

export const Seo: FC<SeoDataType> = ({ pageName, breadCrumbData }) => {
    // Helper function to determine if the page is the home page
    const isHomePage = (): boolean => pageName === 'Home'

    // Helper function to render the Organization component
    const renderOrganization = () => isHomePage() && <Organization />

    // Helper function to render the Breadcrumb component
    const renderBreadcrumb = () =>
        breadCrumbData && <Breadcrumb breadcrumbs={breadCrumbData} />

    return (
        <section>
            {renderOrganization()}
            {renderBreadcrumb()}
        </section>
    )
}
