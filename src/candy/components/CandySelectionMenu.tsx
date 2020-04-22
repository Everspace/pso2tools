/** @jsx jsx */
import { jsx } from "@emotion/core"
import React from "react"
import { candyTypeData, candyDefinitions } from "../Candy"
import CandySelectionMenuItem from "./CandySelectionMenuItem"
import styled from "@emotion/styled"

type CandySelectionMenuProps = {}

const CandySelectionMenu = ({}: CandySelectionMenuProps) => {
  return (
    <div
      css={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        gridTemplateColumns: "auto",
        height: "100%",
        overflowY: "hidden",
        gridTemplateAreas: `
          "controls"
          "candyList"
        `,
      }}
    >
      <div css={{ gridArea: "controls", padding: "0.5em" }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <select onChange={(e) => console.log(e.target.value)}>
            <option key={0}>Select a Type</option>
            {Object.entries(candyTypeData).map(([candyType, data]) => (
              <option key={candyType} value={candyType}>
                {data.name.na}
              </option>
            ))}
          </select>
          <label htmlFor="candySearch">Search:</label>
          <input id="candySearch" type="text" />
        </form>
      </div>
      <ul
        css={{
          gridArea: "candyList",
          display: "flex",
          padding: "0.5em",
          listStyle: "none",
          overflowY: "scroll",
          maxHeight: "100%",
          flexFlow: "column nowrap",
          flexGrow: 1,
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
              <CandySelectionMenuItem candy={candy} />
            </li>
          ))}
      </ul>
    </div>
  )
}

// export default styled.div({ backgroundColor: "blue" })
export default CandySelectionMenu
