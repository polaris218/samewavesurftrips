import styled from 'styled-components'
import { Spacings, Colors } from 'config'

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
    z-index: 10;
    background: ${Colors.ORANGE_BASE};
    outline: none;
    transition: transform .25s cubic-bezier(0.075, 0.82, 0.165, 1), background .45s cubic-bezier(0.075, 0.82, 0.165, 1);
    filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2));

    :hover {
        transform: scale(1.1);
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

    @media (min-width: ${Spacings.SCREEN.TABLET}px) {
        transform: scale(1) translateY(50px);
        :hover {
            transform: scale(1.1) translateY(45px);
        }
    }
  }
`
