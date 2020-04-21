import yaml from "yaml.macro"
import { Dimensions, Named, Sized } from "./types"
import { concat } from "lodash"

export type CandyType =
  | "cane"
  | "cookie"
  | "crepe"
  | "gummy"
  | "pancake"
  | "parfait"
  | "roll"
  | "sandwich"
  | "star"

export interface CandyDefaultData extends Named {
  defaultSize: Dimensions
  icon: string
}

export type CandyTypeData = Record<CandyType, CandyDefaultData>

export type StatisticType = keyof CandyStatistics
export type CandyStatistics = Partial<{
  /**
   * Max 60 total
   */
  element: number
  hp: number
  pp: number
  dex: number
  mel: number
  melDefense: number
  /**
   * In %s (7 = 7%)
   */
  melResist: number
  rng: number
  rngDefense: number
  /**
   * In %s (7 = 7%)
   */
  rngResist: number
  tec: number
  tecDefense: number
  /**
   * In %s (7 = 7%)
   */
  tecResist: number
  /**
   * In %s (7 = 7%)
   */
  crit: number
  effects: string[]
}>

export interface CandyDefinition extends Named, Sized {
  rarity: number
  type: CandyType
  image: string | null
  sources: string[]
  stats: CandyStatistics
}

export const candyTypeData = yaml("./data/_types.yaml") as CandyTypeData

const cane: CandyDefinition[] = yaml("./data/cane.yaml")
const cookie: CandyDefinition[] = yaml("./data/cookie.yaml")
const gummy: CandyDefinition[] = yaml("./data/gummy.yaml")
const pancake: CandyDefinition[] = yaml("./data/pancake.yaml")
const parfait: CandyDefinition[] = yaml("./data/parfait.yaml")
const sandwich: CandyDefinition[] = yaml("./data/sandwich.yaml")
const star: CandyDefinition[] = yaml("./data/star.yaml")

export type CandyDictionary = Record<string, CandyDefinition>

export const candyDefinitions = concat(
  cane,
  cookie,
  gummy,
  pancake,
  parfait,
  sandwich,
  star,
).reduce<CandyDictionary>((memory, confection) => {
  memory[confection.name.na] = confection
  return memory
}, {})

export function getCandyDimensions(candy: CandyDefinition): Dimensions {
  return candy?.size ?? candyTypeData[candy.type].defaultSize
}
