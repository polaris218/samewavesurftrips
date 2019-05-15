import styled from 'styled-components';
import { Colors, Spacings } from 'config';

export const Mail = styled.div`
    width: 100%;
    height: calc(100% - 70px);
    color: ${Colors.GREY_BASE};
    background-color: ${Colors.GREY_MID};
    padding-top: 50px;
    @media (min-width: ${Spacings.SCREEN.TABLET}px) {

    }
`;
