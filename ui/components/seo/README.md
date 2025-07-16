# 🚀 SEO Reusable Module for NextJS (App Router)

This module provides a reusable SEO component for **NextJS (App Router)**,
allowing you to dynamically set **meta tags, Open Graph (OG) data, and Twitter Card metadata** for better search
engine optimization.
Additionally, it includes components for generating **Organization, breadcrumb schemas** schema markup for
improved structured data.

---

## **📦 Installation**

Ensure you have a Next.js project set up in App route. Place this **seo** module inside **ui/components**

## ** Metadata API implementation**

We have implemented **generateMetadata** inside **app/[...slug]/page.tsx** to dynamically generate metadata for the page.
Additionally, we have created a utility function (**utils/createMetadata.ts**) within the SEO module to handle metadata generation.

The metadata details retrieved from Contentful are passed to this utility function, which formats the data accordingly.
Next.js automatically handles meta tag creation—we simply need to ensure that **generateMetadata** returns the metadata
in the required format.

```tsx
export async function generateMetadata({
    params
}: MetaProps): Promise<Metadata> {
    const { slug } = (await params) || {}
    const page = await getPageBySlug(slug.join('/'))

    // 404 redirect if no page is returned
    if (!page) notFound()

    const {
        fields: { seoMetadata }
    }: { fields: PageFields } = page
    return createMetadata(
        seoMetadata?.fields as SeoData,
        i18nConfig.defaultLocale
    )
}
```

To add a custom meta tag, simply return the other attribute with all the custom meta values from the **generateMetadata** function.

```tsx

other: {
    'custom-meta': 'My Custom Meta Value'
}

```

## ** Seo component**

This serves as the entry point for the SEO module, where all the necessary components are imported and utilized. It is invoked from **app/[...slug]/page.tsx**, passing all the required props.
File name : **ui/components/seo/seo.tsx**

```tsx
<Seo pageName={page?.fields.internalName} breadCrumbData={breadcrumbs} />
```

## ** Organization schema implementation**

We have implemented **components/organization.tsx** to generate the organization schema and integrated it into the **seo.tsx** component.
Currently, the organization schema details are sourced from the config file (**config/seo.ts**), which was added as part of the SEO implementation.

## ** Breadcrumb schema implementation**

We have implemented **components/breadcrumb.tsx** to generate the breadcrumb schema and integrated it inside the **seo.tsx** component file.
We have currently added sample breadcrumb data in the file (**utils/generateBreadcrumbsData.ts**) which is used to generate the breadcrumb schema.
