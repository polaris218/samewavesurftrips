import styled from 'styled-components'
import { Spacings } from 'config'

export const Card = styled.div`
    padding: ${({ slim }) =>
      slim
        ? `${Spacings.MEDIUM}px ${Spacings.SMALL}px`
        : `${Spacings.MEDIUM}px`};
    width: ${({ slim }) =>
      slim
        ? `calc(100% - (${Spacings.MEDIUM}px))`
        : `calc(100% - (${Spacings.LARGE}px))`};
    border-radius: 5px;
    margin-bottom: ${props => props.marginBottom}px;
    box-shadow: 0px 5px 5px rgba(23, 23, 77, 0.12);
    background-color: rgba(255,255,255, 1);
    overflow-x: hidden;
    /* @media (min-width: ${Spacings.SCREEN.TABLET}px) {
        padding: 0 20%;
        width: calc(100% - 40%);
    } */
    /* max-width: 1200px; */
`
