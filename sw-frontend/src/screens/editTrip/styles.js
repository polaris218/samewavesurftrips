import styled from 'styled-components'
import { Spacings, Colors } from 'config'
import 'react-datepicker/dist/react-datepicker.css'

export const Trip = styled.div`
  width: 100%;
  height: 100%;

  .trip__container {
    width: 100%;
    padding: 80px 0 0;
  }
  .trip__back {
    position: absolute;
    top: ${Spacings.MEDIUM}px;
    left: ${Spacings.MEDIUM}px;
  }
  .trip__loader {
    margin-top: ${Spacings.MEDIUM}px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .trip__button {
    margin: ${Spacings.MEDIUM}px 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    max-width: 500px;
    .__block {
      width: ${Spacings.MEDIUM}px;
    }
  }

  .react-datepicker__input-container input {
    background-color: rgba(255, 255, 255, 0.1);
    border: 0px;
    border-bottom: 1px solid ${Colors.GREY_BASE};
  }
  .trip__success {
    display: flex;
    align-items: center;
    height: calc(100% - 80px);
    width: calc(100% - ${Spacings.MEDIUM * 2}px);
    margin-left: ${Spacings.MEDIUM}px;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }
  .trip__success-content {
    width: 100%;
    max-width: 340px;
  }
  .trip__complete {
    font-size: ${Spacings.FONT.BODY};
    color: ${Colors.GREY_BASE};
    text-align: center;
    margin-bottom: ${Spacings.LARGE}px;
  }
  .trip__icon {
    text-align: center;
    margin: ${Spacings.MEDIUM}px;
    svg {
      margin: ${Spacings.LARGE}px;
    }
  }
`

export const DateInput = styled.div`
  width: 100%;
  margin: ${Spacings.MEDIUM}px 0;

  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker__input-container {
    width: 100%;
    outline: none;
  }
  input {
    width: calc(100% - ${Spacings.LARGE}px);
    height: 40px;
    padding: ${Spacings.SMALL}px ${Spacings.MEDIUM}px;
    font-size: ${Spacings.FONT.BODY};
    color: ${Colors.GREY_BASE};
    outline: none;
  }
`

export const Label = styled.p`
  width: 100%;
  padding: 0;
  margin: ${Spacings.SMALL}px 0 0;
  color: ${Colors.ORANGE_DARK};
  font-weight: 600;
  text-transform: uppercase;
  font-size: ${Spacings.FONT.SMALL};
`

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
`
