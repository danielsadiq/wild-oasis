import styled, { css } from "styled-components";

// const test = "text-align: center";
// const test = css`
//   text-align: center;
//   ${10>5 && "background-color: yellow"};
// `

interface HeadingProps {
  as?: string;
}

const Heading = styled.h1<HeadingProps>`
  ${props => props.as === "h1" && css`
    font-size: 3.5rem;
    font-weight: 600;
  `}
  
  ${props => props.as === "h2" && css`
    font-size: 2.5rem;
    font-weight: 600;
  `}

  ${props => props.as === "h3" && css`
    font-size: 2rem;
    font-weight: 500;
  `}
  margin-top: 1rem;
`;

export default Heading;