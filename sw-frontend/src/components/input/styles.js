import styled from 'styled-components'
import TextField from '@material-ui/core/Input'
import { Colors, Spacings } from 'config'

export default styled(TextField)`

    border: 0px solid ${Colors.GREY_GREEN};
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    border-radius: 3px;
    width: calc(100% - 16px);
    /* height: 50px; */
    margin: 0px 0px 20px;
    background-color: rgba(255, 255, 255, 0.3);
    transition: background .25s ease;
    input{
        border: 0px solid ${Colors.GREY_GREEN};
        border-top-width: 0;
        border-left-width: 0;
        border-right-width: 0;
        padding: 16px 8px;
        width: calc(100% - 16px);
        margin: 0px 0px 0px;
        background-color: rgba(255, 255, 255, 0.1);
        transition: background .25s ease;
    }
    :hover{
        color: ${Colors.GREY_BASE};
    }
    input:focus {
        background-color: rgba(255, 255, 255, 0.8);

    }

    &&::after{
        border-bottom-color: ${Colors.GREEN_BASE}
    }
`

export const PlacesInput = styled.div`
  .location-search-input {
    height: 30px;
    width: calc(100% - ${Spacings.SMALL}px);
    font-size: ${Spacings.FONT.SMALL};
    padding-left: ${Spacings.SMALL}px;
    margin-bottom: ${Spacings.MEDIUM}px;
    border: 1px solid ${Colors.GREY_GREEN};
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    border-bottom-width: 1px;
    border-bottom-color: ${props =>
      props.error ? Colors.RED : Colors.GREY_LIGHT};
    outline: none;
    background-color: rgba(255, 255, 255, 0.1);
    position: relative;
    z-index: 10;
    &:focus {
      color: ${Colors.GREY_BASE};
      border-bottom-color: ${props =>
        props.error ? Colors.RED : Colors.GREEN_BASE};
    }
  }

  .autocomplete-dropdown-container {
    margin: 0 0 ${Spacings.MEDIUM}px;
    padding: 0px;
    background: ${Colors.GREY_MID};
    position: relative;
    z-index: 20;
  }

  .suggestion-item {
    padding: ${Spacings.SMALL}px ${Spacings.MEDIUM}px;
    font-size: ${Spacings.FONT.BODY};
    color: ${Colors.GREY_BASE};
  }

  .suggestion-item--active {
    padding: ${Spacings.SMALL}px ${Spacings.MEDIUM}px;
    font-size: ${Spacings.FONT.BODY};
    color: ${Colors.BLUE_BASE};
    cursor: pointer;
  }
`
