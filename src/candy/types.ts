export type Dimensions = { width: number; height: number }

/**
 * A string has a language setting.
 */
export type Translatable = {
  /**
   * Official translation name
   */
  na: string
  /**
   * Japanese name
   */
  jp: string | null
  /**
   * Fan translation name
   */
  najp: string | null
}

export type SupportedTranslations = keyof Translatable

export interface Named {
  name: Translatable
}

export type Position = {
  row: number
  column: number
}

export interface Sized {
  size?: Dimensions
}
