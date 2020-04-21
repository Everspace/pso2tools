/** @jsx jsx */
import { jsx } from "@emotion/core"
import Board from "./components/Board"
import yaml from "yaml.macro"
import { candyDefinitions } from "./Candy"
import CandyBoxMenuItem from "./components/CandyBoxMenuItem"
import { BoardDefinition } from "./CandyBoxContext"

const [Synchro] = yaml<BoardDefinition[]>("./Boards.yaml")

type CandyBoxProps = {}

const CandyBox = () => {
  return (
    <div
      css={{
        display: "grid",
        gridTemplateRows: "1fr",
        gridTemplateColumns: "2fr 1fr",
        gridTemplateAreas: `"board list"`,
        maxHeight: "100%",
      }}
    >
      <Board css={{ gridArea: "board" }} boardDefinition={Synchro} />
      <ul
        css={{
          gridArea: "list",
          overflowY: "auto",
          height: "100%",
          maxHeight: "100%",
        }}
      >
        {Object.values(candyDefinitions)
          .sort((candyA, candyB) => {
            if (candyA.type === candyB.type) {
              return candyA.name.na.localeCompare(candyB.name.na)
            }
            return candyA.type.localeCompare(candyB.type)
          })
          .map((candy) => (
            <li key={candy.name.na}>
              <CandyBoxMenuItem candy={candy} />
            </li>
          ))}
      </ul>
    </div>
  )
}

export default CandyBox
