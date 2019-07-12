import styled from 'styled-components'
import { Spacings } from 'config'

export const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ visible }) =>
    visible ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)'};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  transition: background .2s ease;
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
`
export const Content = styled.div`
  max-width: 90vw;
  width: 90vh;
  margin: 0 ${Spacings.MEDIUM}px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: translateY(${({ visible }) => (visible ? '0px' : '20px')});
  transition: transform .2s ease, opacity .15s;
`
export const Title = styled.h2`
  margin: ${Spacings.SMALL}px 0;
  padding: 0;
`
export const Sub = styled.h3`
  margin: 0 0 ${Spacings.LARGE}px;
  font-weight: 400;
  padding: 0;
`

export const ButtonContainer = styled.div`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  flex-direction: row;
  margin: ${Spacings.MEDIUM}px 0;
  button {
    width: 90%;
  }
`
