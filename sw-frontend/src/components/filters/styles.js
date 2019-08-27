import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const Filters = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  position: fixed;
  z-index: 999;
`
export const Content = styled.div`
  padding: ${Spacings.LARGE * 2}px ${Spacings.MEDIUM}px ${Spacings.LARGE}px;
`
export const ButtonFooter = styled.div`
  position: fixed;
  z-index: 99;
  bottom: 0;
  width: calc(100% - ${Spacings.MEDIUM}px);
  display: flex;
  flex-direction: row;
  padding: ${Spacings.SMALL}px;
  background: ${Colors.WHITE};

  @media (max-width: ${Spacings.SCREEN.TABLET}px) {
    div {
      padding: ${Spacings.SMALL}px;
      width: calc(100% - ${Spacings.MEDIUM}px);
    }
    button {
      width: 100%;
      max-width: 100%;
    }
  }
`

export const Label = styled.div`
  text-transform: uppercase;
  color: ${Colors.GREY_BASE};
  font-weight: bold;
`

export const ButtonGroupRow = styled.div`
  display: block;
  width: calc(100%);
  margin: ${Spacings.MEDIUM}px 0 ${Spacings.LARGE}px;
  padding: 0 0 0 ${Spacings.SMALL}px;
  div: {
    width: auto;
  }
  button {
    width: auto;
    min-width: 100px;
    margin: 0 ${Spacings.SMALL}px;
    p {
      font-size: ${Spacings.FONT.TINY};
    }
  }

  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    /* width: calc(100% - 64px); */
  }
`
export const ScrollView = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  height: calc(100% - 70px);
`
