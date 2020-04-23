declare module "yaml.macro" {
  function yaml<T = any>(filepath: string): T
  export default yaml
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
