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
    background: transparent; /* ${props => props.color}; */
    
    text-align: left;
    :hover {
        background: rgba(255,255,255,0.5);
        p {
            color: ${Colors.GREY_BASE};
        }
    }

    p {
        font-size: ${Spacings.FONT.LABEL};
        font-weight: 700;
        font-family: 'Ubuntu', sans-serif;
        color: ${props =>
          props.outline ? Colors.BLUE_BASE : Colors.BLUE_BASE};
    }

    .menuitem__icon {
        width: 20px;
        height: 20px;
        margin: 4px 6px 0 0px;
        svg {
            fill: ${Colors.BLUE_BASE};
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
