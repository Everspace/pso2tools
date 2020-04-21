/** @jsx jsx */
import { jsx } from "@emotion/core"
import React from "react"
import { CandyType, candyTypeData } from "../Candy"

type CandyIconProps = {
  type: CandyType
}

const CandyIcon = ({ type }: CandyIconProps) => {
  return (
    <span
      css={{ display: "inline-block" }}
      role="img"
      aria-label={candyTypeData[type].name.na}
    >
      {candyTypeData[type].icon}
    </span>
  )
}

export default CandyIcon
