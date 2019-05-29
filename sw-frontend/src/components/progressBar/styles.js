import styled from 'styled-components'
import { Colors } from 'config'

export const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  position: relative;
  background-color: ${Colors.GREY_MID};
  border-radius: 3px;
  overflow: hidden;
`
export const Bar = styled.div`
  background-color: ${Colors.BLUE_BASE};
  width: 100%;
  height: 100%;
  left: -100%;
  transition: transform .2s ease;
  transform: ${({ step, total }) => `translateX(${step / total * 100}%)`};
  position: relative;
`
