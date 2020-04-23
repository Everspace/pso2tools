/** @jsx jsx */
import { jsx } from "@emotion/core"
import { Coordinate } from "./Board"
import { SquareType } from "../Pet"

type SquareProps = {
  type: SquareType
  children?: React.ReactChild
  /**
   * Used to pass Ref to div
   */
  handler?: any
}

const Square = ({
  type = "x",
  row,
  column,
  handler,
  ...props
}: SquareProps & Coordinate) => {
  return (
    <div
      ref={handler}
      {...props}
      css={[
        type === "c" ? { backgroundColor: "orange" } : null,
        type === "p" ? { backgroundColor: "#333" } : null,
        type === "j" ? { backgroundColor: "#71a8d9" } : null,
        type === "x" ? { backgroundColor: "#EEE" } : null,
        {
          zIndex: 0,
          gridRow: `${row} / ${row + 1}`,
          gridColumn: `${column} / ${column + 1}`,
        },
      ]}
    />
  )
}

export default Square
