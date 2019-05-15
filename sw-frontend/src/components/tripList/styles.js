import styled from 'styled-components';
import { Colors, Spacings } from 'config';

export const TripList = styled.div`
    padding: ${(props) => props.paddingTop}px ${Spacings.MEDIUM}px 60px;
    margin: 0px;
    width: 100%;
    overflow: scroll;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;

    .triplist__preloader {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: ${Spacings.LARGE}px 0;
    }
    .triplist__fetch {
        margin: ${Spacings.LARGE}px 0;
    }
    .triplist__icon {
        display: flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
        min-height: 300px;
        width: 100%;
        svg {
            fill: ${Colors.ORANGE_BASE};
            width: 100px;
            transform: rotate(180deg);
            margin-bottom: ${Spacings.LARGE};
        }
    }
`;

export const PreloadContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 100px);
    width: 100%;
    min-height: 400px;
`

export const ListContainer = styled.div`
    width: 100%;
    max-width: 700px;
`