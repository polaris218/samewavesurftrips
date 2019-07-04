import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const TripCard = styled.div`
    position: relative;
    padding: ${Spacings.MEDIUM}px;
    margin: 0 0 ${Spacings.MEDIUM}px;
    border-radius: 10px;
    width: calc(100% - ${Spacings.LARGE}px);
    display: flex;
    flex-direction: column;
    background-color: ${Colors.BLUE_BASE};
    border: 0.5px solid ${Colors.BLUE_LIGHT};
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,.15);
    /* box-shadow: 0px 14px 32px rgba(23, 23, 77, 0.22); */
    color: ${Colors.WHITE};
    cursor: pointer;
    outline: none;

    &:hover {
        background-color: ${Colors.BLUE_MID};
        box-shadow: 0px 4px 12px rgba(23, 23, 77, 0.22);
    }

    .tripcard__avatar {
        width: 25px;
        height: 25px;
        img  { 
            width: 25px;
        height: 25px;
        }
    }

    .tripcard__header {
        display: flex;
        flex-direction: row;
        position: relative;
        /* margin-bottom: ${Spacings.MEDIUM}px; */
    }

    .tripcard__header-meta {
        height: 25px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left:  ${Spacings.MEDIUM}px;
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
        color: ${Colors.WHITE};
        margin-right: ${Spacings.MEDIUM}px;
        .__icon {
            margin-right: ${Spacings.SMALL / 2}px;
            svg{
                path { 
                    fill: ${Colors.WHITE}; 
                    stroke: ${Colors.WHITE};
                }
                width: 20px;
                height: 20px;
            }
        }
    }

    .tripcard__title {
        position: absolute;
        left: 0px;
        width: 100%;
        margin: ${Spacings.LARGE}px 0 0;
        padding: 0;
        text-align: center;
        font-size: ${Spacings.FONT.BODY};
        font-weight: 900;
        color: ${Colors.WHITE};
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
        border: 2px solid ${Colors.BLUE_BRIGHT};
    }
    .tripcard__divider-rule {
        height: 2px;
        width: 100%;
        background-color: ${Colors.WHITE};
    }
    .tripcard__divider-end {
        width: 8px;
        height: 8px;
        border-radius: 8px;
        background-color: ${Colors.WHITE};
        border: 2px solid ${Colors.BLUE_BRIGHT};
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
        color: ${Colors.WHITE};
        font-size: ${Spacings.FONT.SMALL};
    }

    .tripcard__location-date {
        color: ${Colors.WHITE};
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
        p {
            margin: 0;
            padding: 0;
        }
    }

    @media (min-width: ${Spacings.SCREEN.PHABLET}px) {
       .tripcard__divider {
            display: flex;
        }
    }
`
