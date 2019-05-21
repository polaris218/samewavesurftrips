import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const Login = styled.div`
  width: 100%;
  min-height: 800px;
  padding: ${Spacings.LARGE}px 0 ${Spacings.XLARGE * 2}px;
  background-color: ${Colors.BLUE_DARK};
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
    margin: ${Spacings.MEDIUM}px 0 0;
    width: 130px;
    height: 150px;
  }

  .login__fb {
    margin-top: ${Spacings.MEDIUM}px;
    width: 100%;
  }

  .login__forgotpw {
    margin-top: -${Spacings.MEDIUM}px;
    margin-bottom: ${Spacings.MEDIUM}px;
    font-size: ${Spacings.FONT.LABEL};
    text-align: right;
    width: 100%;
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
    max-width: 500px;
    min-height: 350px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }

  .login__error {
    margin-top: ${Spacings.MEDIUM}px;
    color: ${Colors.RED};
    font-size: ${Spacings.FONT.BODY};
  }

  a {
    color: ${Colors.GREY_LIGHT};
  }
`
