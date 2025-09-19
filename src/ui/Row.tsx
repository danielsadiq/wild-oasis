import styled, { css } from "styled-components";
interface RowProps {
  type?: string;
}

const Row = styled.div<RowProps>`
  display:flex;
  ${({ type = 'vertical' }) => type === "horizontal" && css`
    justify-content:space-between;
    align-items:center;
  `}

  ${({ type = 'vertical' }) => type === "vertical" && css`
    flex-direction: column;
    gap:1.6rem;
  `}
`

// React allows you to set default props for a function
Row.defaultProps = {
  type: "vertical",
}

export default Row