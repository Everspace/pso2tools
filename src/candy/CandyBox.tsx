/** @jsx jsx */
import { jsx } from "@emotion/core"
import Board from "./components/Board"
import yaml from "yaml.macro"
import JellyBean from "./components/JellyBean"

type BoardDefinition = {
  /**
   * Pet's name
   */
  name: string
  /**
   * The 8x8 board
   * newline delineated, and then with the appropate keys for
   * caramels, paper cubes, empty spots, and jelly cubes
   */
  board: string
}

const [Synchro] = yaml<BoardDefinition[]>("./Boards.yaml")

type CandyBoxProps = {}

const CandyBox = () => {
  return (
    <div
      css={{
        display: "flex",
        "& > *": {
          display: "flex",
        },
      }}
    >
      <Board boardDefinition={Synchro} />
      <div>
        <ul>
          <li>
            <JellyBean />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CandyBox
