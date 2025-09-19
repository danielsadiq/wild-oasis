import styled from "styled-components"

const StyledSideBar = styled.aside`
  background-color: blue;
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
`
function Sidebar() {
  return (
    <StyledSideBar>
      Sidebar
    </StyledSideBar>
  )
}

export default Sidebar
