import styled from 'styled-components'
import { Spacings } from 'config'

export const Card = styled.div`
    padding: ${Spacings.MEDIUM}px;
    width: calc(100% - (${Spacings.MEDIUM}*2px));
    border-radius: 5px;
    margin-bottom: ${props => props.marginBottom}px;
    box-shadow: 0px 7px 16px rgba(23, 23, 77, 0.22);
    background-color: rgba(255,255,255, 1);

    /* @media (min-width: ${Spacings.SCREEN.TABLET}px) {
        padding: 0 20%;
        width: calc(100% - 40%);
    } */
    /* max-width: 1200px; */
`
