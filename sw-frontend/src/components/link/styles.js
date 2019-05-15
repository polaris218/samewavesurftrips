import styled from 'styled-components';

export const Link = styled.a`
    color:  ${props => props.color};
    text-decoration: none;
    
    :hover, :focus {
        color:  ${props => props.hoverColor};
        text-decoration: underline;
    }
`;