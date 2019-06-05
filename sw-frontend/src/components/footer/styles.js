import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const Footer = styled.footer`
  /* position: absolute; */
  bottom: 0px;
  left: 0px;
  padding: ${Spacings.SMALL}px 20px;
  width: calc(100% - 40px);
  height: 50px;
  display: none;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${Colors.GREY_LIGHT};
  p {
    font-size: ${Spacings.FONT.SMALL};
    line-height: 20px;
    color: ${Colors.GREY_BASE};
    padding: 0;
    margin: 0;
  }
  .footer__legal {
    font-size: ${Spacings.FONT.SMALL};
    color: "grey";
  }

  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    display: flex;
  }
`
