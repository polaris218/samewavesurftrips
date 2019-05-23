import styled from 'styled-components';
import { Colors, Spacings } from 'config';

export const SearchContainer = styled.div`
    padding: 50px 0;
    margin: 0px;
    width: calc(100% - ${Spacings.LARGE}px);
    height: calc(100% - 130px);
    top: 0;
    left: 0;
    position: absolute;
    z-index: 99;
    pointer-events: ${(props) => !props.interactive ? 'auto' : 'none'};
    .search__slider {
        height: calc(100% + 50px);
    }
`;

export const SearchContent = styled.div`
    padding: ${Spacings.MEDIUM}px;
    width: 100%;
    height: 100%;
    color: ${props => props.color};
    font-size: ${props => props.fontSize};
    background-color: ${Colors.WHITE};
    .inner__content {
        width: 100%;
        max-width: 400px;
        padding: ${Spacings.MEDIUM}px 0;
    }
`;

export const Label = styled.div`
    color: ${ Colors.BLUE_BASE };
    font-size: ${ Spacings.FONT.BODY };
`;

export const FilterButton = styled.div`
    margin: ${Spacings.MEDIUM}px 0;
    display: flex;
    flex-direction: row;
    button {
        margin: 0 4px;
    }
`;

export const DateInput = styled.div`
    width: 100%;
    margin: ${Spacings.MEDIUM}px 0;

    .react-datepicker-wrapper{
        width: 100%;
    }
    .react-datepicker__input-container {
        width: 100%;
        outline: none;
    }
    input {
        width: calc(100% - ${Spacings.LARGE}px);
        height: 40px;
        margin-top: ${- Spacings.LARGE}px;
        padding: ${Spacings.SMALL}px ${Spacings.MEDIUM}px;
        font-size: ${Spacings.FONT.BODY};
        color: ${Colors.GREY_BASE};
        outline: none;
        border: 0;
        border-bottom: 1px solid ${Colors.GREY_BASE};
        background: transparent;
    }
`

export const ContentContainer = styled.div`
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
`