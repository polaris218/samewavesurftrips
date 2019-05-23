import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const Onboard = styled.div`
  width: 100%;
  min-height: 800px;
  padding: ${Spacings.LARGE}px 0 ${Spacings.XLARGE * 2}px;
  background-color: ${Colors.BLUE_DARK};
  display: flex;

  .onboard__logo {
    margin: ${Spacings.MEDIUM}px 0 0;
    width: 130px;
    height: 150px;
  }

  .onboard__account {
    border-top: 1px solid ${Colors.GREY_LIGHT};
    width: 100%;
    margin-top: ${Spacings.LARGE}px;
    margin-bottom: ${Spacings.LARGE}px;
    font-size: ${Spacings.FONT.BODY};
    color: ${Colors.WHITE};
    text-align: center;
  }
  .onboard__privacy {
    text-align: center;
    color: ${Colors.WHITE};
    font-size: ${Spacings.FONT.LABEL};
  }
  .onboard__form {
    width: 100%;
    max-width: 500px;
    min-height: 630px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }
  .onboard__error {
    margin-top: ${Spacings.MEDIUM}px;
    color: ${Colors.RED};
    font-size: ${Spacings.FONT.LABEL};
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
      color: ${Colors.GREY_BASE};
      font-size: ${Spacings.FONT.TITLE};
    }
    .onboard_success-info {
      color: ${Colors.GREY_BASE};
      font-size: ${Spacings.FONT.LABEL};
    }
  }

  a {
    color: ${Colors.GREY_BASE};
  }
`
