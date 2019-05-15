import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Colors } from 'config';

export default styled(CircularProgress)`
    && {
        color: ${Colors.BLUE_BASE}
    }
`;