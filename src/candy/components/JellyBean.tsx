/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useDrag } from "react-dnd"
import ItemTypes from "./ItemTypes"
import { Coordinate } from "./Board"

type JellyBeanProps = {
  position?: Coordinate
}

// eslint-disable-next-line
const JellyBean = ({ position }: JellyBeanProps) => {
  const [info, drag] = useDrag({
    item: {
      type: ItemTypes.CANDY,
      size: { width: 1, height: 1 },
      from: { row: position?.row, column: position?.column },
    },
    collect: (monitor) => ({
      other: monitor.getItem(),
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <div
      ref={drag}
      css={{
        opacity: info.isDragging ? 0.5 : 1,
        fontsize: 25,
        fontWeight: "bold",
        cursor: "move",
      }}
    >
      <span css={{ display: "block" }} aria-label="Jellybean" role="img">
        🍬
      </span>
    </div>
  )
}
export default JellyBean
