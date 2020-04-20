declare module "yaml.macro" {
  const macro = <T = any>(string) => T
  export = macro
}

declare module "*.yaml"

declare module "*.png" {
  const data: string
  export default data
}

declare module "*.svg" {
  const data: string
  export default data
}
