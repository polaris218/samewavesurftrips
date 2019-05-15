import styled from 'styled-components'
import { Colors } from 'config'

export const Fab = styled.button`
    width: 60px;
    height: 60px;
    padding: 0;
    margin: 0;
    position: absolute;
    bottom: 80px;
    right: 20px;
    border: 0px;
    border-radius: 30px;
    /* background: ${Colors.GREEN_BASE}; */
    background: ${Colors.ORANGE_BASE};
    /* background: radial-gradient(circle, rgba(0,212,255,1) 54%, rgba(15,230,205,1) 100%); */
    outline: none;
    transform: scale(0.01);
    transition: transform .25s cubic-bezier(0.075, 0.82, 0.165, 1), background .45s cubic-bezier(0.075, 0.82, 0.165, 1);
    /* filter: drop-shadow(0px 2px 1px rgba(0,0,0,0.1)); */
    filter: drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.2));

    :hover {
        transform: scale(1.1);
        /* background-color: rgba(255, 255, 255, 0.2); */
        /* background: radial-gradient(circle, rgba(0,212,255,1) 74%, rgba(15,230,205,1) 100%); */

        svg {
            transform: scale(0.6);
        }
    }

    svg{
        transform: scale(0.5);
        transition: transform .45s ease;
        stroke: ${Colors.WHITE};
        fill: ${Colors.WHITE};
    }
`
