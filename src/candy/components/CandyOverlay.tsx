/** @jsx jsx */
import { jsx } from "@emotion/core"
import { Coordinate } from "./Board"
import { candyTypeData, candyDefinitions, getCandyDimensions } from "../Candy"
import CandyNameIcon from "./CandyNameIcon"

type CandyOverlayProps = Coordinate & { id: string }

const CandyOverlay = ({ row, column, id }: CandyOverlayProps) => {
  const candy = candyDefinitions[id]
  const css = candyTypeData[candy.type].css
  const { width, height } = getCandyDimensions(candy)

  return (
    <div
      draggable={false}
      css={{
        ...css,
        zIndex: 1, // drawing over squares
        borderRadius: "1.5em",
        border: "1px solid black",
        padding: "0.25em",
        gridColumn: `${column} / ${column + width}`,
        gridRow: `${row} /${row + height}`,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <CandyNameIcon candy={candy} />
    </div>
  )
}

export default CandyOverlay
