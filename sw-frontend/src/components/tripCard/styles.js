import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const TripCard = styled.div`
    position: relative;
    padding: ${Spacings.MEDIUM}px;
    margin: 0 0 ${Spacings.MEDIUM}px;
    border-radius: 5px;
    width: calc(100% - ${Spacings.LARGE}px);
    display: flex;
    flex-direction: column;
    background-color: ${Colors.WHITE};
    /* border: 0.5px solid ${Colors.GREY_LIGHT}; */
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,.15);
    /* box-shadow: 0px 14px 32px rgba(23, 23, 77, 0.22); */
    color: ${Colors.GREY_BASE};
    cursor: pointer;
    outline: none;

    &:hover {
        background-color: ${Colors.GREY_MID};
        box-shadow: 0px 4px 12px rgba(23, 23, 77, 0.22);
    }

    .tripcard__avatar {
        width: 35px;
        height: 35px;
        img  { 
            width: 35px;
            height: 35px;
        }
    }

    .tripcard__header {
        display: flex;
        flex-direction: row;
        position: relative;
    }

    .tripcard__header-meta {
        height: 25px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left:  ${Spacings.SMALL}px;
        margin-top: ${Spacings.SMALL / 2}px;
    }

    .tripcard__name {
        margin: 0;
        padding: 0;
        font-weight: 800;
        font-size: ${Spacings.FONT.SMALL};
    }

    .tripcard__count {
        display: flex;
        flex-direction: row;
        font-weight: 600;
        color: ${Colors.GREY_BASE};;
        margin-right: ${Spacings.MEDIUM}px;
        .__icon {
            margin-right: ${Spacings.SMALL / 2}px;
            margin-top: -4px;
            svg{
                path { 
                    /* fill: ${Colors.GREY_BASE};;  */
                    /* stroke: ${Colors.GREY_BASE};; */
                }
                width: 20px;
                height: 20px;
            }
        }
    }

    .tripcard__more {
        display: flex;
        flex-direction: row;
        margin-right: ${Spacings.MEDIUM}px;
        .__icon {
            position: absolute;
            right: 0;
            margin-right: ${Spacings.MEDIUM}px;
            svg{
                path { 
                    fill: ${Colors.BLUE_BASE};; 
                    stroke: ${Colors.BLUE_BASE};;
                }
                width: 16px;
                height: 16px;
            }
        }
    }

    .tripcard__title {
        position: absolute;
        left: 0px;
        width: 100%;
        margin: ${({ ownerDetailVisible }) =>
          ownerDetailVisible ? `${Spacings.LARGE + 8}px 0 0` : `5px 0 0`};
        padding: 0;
        text-align: center;
        font-size: ${Spacings.FONT.SMALL};
        font-weight: 800;
        color: ${Colors.GREY_BASE};;
    }

    .tripcard__level {
        margin: 0;
        padding: 0;
        font-size: ${Spacings.FONT.TINY};
    }

    .tripcard__location {
        display: flex;
        flex-direction: row; 
        /* height: 100px; */
        width: calc(100% - 6%);
        justify-content: space-between;
        align-items: center;
        margin: 36px ${Spacings.SMALL}px ${Spacings.SMALL}px;
    }

    .tripcard__divider {
        display: none;
        flex-direction: row;
        width: 56%;
        justify-content: center;
        align-items: center;
        margin: 0 2%;
    }

    .tripcard__divider-start {
        width: 8px;
        height: 8px;
        border-radius: 8px;
        background-color: ${Colors.WHITE};
        border: 2px solid ${Colors.BLUE_BASE};
    }
    .tripcard__divider-rule {
        height: 2px;
        width: 100%;
        background-color: ${Colors.BLUE_BASE};
    }
    .tripcard__divider-end {
        width: 8px;
        height: 8px;
        border-radius: 8px;
        background-color: ${Colors.BLUE_BASE};
        border: 2px solid ${Colors.BLUE_BASE};
    }

    .tripcard__location-meta {
        display: flex;
        flex-direction: column; 
        width: 100px;
        &.t-right {
            text-align: right;
        }
    }

    .tripcard__location-header {
        font-size: ${Spacings.FONT.LABEL};
        color: ${Colors.BLUE_BASE};
        .__icon{
            svg{
                path { 
                    fill: ${Colors.BLUE_BASE}; 
                    stroke: ${Colors.BLUE_BASE};
                }
                width: 20px;
                height: 20px;
            }
        }
    }

    .tripcard__location-place {
        font-weight: 600;
        color: ${Colors.GREY_BASE};
        font-size: 12px; 
        /* ${Spacings.FONT.SMALL}; */
    }

    .tripcard__location-date {
        color: ${Colors.GREY_LIGHT};
        font-size: ${Spacings.FONT.TINY};
    }

    .tripcad__viewdetails {
        padding: 5px 10px;
    }

    .tripcad__deletetrip {
        a {
            color: red;
        }
        
    }

    .tripcard__footer {
        display: flex;
        flex-direction: row; 
        justify-content: flex-start;
        font-size: 12px; 
        margin-top: ${Spacings.SMALL}px;
        p {
            margin: 0;
            padding: 0;
        }
    }

    @media (min-width: ${Spacings.SCREEN.PHABLET}px) {
       .tripcard__divider {
            display: flex;
        }

        .tripcard__title {
            font-size: ${Spacings.FONT.LABEL};
        }
    }
`
