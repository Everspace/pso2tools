/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useDrag } from "react-dnd"
import ItemTypes from "./ItemTypes"
import { Coordinate } from "./Board"
import { CandyDefinition, getCandyDimensions, candyTypeData } from "../Candy"
import { useMemo } from "react"
import CandyNameIcon from "./CandyNameIcon"

type CandyBoxSelectionMenuItemProps = {
  position?: Coordinate
  candy: CandyDefinition
}

const CandyBoxSelectionMenuItem = ({
  candy,
}: CandyBoxSelectionMenuItemProps) => {
  const [info, drag] = useDrag({
    item: {
      type: ItemTypes.CANDY,
      candyID: candy.name.na,
      size: getCandyDimensions(candy),
      from: "menu",
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const css = candyTypeData[candy.type].css
  const { height, width } = useMemo(() => getCandyDimensions(candy), [candy])

  return (
    <div
      css={{
        opacity: info.isDragging ? 0.5 : 1,
        padding: "0.5em",
      }}
    >
      <div
        ref={drag}
        css={{
          ...css,
          display: "inline-block",
          border: "1px solid black",
          borderRadius: "0.5em",
          padding: "0.5em",
          fontsize: 25,
          fontWeight: "bold",
          cursor: "move",
        }}
      >
        <CandyNameIcon candy={candy} />
      </div>
      <div>Size: {`${width}x${height}`}</div>
      <div>Stats: {JSON.stringify(candy.stats, null, 1)}</div>
      <div>
        Sources:
        <ul>
          {candy.sources.map((source, index) => (
            <li key={index}>{source}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default CandyBoxSelectionMenuItem
