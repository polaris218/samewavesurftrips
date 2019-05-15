import styled from 'styled-components';

export const BackgroundImg = styled.div`
    width: calc(100% + 60px);
    height: calc(100% + 60px);
    position: absolute;
    top: -30px;
    left: -30px;
    right: -30px;
    bottom: -30px;
    background: url(${props => props.image}) no-repeat center center fixed; 
    background-size: cover;
    background-repeat: no-repeat;
    filter: blur(${(props) => props.blur}px);
    opacity: ${(props) => props.opacity}
`;