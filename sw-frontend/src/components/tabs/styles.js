import styled from 'styled-components'
import { Spacings, Colors } from 'config'

export const TabsContainer = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  justify-content: ${props =>
    props.align === 'center' ? 'center' : 'flex-start'};
  padding-left: ${props => (props.align === 'center' ? 0 : '10%')};
  background-color: ${props => props.backgroundColor};
  border-bottom: 1px solid ${Colors.GREY_MID};
  position: relative;
  .MuiPrivateTabIndicator-root-35 {
    background-color: ${Colors.WHITE};
  }

  span {
    color: ${Colors.BLUE_BASE};
    font-weight: 800;
  }
  && {
    color: ${Colors.GREEN_BASE};
  }
  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    margin-top: 50px;
  }
`
