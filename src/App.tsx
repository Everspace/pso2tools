/** @jsx jsx */
import { jsx } from "@emotion/core"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import CandyBox from "./candy/CandyBox"
import Layout from "./components/Layout"

function App() {
  return (
    <DndProvider backend={Backend}>
      <Layout>
        <div css={{ gridArea: "nav", backgroundColor: "green" }}>
          <h1>Mon-Amie</h1>
        </div>
        <CandyBox />
      </Layout>
    </DndProvider>
  )
}

export default App
