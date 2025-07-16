import { Locale } from '@/i18n/routing'
import { TypeItemDetails } from '@/types/contentful/generated/skeletons'
import { TypePage } from '@/types/contentful/generated/skeletons'

/**
 * Default chain modifiers used to fetch data from Contentful.
 * We only want to return links with our entries that can be resolved.
 */
export type DefaultChainModifiers = 'WITHOUT_UNRESOLVABLE_LINKS'

export type AllLocalesChainModifiers =
    | 'WITHOUT_UNRESOLVABLE_LINKS'
    | 'WITH_ALL_LOCALES'

/**
 * Export types that picks out the `fields` prop from the `Entry` type.
 * These types can than be used as the `Props` type on modules that are directly linked to a Contentful content type.
 *
 * @example
 * ```
 * const MyModuleProps = MyModuleFields & {
 *   additionalProp?: string;
 * }
 *
 * const MyModule: FunctionComponent<MyModuleProps> = ({ theme /* from `MyModuleFields`*\/, additionalProp }) => {}
 * ```
 */
export type PageFields = Omit<
    TypePage<DefaultChainModifiers, Locale>['fields'],
    'internalName'
>
export type ItemDetailsFields = Omit<
    TypeItemDetails<DefaultChainModifiers, Locale>['fields'],
    'internalName'
>
