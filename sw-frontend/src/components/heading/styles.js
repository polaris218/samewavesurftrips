import styled from 'styled-components';
import { Colors, Spacings } from 'config';

export const Heading = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: ${Spacings.FONT.HEADER};
    font-weight: 800;
    color: ${Colors.GREY_BASE};
    margin: ${Spacings.MEDIUM}px 0;
`;