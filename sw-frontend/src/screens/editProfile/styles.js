import styled from 'styled-components'
import { Spacings, Colors } from 'config'

export const Profile = styled.div`
  width: 100%;
  height: 100%;

  .profile__container {
    width: 100%;
    padding: 60px 0 50px;
  }
  .profile__back {
    position: absolute;
    top: ${Spacings.MEDIUM}px;
    left: ${Spacings.MEDIUM}px;
  }
  .profile__loader {
    margin: ${Spacings.LARGE}px 0 80px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .profile__button {
    margin: ${Spacings.LARGE}px 0 80px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .__block {
      width: ${Spacings.MEDIUM}px;
    }
  }
  .profile__button_complete {
    margin: ${Spacings.LARGE}px 0 ${Spacings.LARGE}px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .__block {
      width: ${Spacings.MEDIUM}px;
    }
  }
  .profile__success {
    display: flex;
    align-items: center;
    height: calc(100% - 80px);
    width: calc(100% - ${Spacings.MEDIUM * 2}px);
    margin-left: ${Spacings.MEDIUM}px;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }
  .profile__success-content {
    width: 100%;
    max-width: 340px;
  }
  .profile__complete {
    font-size: ${Spacings.FONT.BODY};
    color: ${Colors.GREY_BASE};
    text-align: center;
    margin-bottom: ${Spacings.LARGE}px;
  }
  .profile__icon {
    text-align: center;
    margin: ${Spacings.MEDIUM}px;
    svg {
      margin: ${Spacings.LARGE}px;
    }
  }
  .profile__avatar {
    display: flex;
    justify-content: center;
    margin: ${Spacings.SMALL}px 0 ${Spacings.LARGE}px;
  }
  .profile__cover img {
    width: 100%;
    height: auto;
    margin: ${Spacings.SMALL}px 0 ${Spacings.LARGE}px;
    @media (min-width: ${Spacings.SCREEN.TABLET}px) {
      width: 200px;
    }
  }
`

export const Label = styled.p`
  width: 100%;
  padding: 0;
  margin: ${Spacings.SMALL}px 0;
  color: ${Colors.BLUE_BRIGHT};
  font-weight: 600;
  text-transform: uppercase;
  font-size: ${Spacings.FONT.SMALL};
`

export const ContentContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
`
export const InputFile = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  margin: ${Spacings.MEDIUM}px 0;
  justify-content: center;
  .btn {
    width: 200px;
    border: 2px solid gray;
    color: gray;
    background-color: white;
    padding: 8px 20px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
  }

  input[type=file] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }

  :hover {
    .btn {
      border: 2px solid ${Colors.ORANGE_BASE};
      color: ${Colors.ORANGE_BASE};
      background-color: white;
    }
  }
`
export const Sub = styled.p`
  font-size: ${Spacings.FONT.TINY};
  color: ${Colors.GREY_BASE};
`
export const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`
export const Images = styled.div``
export const Details = styled.div`
  width: 100%;
  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    padding: 0 0 0 ${Spacings.LARGE}px;
  }
`

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    flex-direction: row;
  }
`
export const DateInput = styled.div`
  width: calc(100% - ${Spacings.MEDIUM}px);
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
export const ImgCenter = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    height: 40px;
  }
`
export const ButtonFooter = styled.div`
  position: fixed;
  z-index: 99;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: calc(100% - ${Spacings.MEDIUM}px);
  padding: ${Spacings.SMALL}px;
  background: ${Colors.WHITE};

  @media (max-width: ${Spacings.SCREEN.TABLET}px) {
    div {
      padding: ${Spacings.SMALL}px;
      width: calc(100% - ${Spacings.MEDIUM}px);
    }
    button {
      width: 100%;
      max-width: 100%;
    }
  }
`
export const ButtonGroupRow = styled.div`
  display: block;
  width: calc(100% - ${Spacings.MEDIUM}px);
  margin: ${Spacings.MEDIUM}px 0 ${Spacings.LARGE}px;
  margin-left: -${Spacings.MEDIUM}px;
  overflow-x: scroll;
  padding: 0 0 0 ${Spacings.SMALL}px;
  div: {
    width: auto;
  }
  button {
    width: auto;
    min-width: 100px;
    margin: 0 ${Spacings.SMALL}px;
    p {
      font-size: ${Spacings.FONT.TINY};
    }
  }

  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    /* width: calc(100% - 64px); */
  }
`
