import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const Button = styled.button`
  padding: ${Spacings.SMALL}px ${Spacings.MEDIUM}px;
  border: 0px;
  border-radius: ${Spacings.SMALL}px;
  border: ${props => (props.outline ? `2px solid ${Colors.WHITE}` : `none`)};
  background: ${props =>
    props.primary
      ? Colors.BLUE_BASE
      : props.outline
        ? 'none'
        : props.color ? props.color : Colors.ORANGE_BASE};
  width: 100%;
  max-width: 300px;
  height: 55px;
  outline: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: background 0.25s ease, transform .15s ease-in-out,
    box-shadow .45s ease;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};

  :hover {
    border: ${props =>
      props.outline ? `2px solid ${Colors.GREY_LIGHT}` : `none`};
    background: ${props =>
      props.primary
        ? Colors.GREY_LIGHT
        : props.outline
          ? 'none'
          : props.hoverColor ? props.hoverColor : Colors.ORANGE_DARK};
    color: blue;
    p {
      color: ${props => (props.outline ? Colors.GREY_LIGHT : Colors.WHITE)};
    }
    transform: translateY(-3px);
    box-shadow: 0px 14px 22px rgba(23, 23, 77, 0.22);
  }

  p {
    font-size: ${Spacings.FONT.BODY};
    font-weight: 600;
    font-family: 'Ubuntu', sans-serif;
    letter-spacing: 1px;
    color: ${props => (props.outline ? Colors.WHITE : Colors.WHITE)};
  }

  .button__icon {
    margin: 0px 6px 0 0px;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* max-width: 250px; */
  /* height: 100%; */
`
