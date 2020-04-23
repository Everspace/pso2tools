/** @jsx jsx */
import { jsx } from "@emotion/core"
import Board from "./components/Board"
import Layout from "./components/Layout"
import CandySelectionMenu from "./components/CandySelectionMenu"
import { useMemo } from "react"
import { petDefinitions, decodeBoard } from "./Pet"

// type CandyBoxProps = {}

const CandyBox = () => {
  const selectedPet = "Synchro"
  const squares = useMemo(() => decodeBoard(petDefinitions[selectedPet]), [
    selectedPet,
  ])
  // const dispatch = useReducer()
  return (
    <Layout>
      <div
        css={{
          gridArea: "boardTools",
          backgroundColor: "gold",
        }}
      >
        Selected Pet: {selectedPet}
      </div>
      <div css={{ gridArea: "candyTools", backgroundColor: "teal" }}>
        <div>Move</div>
        <div>Copy</div>
        <div>Delete</div>
      </div>
      <Board boardSquares={squares} />
      <div
        css={{
          gridArea: "widgetSelect",
          backgroundColor: "orange",
        }}
      >
        <button>Candy</button>
        <button>Stats</button>
        <button>Options</button>
      </div>
      <CandySelectionMenu css={{ gridArea: "widget" }} />
    </Layout>
  )
}

export default CandyBox
