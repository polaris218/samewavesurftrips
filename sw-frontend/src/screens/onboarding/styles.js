import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const Onboard = styled.div`
  width: 100%;
  min-height: 850px;
  padding: ${Spacings.MEDIUM}px 0px;
  background: ${Colors.BLUE_BASE};
  background: linear-gradient(to right, #e4f1f1, #f8fdfd);
  display: flex;

  a,
  a:visited,
  a:link {
    color: ${Colors.GREY_LIGHT};
    font-weight: 600;
  }
  a:hover {
    color: ${Colors.GREY_LIGHT};
  }
  .onboard__logo {
    margin: 0 0 ${Spacings.LARGE}px;
    width: 80px;
    height: 75px;

    @media (min-width: ${Spacings.SCREEN.TABLET}px) {
      margin: ${Spacings.MEDIUM}px 0 0;
      width: 130px;
      height: 150px;
    }

    svg {
      fill: ${Colors.BLUE_BASE};
      stroke: ${Colors.BLUE_BASE};
    }
  }

  .onboard__account {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    margin-top: ${Spacings.LARGE}px;
    margin-bottom: ${Spacings.LARGE}px;
    font-size: ${Spacings.FONT.BODY};
    color: ${Colors.GREY_LIGHT};
    text-align: center;
  }
  .onboard__privacy {
    text-align: center;
    color: ${Colors.GREY_LIGHT};
    font-size: ${Spacings.FONT.LABEL};
    line-height: 20px;
  }
  .onboard__form {
    width: 100%;
    max-width: 340px;
    min-height: 630px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }
  .onboard__error {
    margin-top: ${Spacings.MEDIUM}px;
    color: ${Colors.BLACK};
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
