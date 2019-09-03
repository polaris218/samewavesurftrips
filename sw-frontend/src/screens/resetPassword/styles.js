import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const Forgot = styled.div`
  width: 100%;
  min-height: 430px;
  padding: ${Spacings.MEDIUM}px 0;
  background: ${Colors.BLUE_BASE};
  background: linear-gradient(to right, #0072ff, #16b2ce);
  display: flex;

  .login__inner {
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .login__logo {
    margin: ${Spacings.SMALL}px 0 ${Spacings.SMALL}px;
    width: 80px;
    height: 75px;

    @media (min-width: ${Spacings.SCREEN.TABLET}px) {
      margin: ${Spacings.MEDIUM}px 0 0;
      width: 130px;
      height: 150px;
    }
  }

  .login__register {
    border-top: 1px solid ${Colors.GREY_LIGHT};
    width: 100%;
    max-width: 500px;
    margin-top: ${Spacings.LARGE}px;
    font-size: ${Spacings.FONT.BODY};
    color: ${Colors.WHITE};
    text-align: center;
  }

  .login__form {
    width: 100%;
    max-width: 340px;
    min-height: 250px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }
  .onboard__account {
    margin-top: 1em;
  }
  .onboard_success {
    text-align: center;
    height: 300px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    h3 {
      margin: 0;
      padding: 0;
      color: black;
      font-size: ${Spacings.FONT.TITLE};
    }
    .onboard_success-info {
      text-shadow: -2px 1px 4px black;
      color: #20d630;
      font-size: 20px;
    }
  }
  .error {
    color: ${Colors.BLACK};
  }

  a {
    color: ${Colors.GREY_LIGHT};
  }
`
export const Label = styled.div`
  padding: ${Spacings.LARGE}px ${Spacings.MEDIUM}px;
  font-size: ${Spacings.FONT.BODY};
`
export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 90px);
  overflow-y: scroll;
  padding-bottom: 80px;
`
export const Inner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5vh 0;
`
