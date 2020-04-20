/** @jsx jsx */
import { jsx } from "@emotion/core"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import CandyBox from "./candy/CandyBox"

function App() {
  return (
    <DndProvider backend={Backend}>
      <CandyBox />
    </DndProvider>
  )
}

export default App
