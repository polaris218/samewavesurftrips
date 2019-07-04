import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const MenuItem = styled.button`
    padding: ${Spacings.SMALL}px ${Spacings.MEDIUM}px;
    /* margin-bottom: ${Spacings.SMALL / 2}px; */
    border: 0;
    width: 100%;
    height: 40px;
    outline: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: ${props => props.color};
    text-align: left;
    :hover {
        background: ${props => props.hoverColor};
        p {
            color: ${Colors.WHITE};
        }
    }

    p {
        font-size: ${Spacings.FONT.LABEL};
        font-weight: 400;
        font-family: 'Ubuntu', sans-serif;
        color: ${props => (props.outline ? Colors.BLUE_BASE : Colors.WHITE)};
    }

    .menuitem__icon {
        width: 20px;
        height: 20px;
        margin: 0px 6px 0 0px;
        svg {
            fill: ${Colors.WHITE};
        }
    }
`

export const MenuItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`
