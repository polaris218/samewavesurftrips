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

  input {
    &::before {
      border-bottom: 0px;
    }

    margin-top: 20px;
  }

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
  height: calc(100% - 140px);
  padding: 60px ${Spacings.SMALL}px ${Spacings.LARGE + 20}px;
  overflow-y: scroll;
  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    width: calc(100% - ${Spacings.LARGE}px);
    padding: 120px ${Spacings.MEDIUM}px ${Spacings.LARGE}px;
  }
`
export const Message = styled.div`
  background: ${({ self }) => (self ? Colors.BLUE_BASE : '#d9d9d9')};
  border-radius: ${Spacings.SMALL}px;
  margin: ${Spacings.SMALL}px;
  display: table;
  padding: ${Spacings.SMALL}px;
  color: ${({ self }) => (self ? Colors.WHITE : Colors.GREY_BASE)};
`
export const MsgAlign = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ self }) => (self ? 'flex-end' : 'flex-start')};
`
export const UserName = styled.div`
  font-size: ${Spacings.FONT.SMALL};
  padding: 0 0 ${Spacings.SMALL}px 0;
  color: black;
  display: ${({ self }) => (self ? 'none' : 'block')};
`
export const MessageInput = styled.div`
  position: fixed;
  width: 100%;
  height: 70px;
  bottom: 0px;
  background: #d9d9d9;
  div {
    width: calc(100% - 12px);
    padding: 6px;
  }

  textarea {
    padding-right: 90px;
  }
  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    textarea {
      padding-right: 100px;
    }
  }
`
export const SendMsg = styled.div`
  position: fixed;
  bottom: ${Spacings.MEDIUM}px;
  right: ${Spacings.MEDIUM}px;
  z-index: 100;

  button {
    height: 30px;
    padding: 0 ${Spacings.MEDIUM}px;
    p {
      font-size: ${Spacings.FONT.SMALL};
    }
  }

  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    top: auto;
    bottom: 20px;
    /* height: 100px; */
  }
`
