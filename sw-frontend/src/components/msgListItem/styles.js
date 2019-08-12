import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const ListItem = styled.div`
  position: relative;
  padding: ${Spacings.MEDIUM}px;
  width: 100%;
  min-height: 60px;
  border-bottom: 1px solid ${Colors.GREY_MID};
  background: ${Colors.WHITE};
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.035);
    border-bottom: 1px solid ${Colors.GREY_LIGHT};
  }
`
export const Title = styled.p`
  padding: 0 ${Spacings.LARGE + 14}px;
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
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 16px;
  padding: ${Spacings.SMALL}px;
  margin: -6px 0 12px;

  div {
    width: 30px;
    height: 30px;
    margin-top: ${Spacings.SMALL}px;
    margin-right: 4px;
  }
  img {
    width: 34px;
    height: 34px;
  }
`
