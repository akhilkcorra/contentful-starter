export type BreadCrumbDataType = {
    name: string
    url: string
}
export type Breadcrumbs = {
    breadcrumbs: BreadCrumbDataType[]
}
export type SeoDataType = {
    pageName: string | undefined | null
    breadCrumbData: BreadCrumbDataType[]
}

export type SeoData = {
    title: string
    description: string
    openGraphType:
        | 'website'
        | 'article'
        | 'book'
        | 'profile'
        | 'music.song'
        | 'music.album'
        | 'music.playlist'
        | 'music.radio_station'
        | 'video.movie'
        | 'video.episode'
        | 'video.tv_show'
        | 'video.other'
    openGraphTitle: string
    openGraphDescription: string
    openGraphSiteName: string
    openGraphUrl: string | URL | undefined
    openGraphImage?: {
        fields: {
            file: {
                url: string | URL
                details: {
                    image: {
                        width: number
                        height: number
                    }
                }
                fileName: string
            }
        }
    }
    twitterCard:
        | 'summary'
        | 'summary_large_image'
        | 'player'
        | 'app'
        | undefined
    twitterSite: string | undefined
    twitterTitle: string
    twitterDescription: string
    twitterImage?: {
        fields: {
            file: {
                url: string
            }
        }
    }
}
