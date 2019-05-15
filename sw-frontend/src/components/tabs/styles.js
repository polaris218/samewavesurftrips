import styled from 'styled-components';
import { Colors } from 'config';

export const TabsContainer = styled.div`
    display: flex;
    flex-grow: 1;
    width: 100%;
    justify-content: ${(props) => props.align === 'center' ? 'center' : 'flex-start'};
    padding-left: ${(props) => props.align === 'center' ? 0 : '10%'};
    background-color: ${(props) => props.backgroundColor};
    border-bottom: 1px solid ${Colors.GREY_LIGHT};
    position: relative;
    .MuiPrivateTabIndicator-root-35 {
        background-color: ${Colors.BLUE_BASE};;
    }

    span {
        color: ${Colors.BLUE_BASE};
        font-weight: 800;   
    }
    && {
        color: ${Colors.GREEN_BASE}
    }
`;  