import { createContext } from "react"

export interface BoardDefinition {
  pedID: string
  board: string
}

export interface CandyBoxState {
  placedCandy: {
    candyID: string
  }
  candies: {
    candyID: string
  }[]
}

const dispatch = () => {}

export const CandyBoxContext = createContext<typeof dispatch | null>(null)
