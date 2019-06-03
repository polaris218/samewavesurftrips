import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const ListItem = styled.div`
  position: relative;
  padding: ${Spacings.MEDIUM}px;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid ${Colors.GREY_LIGHT};
  background: rgba(0, 0, 0, 0.05);
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.035);
    border-bottom: 1px solid ${Colors.GREY_LIGHT};
  }
`
export const Title = styled.p`
  padding: 0;
  margin: 0 0;
  color: ${Colors.GREY_BASE};
`
export const New = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: ${Spacings.FONT.SMALL};
  font-weight: 600;
  background: ${Colors.BLUE_BASE};
  padding: 4px ${Spacings.SMALL}px;
`
export const From = styled.div`
  color: black;
  font-size: ${Spacings.FONT.SMALL};
  /* font-weight: 600; */
  padding: 0px;
  margin: -6px 0 12px;
`
