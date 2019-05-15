import styled, { keyframes }  from 'styled-components';

const logoSpin = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
`;

export const Logo = styled.div`
    /* animation: ${logoSpin} infinite 20s linear; */
    width: ${props => props.width ? props.width : '100%' };
`;
