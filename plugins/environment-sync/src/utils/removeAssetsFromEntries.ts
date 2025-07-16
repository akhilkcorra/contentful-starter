import { EntryProps } from 'contentful-management'

const removeAssetsFromEntries = (entries: EntryProps[]) => {
    return entries.map(entry => {
        Object.values(entry.fields).forEach((locales) => {
            Object.entries(locales).forEach(([key, locale]) => {
                if (Array.isArray(locale)) {
                    locale.forEach((item, index) => {
                        if (item?.sys?.linkType === 'Asset') {
                            locale.splice(index, 1);
                        }
                    })
                } else {
                    if ((locale as any)?.sys?.linkType === 'Asset') {
                        locales[key] = undefined
                    }
                }
            })
        })
        return entry
    })
}

export default removeAssetsFromEntries