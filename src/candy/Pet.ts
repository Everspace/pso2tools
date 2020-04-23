import yaml from "yaml.macro"
import { Named, Translatable } from "./types"
import { CandyPlacement } from "./Candy"
import { BoardSquareInfo } from "./components/BoardSquare"

/**
 * C: Caramel
 * P: Paper cube
 * j: Jelly cube
 * x: Empty spot
 */
export type SquareType = "c" | "p" | "j" | "x"

type PetBoardRecommendation = Named & {
  description: Translatable
  candies: CandyPlacement[]
}

export type PetDefinition = Named & {
  /**
   * The 8x8 board
   * newline delineated, and then with the appropate keys for
   * caramels, paper cubes, empty spots, and jelly cubes
   */
  board: string

  /**
   *
   */
  recommendations?: PetBoardRecommendation[]
}

export type PetDictionary = Record<string, PetDefinition>

export const petDefinitions = yaml<PetDefinition[]>(
  "./data/_boards.yaml",
).reduce<PetDictionary>((memory, pet) => {
  memory[pet.name.na] = pet
  return memory
}, {})

export const decodeBoard = (pet: PetDefinition): BoardSquareInfo[] => {
  const allRows = pet.board.split("\n")
  // Board starts at 1 so it plays nice with grid
  let row = 1
  let column = 1
  const container: BoardSquareInfo[] = []
  for (const letterString of allRows) {
    for (const type of letterString) {
      switch (type as SquareType) {
        case "c":
        case "j":
        case "p":
        case "x":
          container.push({
            row,
            column,
            type: type as SquareType,
          })
          break
        default:
          throw new Error(
            `Bad SquareType "${type}" for ${pet.name.na} x:${column} y:${row}`,
          )
      }
      column += 1
      // if we're at 8 and went over to 9
      // Start at 1 again
      if (column % 9 === 0) {
        column = 1
      }
    }
    row += 1
  }

  return container
}
