import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const Button = styled.button`
  padding: ${Spacings.SMALL}px ${Spacings.MEDIUM}px;
  border: 0px;
  border-radius: 5px;
  border: ${props =>
    props.outline
      ? `2px solid ${Colors.WHITE}`
      : props.outlineDark ? `2px solid ${Colors.BLUE_BASE}` : `none`};
  background: ${props =>
    props.selected
      ? Colors.BLUE_BASE
      : props.primary
        ? Colors.BLUE_BASE
        : props.outline || props.outlineDark
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
      props.outline
        ? `2px solid ${Colors.GREY_LIGHT}`
        : props.outlineDark ? `2px solid ${Colors.BLUE_BASE}` : `none`};
    background: ${props =>
      props.selected
        ? Colors.BLUE_BASE
        : props.primary
          ? Colors.GREY_LIGHT
          : props.outline || props.outlineDark
            ? 'none'
            : props.hoverColor ? props.hoverColor : Colors.ORANGE_DARK};
    p {
      color: ${props =>
        props.selected
          ? Colors.WHITE
          : props.outline
            ? Colors.GREY_LIGHT
            : props.outlineDark ? Colors.GREY_LIGHT : Colors.WHITE};
    }
    transform: ${({ animated }) => (animated ? 'translateY(-3px)' : 'none')};
    box-shadow: 0px 7px 12px rgba(23, 23, 57, 0.22);
  }

  p {
    font-size: ${Spacings.FONT.BODY};
    font-weight: 600;
    font-family: 'Ubuntu', sans-serif;
    letter-spacing: 1px;
    color: ${props =>
      props.selected
        ? Colors.WHITE
        : props.outline
          ? Colors.WHITE
          : props.outlineDark ? Colors.BLUE_BASE : Colors.WHITE};
  }

  .button__icon {
    margin: 0px 6px 0 0px;
  }

  svg {
    width: 20px;
    height: 20px;
    margin-left: -7px;
    margin-right: 8px;
    fill: ${props =>
      props.outline
        ? Colors.WHITE
        : props.outlineDark ? Colors.BLUE_BASE : Colors.WHITE};
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
