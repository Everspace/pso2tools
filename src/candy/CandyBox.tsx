/** @jsx jsx */
import { jsx } from "@emotion/core"
import Board from "./components/Board"
import yaml from "yaml.macro"
import { BoardDefinition } from "./CandyBoxContext"
import Layout from "./components/Layout"
import CandySelectionMenu from "./components/CandySelectionMenu"

const [Synchro] = yaml<BoardDefinition[]>("./Boards.yaml")

// type CandyBoxProps = {}

const CandyBox = () => {
  return (
    <Layout>
      <Board boardDefinition={Synchro} />
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
