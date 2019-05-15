import styled from 'styled-components'
import { Colors } from 'config'

export const Avatar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${Colors.BLACK};
  border: 2px solid white;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100px;
    max-height: 100px;
  }
  svg {
    width: 50%;
    height: 50%;
  }
`
