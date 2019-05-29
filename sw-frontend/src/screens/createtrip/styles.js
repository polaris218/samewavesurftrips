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
    margin-top: -50px;
    margin-bottom: 50px;
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
      padding: ${Spacings.MEDIUM}px 0 ${Spacings.LARGE}px;
    }
  }
  .trip__success__button {
    margin-bottom: ${Spacings.MEDIUM}px;
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
  max-width: 800px;
  height: calc(100vh);
  overflow: scroll;
`

export const Step = styled.div`
  width: 100%;
  height: 100%;
  min-height: 350px;
`
export const Steps = styled.div`
  color: ${Colors.GREY_BASE};
  padding: ${Spacings.MEDIUM}px;
  margin-bottom: ${Spacings.MEDIUM}px;
  span {
    font-size: ${Spacings.FONT.TINY};
    text-align: right;
    width: 100%;
    padding-top: 4px;
  }
`

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;

  button {
    margin-bottom: ${Spacings.MEDIUM}px;
  }
  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    flex-direction: row;
  }
`
export const Title = styled.h3`color: ${Colors.GREY_BASE};`
export const Error = styled.div`
  margin-top: 4px;
  text-align: center;
  color: ${Colors.RED_BASE};
  font-size: ${Spacings.FONT.SMALL};
`
