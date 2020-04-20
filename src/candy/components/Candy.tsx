import yaml from "yaml.macro"

type Dimensions = {
  width: number
  height: number
}

type CandyItem = {
  name: {
    na: string
    jp?: string
    jpna?: string
  }
  size: Dimensions
  image: string
  color: "red" | "blue" | "green" | "orange" | "pink" | "yellow"
  stats: {
    hp?: number
    pp?: number
    crit?: number
    resist?: {
      mel?: number
      rng?: number
      tec?: number
    }
    effect?: string
  }
}

type CandyDefinition = {
  defaultSize: Dimensions
  types: CandyItem[]
}

type CandyYaml = {
  gummy: CandyDefinition
}

export const data = yaml<CandyYaml>("./Candy.yaml")
