import styled from 'styled-components'
import { Spacings } from 'config'

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  width: calc(100%);
  /* background-color: rgba(255,255,255, 1); */
  div {
    width: auto;
  }
  button {
    height: 40px;
    padding: 0 ${Spacings.SMALL}px;
    width: auto;
  }
  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    button {
    }
  }
`