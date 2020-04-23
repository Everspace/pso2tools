/** @jsx jsx */
import { jsx } from "@emotion/core"
import Styled from "@emotion/styled"
import { useState, useMemo, useCallback } from "react"
import BoardSquare, { BoardSquareInfo } from "./BoardSquare"
import { debounce } from "lodash"
import styled from "@emotion/styled"
import { SquareType } from "../Pet"

type BoardProps = {
  boardSquares: BoardSquareInfo[]
}

const gridUnit = 75 //px

const Grid = Styled.div({
  display: "grid",
  margin: "auto",
  width: gridUnit * 8,
  height: gridUnit * 8,
  gridTemplateColumns: `repeat(8, ${gridUnit}px)`,
  gridTemplateRows: `repeat(8, ${gridUnit}px)`,
})

type CandyInfo = {
  type: SquareType
  position: Coordinate
}

const GridContainer = styled.div({
  /**
   * I would preferably like to specify that in CandyBox,
   * but it only works here for reasons I don't understand.
   */
  gridArea: "board",
  display: "grid",
  alignItems: "center",
  gridTemplateAreas: `"board"`,
})

export type Coordinate = { row: number; column: number }
const Board = ({ boardSquares }: BoardProps) => {
  const getSquareAtPosition = useCallback(
    ({ row, column }: Coordinate) => boardSquares[row * column - 1],
    [boardSquares],
  )

  // const boardIn

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

  // Be careful of adding divs above or below the grid due to funk
  // with the drag and drop

  // Instead of doing the Square displaying good/bad, prehaps fiddle with
  // CustomDragLayer to draw
  // the candy to place
  // the "good/bad" squares
  // https://react-dnd.github.io/react-dnd/examples/drag-around/custom-drag-layer

  return (
    <GridContainer>
      <Grid css={{ gridArea: "board" }}>
        {/* {candies.map((props, index) => (
          <CandyOverlay key={index} {...props} />
        ))} */}
        {boardSquares.map((square) => (
          <BoardSquare
            key={`x${square.column} y${square.row}`}
            column={square.column}
            row={square.row}
            type={square.type}
            onHover={onHover}
          />
        ))}
      </Grid>
    </GridContainer>
  )
}

export default Board
