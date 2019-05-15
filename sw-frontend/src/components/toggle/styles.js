import styled from 'styled-components'
import { Colors } from 'config'

export const Toggle = styled.div`
  padding: 0px;
  margin: 0px;
  border-radius: 20px;
  width: 170px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  /* overflow: hidden; */
  filter: drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.2));
  /* box-shadow: 0px 14px 32px rgba(23, 23, 77, 0.22); */
`

export const ToggleItem = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  /* border-radius: 20px; */
  border-top-left-radius: ${props => (props.index === 1 ? '0px' : '20px')};
  border-bottom-left-radius: ${props => (props.index === 1 ? '0px' : '20px')};
  border-top-right-radius: ${props => (props.index === 1 ? '20px' : '0px')};
  border-bottom-right-radius: ${props => (props.index === 1 ? '20px' : '0px')};
  color: ${props => (props.active ? Colors.WHITE : Colors.BLUE_BASE)};
  font-weight: 600;
  line-height: 20px;
  background-color: ${props =>
    props.active ? Colors.BLUE_BASE : Colors.WHITE};
  transition: background .25s ease, color .25s .15s;
`
