
export type FieldLink<T = string> = {
    sys: {
        type: "Link"
        linkType: T
        id: string
    }
}

export type FieldType<T = string> = {
    [field: string]: {
        [locale: string]: FieldLink<T> | FieldLink<T>[]
    }
}
