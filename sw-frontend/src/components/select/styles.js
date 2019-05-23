import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Colors, Spacings } from 'config';

export const SelectMenu = styled(Select)`
    width: calc(100% - ${Spacings.MEDIUM}px);
    min-width: 120px;
    height: 40px;
    margin-bottom: ${Spacings.MEDIUM}px;
    background-color: rgba(255, 255, 255, 0.1);
    padding-left: ${Spacings.MEDIUM}px;

    :focus, :hover{
        color: ${Colors.GREEN_BASE}
    }

    &&::after{
        border-bottom-color: ${(props) => props.error ? Colors.RED : Colors.GREEN_BASE}
    }
`;

export const Item = styled(MenuItem)`
    min-width: 120px;

    :focus, :hover{
        color: ${Colors.GREEN_BASE}
    }

    &&::after{
        border-bottom-color: ${(props) => props.error ? Colors.RED : Colors.GREEN_BASE}
    }
`;