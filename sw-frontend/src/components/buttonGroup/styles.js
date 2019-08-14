import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  width: calc(100%);
  /* background-color: rgba(255,255,255, 1); */
  div {
    width: auto;
  }
  button {
    height: 40px;
    padding: 0 ${Spacings.SMALL}px;
    width: auto;
  }
  div:last-child {
    padding-right: ${({ showMore }) => (showMore ? '30px' : 0)};
  }

  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    button {
    }
  }
`

export const More = styled.div`
  width: 40px !important;
  height: 44px;
  right: 10px;
  margin-top: -3px;
  background: white;
  /* border: 1px solid ${Colors.GREY_LIGHT}; */
  box-shadow: 0px 5px 8px rgba(23, 23, 77, 0.22);
  border-radius: 5px;
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
    fill: ${Colors.BLUE_BASE};
  }
`
