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
  min-height: calc(100vh - 160px);
  width: 100%;
  color: ${Colors.GREY_BASE};
  margin: 0 0;
  /* text-transform: uppercase; */
  line-height: 1.7rem;
  text-align: center;
  font-size: ${Spacings.FONT.TITLE};
  svg {
    margin-bottom: ${Spacings.XLARGE}px;
    width: 200px;
    height: 60px;
  }

  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    min-height: calc(100vh - 205px);
  }
`
export const FootContainer = styled.div`
  margin-top: -26px;
  width: 100%;
`
export const PreloadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 100px);
  width: 100%;
  min-height: 400px;
`
