import styled from 'styled-components';
// import { Colors, Spacings } from 'config';

export default styled.div`
    width: 100%;
    height: 100%;

    canvas {
        width: 100% !important;
        height: 100% !important;
    }

    .marker {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
    }
`;