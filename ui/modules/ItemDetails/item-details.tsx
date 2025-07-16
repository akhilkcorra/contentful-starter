import React, { FC } from 'react'
import Image from 'next/image'
import { ItemDetailsFields } from '@/types/contentful/fields'
import { ModuleRendererModuleProps } from '@/types/globals'

/**
 * Type definition for the props of the ItemDetails component.
 * Combines properties from ModuleRendererModuleProps and ItemDetailsFields.
 */
export type ItemDetailsProps = ModuleRendererModuleProps & ItemDetailsFields

/**
 * ItemDetails component displays the details of an item including its name and image.
 *
 * @param {ItemDetailsProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered component.
 */
const ItemDetails: FC<ItemDetailsProps> = ({ name, image }) => {
    // Extract image properties with safe navigation and default values.
    const imageUrl = image?.fields?.file?.url
        ? `https:${image.fields.file.url}`
        : ''
    const imageAlt = image?.fields?.title ?? ''
    const imageWidth = image?.fields?.file?.details?.image?.width ?? 0
    const imageHeight = image?.fields?.file?.details?.image?.height ?? 0

    return (
        <div className="p-10">
            {/* Display the name of the item */}
            <div>{name}</div>
            {/* Conditionally render the image if the URL is available */}
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt={imageAlt}
                    width={imageWidth}
                    height={imageHeight}
                />
            )}
        </div>
    )
}

export default ItemDetails
