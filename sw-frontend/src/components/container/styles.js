import styled from 'styled-components'
import { Spacings } from 'config'

export const Container = styled.div`
  /* min-height: calc(100vh - 100px); */
  padding: 0 ${Spacings.MEDIUM}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: ${Spacings.FONT.BODY};
  color: white;
  width: calc(100% - (${Spacings.MEDIUM}*2px));
  max-width: ${Spacings.MAX_WIDTH}px;
  justify-self: center;
  position: relative;

  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    padding: 0 5%;
    /* padding-bottom: 100px; */
    width: ${({ height }) => (height ? height : `calc(100% - 10%)`)};
  }
`
