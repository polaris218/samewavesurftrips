import styled from 'styled-components'
import { Colors } from 'config'

export const ScrollContainer = styled.div`
  width: 100%;
  height: calc(100% - ${props => (props.navbar ? 55 : 0)}px);
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${Colors.GREY_MID};
  background: ${props =>
    props.color === 'blue'
      ? `linear-gradient(to top, ${Colors.GREY_XLIGHT} 0%, #ededed 40%, #f4fafc 100%)`
      : props.color === 'orange'
        ? `linear-gradient(to top, ${Colors.GREY_XLIGHT} 0%, #c3c3c3 40%, #f4fafc 100%)`
        : 'transparent'};
  overflow: hidden;
`
