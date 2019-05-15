import styled from 'styled-components'
import { Spacings, Colors } from 'config'

export const Profile = styled.div`
  width: 100%;
  height: 100%;

  .profile__container {
    width: 100%;
    padding: 80px 0 0;
  }
  .profile__back {
    position: absolute;
    top: ${Spacings.MEDIUM}px;
    left: ${Spacings.MEDIUM}px;
  }
  .profile__loader {
    margin-top: ${Spacings.MEDIUM}px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .profile__button {
    margin: ${Spacings.MEDIUM}px 0;
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
      path {
        fill: ${Colors.ORANGE_BASE};
      }
    }
  }
`

export const Label = styled.p`
  width: 100%;
  padding: 0;
  margin: ${Spacings.SMALL}px 0;
  color: ${Colors.ORANGE_DARK};
  font-weight: 600;
  text-transform: uppercase;
  font-size: ${Spacings.FONT.SMALL};
`

export const ContentContainer = styled.div`
  width: 100%;
  overflow: scroll;
`
export const InputFile = styled.input`
  width: 200px;
  height: 40px;
  font-size: 16px;
  color: ${Colors.ORANGE_DARK};
  /* background: red; */
`
