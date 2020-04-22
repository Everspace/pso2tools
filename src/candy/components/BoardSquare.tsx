/** @jsx jsx */
import { jsx } from "@emotion/core"
import React from "react"
import Square, { SquareType } from "./Square"
import { useDrop } from "react-dnd"
import ItemTypes from "./ItemTypes"

export type BoardSquareInfo = {
  column: number
  row: number
  type: SquareType
}

type BoardSquareProps = {
  onHover?: (data: BoardSquareInfo) => void
} & BoardSquareInfo

const validSpaces: SquareType[] = ["c", "j", "x"]

const BoardSquare = ({ column, row, type, onHover }: BoardSquareProps) => {
  const [{ isDragging, isOver, isValid }, drop] = useDrop({
    accept: Object.values(ItemTypes),
    canDrop: (props, monitor) => {
      const thing = monitor.getItem()
      if (validSpaces.indexOf(type) === -1) {
        return false
      }
      return true
    },
    hover: (props, monitor) => {
      onHover && onHover({ column, row, type })
    },
    drop: (props, montior) => {
      const data = { item: props, position: { column, row } }
      console.log("dropped", data)
      return data
    },
    collect: (monitor) => ({
      isDragging: monitor.getItem(),
      isOver: monitor.isOver(),
      isValid: monitor.canDrop(),
    }),
  })

  return (
    <Square
      handler={drop}
      css={[
        isDragging && isOver
          ? isValid
            ? { backgroundColor: "green" }
            : { backgroundColor: "red" }
          : null,
      ]}
      type={type}
      row={row}
      column={column}
    />
  )
}

export default BoardSquare
