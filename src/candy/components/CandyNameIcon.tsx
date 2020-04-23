/** @jsx jsx */
import { jsx } from "@emotion/core"
import { CandyDefinition } from "../Candy"
import CandyIcon from "./CandyIcon"

type CandyNameIconProps = {
  candy: CandyDefinition
}

const CandyNameIcon = ({ candy: { type, name } }: CandyNameIconProps) => {
  return (
    <span css={{ display: "inline-block" }}>
      <CandyIcon type={type} /> {name.na}
    </span>
  )
}

export default CandyNameIcon
