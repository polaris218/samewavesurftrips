import styled from 'styled-components'
import { Spacings, Colors } from 'config'

export const ScrollContainer = styled.div`
  width: 100%;
  height: calc(100% - ${props => (props.navbar ? 55 : 0)}px);
  display: flex;
  flex-direction: row;
  flex-direction: column;
  justify-content: ${'flex-start'};
  align-items: ${({ align }) => align};
  background-color: ${Colors.GREY_MID};
  background: ${props =>
    props.color === 'blue'
      ? `linear-gradient(to top, ${Colors.GREY_XLIGHT} 0%, #ededed 40%, #f4fafc 100%)`
      : props.color === 'orange'
        ? `linear-gradient(to top, ${Colors.GREY_XLIGHT} 0%, #c3c3c3 40%, #f4fafc 100%)`
        : 'transparent'};
  overflow: hidden;
  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    margin-top: ${({ padTop }) => padTop && `55px`};
    height: calc(
      100% -
        ${props => (props.navbar ? (props.height ? props.height : 105) : 0)}px
    );
  }
`
