import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const Footer = styled.footer`
  position: absolute;
  bottom: 0px;
  left: 0px;
  padding: 0px 20px;
  width: calc(100% - 40px);
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${Colors.GREY_LIGHT};
  p {
    font-size: ${Spacings.FONT.SMALL};
    color: ${Colors.GREY_BASE};
    padding: 0;
    margin: 0;
  }
  .footer__legal {
    font-size: ${Spacings.FONT.SMALL};
    color: "grey";
  }
`
