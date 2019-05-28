import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const Privacy = styled.div`
  width: 100%;

  .terms__back {
    position: absolute;
    top: ${Spacings.MEDIUM}px;
    left: ${Spacings.MEDIUM}px;
  }
`

export const Content = styled.div`
  color: ${Colors.GREY_BASE};
  padding: 90px ${Spacings.MEDIUM}px;

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
