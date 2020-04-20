/** @jsx jsx */
import { jsx } from "@emotion/core"

/**
 * C: Caramel
 * P: Paper cube
 * j: Jelly cube
 * x: Empty spot
 */
export type SquareType = "c" | "p" | "j" | "x"

type SquareProps = {
  type: SquareType
  children?: React.ReactChild
  /**
   * Used to pass Ref to div
   */
  handler?: any
}

const Square = ({ type = "x", handler, ...props }: SquareProps) => {
  return (
    <div
      ref={handler}
      {...props}
      css={[
        type === "c" ? { backgroundColor: "orange" } : null,
        type === "p" ? { backgroundColor: "#333" } : null,
        type === "j" ? { backgroundColor: "#71a8d9" } : null,
        type === "x" ? { backgroundColor: "#EEE" } : null,
      ]}
    />
  )
}

export default Square
