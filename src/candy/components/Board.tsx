/** @jsx jsx */
import { jsx } from "@emotion/core"
import Styled from "@emotion/styled"
import Square, { SquareType } from "./Square"
import ItemTypes from "./ItemTypes"
import { useDrop, useDrag } from "react-dnd"
import { useState, useMemo, useReducer, useCallback } from "react"
import BoardSquare, { BoardSquareInfo } from "./BoardSquare"
import { debounce } from "lodash"
import { BoardDefinition } from "../CandyBoxContext"

const decodeBoard = (boardData: BoardData): BoardSquareInfo[] => {
  const allRows = boardData.board.split("\n")
  let row = 0
  let column = 0
  const container: BoardSquareInfo[] = []
  for (const letterString of allRows) {
    for (const type of letterString) {
      switch (type as SquareType) {
        case "c":
        case "j":
        case "p":
        case "x":
          container.push({
            row,
            column,
            type: type as SquareType,
          })
          break
        default:
          throw new Error(
            `Bad SquareType "${type}" in ${boardData.name} x:${column + 1} y:${
              row + 1
            }`,
          )
      }
      column += 1
      column = column % 8
    }
    row += 1
  }

  return container
}

type BoardProps = {
  boardDefinition: BoardDefinition
}

const Grid = Styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(8, 50px)",
  gridTemplateRows: "repeat(8, 50px)",
})

type CandyInfo = {
  type: SquareType
  position: Coordinate
}

export type Coordinate = { row: number; column: number }

const Board = ({ boardDefinition }: BoardProps) => {
  const squares = useMemo(() => decodeBoard(boardDefinition), [boardDefinition])

  const [hoverCoordinate, setHoverCoordinate] = useState<Coordinate | null>(
    null,
  )

  const onHover = useCallback(
    debounce(({ column, row }: BoardSquareInfo) => {
      setHoverCoordinate({ column, row })
    }, 100),
    [setHoverCoordinate],
  )

  // Propagate what's currently being hovered up, then deliver that to squares
  // squares can figure out if the piece at [A,B] is valid for my [X,Y]
  // given 1x4 Stick at 0,0 when xxxp or whatever.
  //
  // Should probably just context "held item" and "current coordinates"
  // instead since it would be easier
  // give ID of candy to the thing.
  //
  // for candies, need to serialize in constant manner so build A = build B if
  // all candy is in the same place
  //
  // probably do something like....
  // sorted
  //  [
  //    [ name > column > row ]
  //  ]
  //
  //  pickup from side: item = itemName, [null, null]
  //  drop onto board from side: add(item = itemName, [0, 1])
  //  pickup from board: modify({itemName, oldPosition}, {itemName, newPosition})
  //
  //  passDown also "isOccupied" or not to below stuff?
  // const [drafInfo, drag] = useDrag({
  //   begin: (monitor) => {
  //     monitor.getItem()
  //     return
  //   },
  // })

  // const [info, drop] = useDrop({
  //   accept: Object.values(ItemTypes),
  //   drop: (item, monitor) => {
  //     if (monitor.canDrop()) {
  //     }
  //   },
  //   collect: (monitor) => ({
  //     item: monitor.getItem(),
  //   }),
  // })

  return (
    <div>
      {/* <Grid onClick=passthrough>{theItems}</Grid> */}
      <Grid>
        {decodeBoard(boardDefinition).map((info) => (
          <BoardSquare
            key={`x${info.column} y${info.row}`}
            column={info.column}
            row={info.row}
            type={info.type}
            onHover={onHover}
          >
            {/* {renderPiece(info, position)} */}
          </BoardSquare>
        ))}
      </Grid>
    </div>
  )
}

export default Board
