import styled from 'styled-components'
import { Spacings, Colors } from 'config'

export const Stat = styled.div`
  padding: 0px ${Spacings.SMALL}px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${Colors.BLUE_BASE};
`
export const Digit = styled.div`
  font-size: 1.8rem;
  line-height: 1.5rem;
  text-align: center;
`

export const Label = styled.div`
  margin: ${Spacings.SMALL}px 0 ${Spacings.MEDIUM}px;
  color: ${Colors.BLUE_BASE};
  font-size: ${Spacings.FONT.TINY};
  font-weight: 600;
  text-align: center;
`
