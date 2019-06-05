import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const Terms = styled.div`
  width: 100%;
  height: 100vh;
  background: white;
  .terms__back {
    position: absolute;
    top: ${Spacings.MEDIUM}px;
    left: ${Spacings.MEDIUM}px;
  }
`

export const Content = styled.div`
  color: ${Colors.GREY_BASE};
  width: calc(100% - ${Spacings.MEDIUM * 2}px);
  height: 100vh;
  overflow-y: scroll;
  padding: 55px ${Spacings.MEDIUM}px 85px;
  background: white;
  a,
  a:visited,
  a:link {
    color: ${Colors.BLUE_BASE};
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`
export const Title = styled.h2``
