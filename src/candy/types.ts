export type Dimensions = { width: number; height: number }
export interface Named {
  name: {
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
}

export type Position = {
  row: number
  column: number
}

export interface Sized {
  size?: Dimensions
}
