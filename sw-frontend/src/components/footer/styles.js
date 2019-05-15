import styled from 'styled-components';
import { Colors, Spacings } from 'config';

export const Footer = styled.footer`
    position: fixed;
    bottom: 0px;
    left: 0px;
    padding: 0px 20px;
    width: calc(100% - 40px);
    text-align: center;
    background: ${Colors.GREY_LIGHT};
    p {
        font-size: ${Spacings.FONT.SMALL};
        color: ${Colors.GREY_BASE};
    }
    .footer__legal {
        font-size: ${Spacings.FONT.SMALL};
        color: "grey";
    }
`;