/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useDrag } from "react-dnd"
import ItemTypes from "./ItemTypes"
import { Coordinate } from "./Board"
import { CandyDefinition, getCandyDimensions } from "../Candy"
import CandyIcon from "./CandyIcon"

type CandyBoxMenuItemProps = {
  position?: Coordinate
  candy: CandyDefinition
}

const CandyBoxMenuItem = ({ candy }: CandyBoxMenuItemProps) => {
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
          fontsize: 25,
          fontWeight: "bold",
          cursor: "move",
        }}
      >
        <CandyIcon type={candy.type} />
        {candy.name.na}
      </div>
      <div>Stats: {JSON.stringify(candy.stats)}</div>
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
export default CandyBoxMenuItem
