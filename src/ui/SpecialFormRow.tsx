import { StyledFormRow } from "./FormRow"

function SpecialFormRow({children}: {children: React.ReactNode}) {
  return (
    <StyledFormRow>
      {children}
    </StyledFormRow>
  )
}

export default SpecialFormRow
