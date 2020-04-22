import styled from "@emotion/styled"

const Layout = styled.div({
  display: "grid",
  gridTemplateRows: "auto 1fr",
  gridTemplateColumns: "1fr",
  gridTemplateAreas: `
    "nav"
    "app"
  `,
  height: "100vh",
  width: "100vw",
  maxHeight: "100vh",
  overflow: "hidden",
})

export default Layout
