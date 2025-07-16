import { FieldType, FieldLink } from './type';

export function findFields<T = string>(type: T, fields: FieldType) {
    const links: FieldLink<T>[] = [];
    Object.values(fields).forEach((locales) => {
        Object.values(locales).forEach((locale) => {
            if (Array.isArray(locale)) {
                locale.forEach((item) => {
                    if (item?.sys?.linkType === type) {
                        links.push(item as FieldLink<T>);
                    }
                });
            } else {
                if (locale?.sys?.linkType === type) {
                    links.push(locale as FieldLink<T>);
                }
            }
        });
    });

    return links
}

