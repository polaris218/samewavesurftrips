import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const Header = styled.header`
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: white;
  border-bottom: 1px solid ${Colors.GREY_LIGHT};
  background-color: ${Colors.WHITE};
  box-shadow: 0 2px 2px 0px #33333312;
  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    height: 100px;
  }

  .header__title {
    color: ${Colors.BLACK};
    letter-spacing: 1px;
    font-size: ${Spacings.FONT.TITLE};
    font-weight: 600;
  }
  .header__righticon {
    width: 25px;
    height: 25px;
    position: absolute;
    right: ${Spacings.MEDIUM}px;
    cursor: pointer;
    /* top: 0px; */
    svg path {
      fill: ${Colors.BLUE_BASE};
    }
  }
  .header__logo {
    width: 50px;
    height: 50px;
  }
  .header__menu-item {
    font-size: ${Spacings.FONT.LABEL} !important;
    padding: 5px !important;
  }
`

export const NavFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-bottom: 26px;
`

export const NavLogo = styled.div`
  width: 150px;
  outline: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: ${Spacings.MEDIUM}px;
  div {
    width: 85px;
    margin: ${Spacings.MEDIUM}px 36px ${Spacings.SMALL * 2}px;
  }
  svg path {
    fill: ${Colors.WHITE};
    stroke: ${Colors.WHITE};
  }
`

export const NavMenuItem = styled.li`
  width: 100%;
  height: 40px;
  /* background-color: red; */
`

export const HomeButton = styled.div`
  width: 25px;
  height: 25px;
  position: absolute;
  cursor: pointer;
  left: ${Spacings.MEDIUM}px;
  svg path {
    fill: ${Colors.BLUE_BASE};
  }
`
