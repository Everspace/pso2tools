import styled from "@emotion/styled"

const Layout = styled.div({
  display: "grid",
  gridTemplateRows: "3em 1fr",
  gridTemplateColumns: "2fr 3em 1fr",
  gridTemplateAreas: `
    "boardTools boardTools widgetSelect"
    "board candyTools widget"
  `,
  overflow: "hidden",
  maxHeight: "100%",
})

export default Layout
