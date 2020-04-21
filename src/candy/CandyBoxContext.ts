import { createContext } from "react"

export type BoardDefinition = {
  /**
   * Pet's name
   */
  petID: string

  /**
   * The 8x8 board
   * newline delineated, and then with the appropate keys for
   * caramels, paper cubes, empty spots, and jelly cubes
   */
  board: string
}

export interface CandyBoxState {
  placedCandy: {
    candyID: string
    position: Position
  }[]

  candies: {
    candyID: string
  }[]
}

const dispatch = () => {}

export const CandyBoxContext = createContext<typeof dispatch | null>(null)
