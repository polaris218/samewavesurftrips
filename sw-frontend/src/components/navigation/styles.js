import styled from 'styled-components'
import { Spacings, Colors } from 'config'

export const Navigation = styled.ul`
  width: 100%;
  height: 55px;
  bottom: 0px;
  left: 0px;
  padding: 0px;
  margin: 0;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0 -2px 5px -2px #33333322;
  transform: translateY(0px);
  transition: transform .5s ease;
  z-index: 20;
  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    transform: translateY(160px);
  }
`

export const Tabs = styled.ul`
  width: 100%;
  height: 100%;
  max-width: 800px;
  padding: 0px;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  list-style: none;
  /* cursor: pointer; */
  li {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: none;
    transition: background-color .55s ease;
    :hover,
    :focus {
      background: ${Colors.WHITE};
      p {
        color: ${Colors.GREY_BASE};
      }
    }
  }
`
