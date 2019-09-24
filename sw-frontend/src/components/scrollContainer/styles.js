import styled from 'styled-components'
import { Spacings, Colors } from 'config'

export const ScrollContainer = styled.div`
  width: 100%;
  height: calc(100% - ${props => (props.navbar ? 35 : 0)}px);
  display: flex;
  flex-direction: row;
  flex-direction: column;
  justify-content: ${'flex-start'};
  align-items: ${({ align }) => align};
  background-color: ${Colors.WHITE};
  /* background: ${props =>
    props.color === 'blue'
      ? `linear-gradient(to top, ${Colors.GREY_XLIGHT} 0%, #e3e3e3 40%, #ffffff 100%)`
      : props.color === 'orange'
        ? `linear-gradient(to right, #e3e3e3, #ffffff)`
        : 'transparent'}; */

  /* overflow: hidden; */
  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    margin-top: ${({ padTop }) => padTop && `55px`};
    height: calc(
      100% -
        ${props => (props.navbar ? (props.height ? props.height : 105) : 0)}px
    );
  }
`
