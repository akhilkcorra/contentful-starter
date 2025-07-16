import React from 'react'

type JsonLdProps<T> = {
    data: T
}

const JsonLd = <T,>({ data }: JsonLdProps<T>) => {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data, null, '\t')
            }}
        />
    )
}

export default JsonLd
