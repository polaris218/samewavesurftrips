import styled from 'styled-components';
import { Colors } from 'config';

export const TripIcon = styled.div`
  /* background-color: ${props => props.type === 'departing' ? 'rgba(255,255,255, 0.1)' : 'rgba(255,255,255, 0.1)'}; */
  width: ${(props) => props.size === 'large'? '80px' : '50px'};
  height: ${(props) => props.size === 'large'? '80px' : '50px'};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  :hover, :focus {

  }

  svg {
    width: 80%;
    height: 80%;
    
    path {
      fill: ${(props) => props.active ? Colors.ORANGE_BASE : Colors.BLUE_BASE};
      stroke: ${(props) => props.active ? Colors.ORANGE_BASE : Colors.BLUE_BASE};
      transition: fill .25s ease, stroke .25s ease;
    }
  }
`;