import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const MastHead = styled.div`
  width: 100%;
  height: 300px;
  background-color: ${Colors.BLUE_MID};
  position: relative;
  overflow: hidden;

  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    height: 400px;
  }
`

export const CoverImg = styled.div`
  width: 100%;
  height: 100%;
  background: url(${props => props.image}) no-repeat center center;
  background-size: cover;
`
