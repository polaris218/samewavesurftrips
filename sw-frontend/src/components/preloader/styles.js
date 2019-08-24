import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'

export const Progress = styled(CircularProgress)`
    && {
        color: 'inherit';
    }
`
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  div {
    color: ${({ color }) => color};
  }
`
