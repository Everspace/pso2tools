import yaml from "yaml.macro"
import { Dimensions } from "./types"
import { concat } from "lodash"

export type ConfectionType =
  | "cane"
  | "cookie"
  | "crepe"
  | "gummy"
  | "pancake"
  | "parfait"
  | "roll"
  | "sandwich"
  | "star"

export interface ConfectionDefaultData {
  defaultSize: Dimensions
  icon: string
}

export type ConfectionTypeData = Record<ConfectionType, ConfectionDefaultData>

export type StatisticType = keyof ConfectionStatistics
export type ConfectionStatistics = Partial<{
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

export interface ConfectionDefinition {
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
  rarity: number
  type: ConfectionType
  image: string | null
  sources: string[]
  stats: ConfectionStatistics
}

export const confectionData = yaml("./CandyData.yaml") as {
  types: ConfectionTypeData
}

const cane: ConfectionDefinition[] = yaml("./data/cane.yaml")
const cookie: ConfectionDefinition[] = yaml("./data/cookie.yaml")
const pancake: ConfectionDefinition[] = yaml("./data/pancake.yaml")
const parfait: ConfectionDefinition[] = yaml("./data/parfait.yaml")
const sandwich: ConfectionDefinition[] = yaml("./data/sandwich.yaml")
const star: ConfectionDefinition[] = yaml("./data/star.yaml")

type ConfictionDictionary = Record<string, ConfectionDefinition>

export const confectionDefinitions = concat(
  cane,
  cookie,
  pancake,
  parfait,
  sandwich,
  star,
).reduce<ConfictionDictionary>((memory, confection) => {
  memory[confection.name.na] = confection
  return memory
}, {})
