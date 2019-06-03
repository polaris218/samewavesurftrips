import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const Mail = styled.div`
  width: 100%;
  height: calc(100% - 70px);
  color: ${Colors.GREY_BASE};
  background-color: ${Colors.GREY_MID};
  padding-top: 50px;
`
export const HeadTitle = styled.div`
  position: fixed;
  background: white;
  border-bottom: 1px solid ${Colors.GREY_LIGHT};
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    margin-top: 50px;
  }
`
export const FootContainer = styled.div`
  margin-top: -26px;
  width: 100%;
`
export const MessageView = styled.div`
  width: calc(100% - ${Spacings.MEDIUM}px);
  height: calc(100% - 100px);
  padding: 60px ${Spacings.SMALL}px ${Spacings.LARGE}px;
  overflow-y: scroll;
  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    width: calc(100% - ${Spacings.LARGE}px);
    padding: 120px ${Spacings.MEDIUM}px ${Spacings.LARGE}px;
  }
`
export const Message = styled.div`
  background: ${Colors.GREY_LIGHT};
  border-radius: ${Spacings.SMALL}px;
  padding: ${Spacings.SMALL}px;
  display: table;
  margin: ${Spacings.SMALL}px;
`
export const UserName = styled.div`
  font-size: ${Spacings.FONT.SMALL};
  padding: 0 0 ${Spacings.SMALL}px 0;
  color: black;
`
export const MessageInput = styled.div`
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 55px;
  background: ${Colors.GREY_LIGHT};
  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    bottom: 0px;
    height: 100px;
  }
`
