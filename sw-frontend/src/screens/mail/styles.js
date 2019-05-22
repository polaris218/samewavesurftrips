import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const Mail = styled.div`
  width: 100%;
  height: calc(100% - 70px);
  color: ${Colors.GREY_BASE};
  background-color: ${Colors.GREY_MID};
  padding-top: 50px;
`
export const Empty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  width: 100%;
  color: ${Colors.GREY_BASE};
  margin: ${Spacings.LARGE}px 0 0;
  /* text-transform: uppercase; */
  line-height: 1.7rem;
  text-align: center;
  font-size: ${Spacings.FONT.TITLE};
  svg {
    margin-bottom: ${Spacings.XLARGE}px;
    width: 200px;
    height: 60px;
  }
`
