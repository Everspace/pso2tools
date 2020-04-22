/** @jsx jsx */
import { jsx } from "@emotion/core"
import Styled from "@emotion/styled"
import { SquareType } from "./Square"
import { useState, useMemo, useReducer, useCallback } from "react"
import BoardSquare, { BoardSquareInfo } from "./BoardSquare"
import { debounce } from "lodash"
import { BoardDefinition } from "../CandyBoxContext"
import styled from "@emotion/styled"
import {
  CandyType,
  getCandyDimensions,
  candyDefinitions,
  candyTypeData,
} from "../Candy"
import CandyIcon from "./CandyIcon"

const decodeBoard = (boardData: BoardDefinition): BoardSquareInfo[] => {
  const allRows = boardData.board.split("\n")
  // Board starts at 1 so it plays nice with grid
  let row = 1
  let column = 1
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
            `Bad SquareType "${type}" in ${boardData.petID} x:${column} y:${row}`,
          )
      }
      column += 1
      // if we're at 8 and went over to 9
      // Start at 1 again
      if (column % 9 === 0) {
        column = 1
      }
    }
    row += 1
  }

  return container
}

type BoardProps = {
  boardDefinition: BoardDefinition
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

const CandyOverlay = ({ row, column, id }: Coordinate & { id: string }) => {
  const candy = candyDefinitions[id]
  const css = candyTypeData[candy.type].css
  const { width, height } = getCandyDimensions(candy)

  let backgroundColor = "white"
  let color = "inherit"

  //[row, column, row + width, column + height]
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
      <span css={{ display: "inline-block" }}>
        <CandyIcon type={candy.type} /> {candy.name.na}
      </span>
    </div>
  )
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

  // Sorting by row then column will be fine for serialization
  const candies = [
    { row: 1, column: 2, id: "Satisfying Parfait" },
    { row: 1, column: 5, id: "Vinculum Spirit Cane" },
    { row: 2, column: 1, id: "Sovereign Cane" },
    { row: 2, column: 1, id: "Sovereign Cane" },
    { row: 2, column: 5, id: "Double Stack Pancakes" },
    { row: 2, column: 7, id: "Triple Stack Pancakes" },
    { row: 3, column: 2, id: "Stamina Gummy" },
    { row: 3, column: 4, id: "Stamina Gummy" },
    // { row: 4, column: 3, id: "some Roll" },
    { row: 4, column: 5, id: "Stamina Gummy" },
    { row: 4, column: 7, id: "Stamina Gummy" },
    { row: 4, column: 8, id: "Stamina Spirit Cookie" },
    // { row: 6, column: 1, id: "some Roll" },
    { row: 6, column: 4, id: "Toughness Sandwich" },
    { row: 6, column: 7, id: "Satisfying Parfait" },

    { row: 7, column: 3, id: "Stamina Spirit Cookie" },
    { row: 7, column: 6, id: "Stamina Spirit Cookie" },

    { row: 8, column: 1, id: "Toughness Sandwich" },
    { row: 8, column: 5, id: "Stamina Gummy" },
    { row: 8, column: 7, id: "Stamina Gummy" },
  ]

  // Be careful of adding divs above or below the grid due to funk
  // with the drag and drop

  return (
    <GridContainer>
      <Grid css={{ gridArea: "board" }}>
        {candies.map((props, index) => (
          <CandyOverlay key={index} {...props} />
        ))}
        {decodeBoard(boardDefinition).map((info) => (
          <BoardSquare
            key={`x${info.column} y${info.row}`}
            column={info.column}
            row={info.row}
            type={info.type}
            onHover={onHover}
          />
        ))}
      </Grid>
    </GridContainer>
  )
}

export default Board
