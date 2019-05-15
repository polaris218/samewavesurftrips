import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const Trip = styled.div`
  width: 100%;
  color: ${Colors.GREY_BASE};
  background-color: ${Colors.GREY_MID};
  .trip__avatar {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -20px;
    left: ${Spacings.MEDIUM}px;
    z-index: 99;
  }
  .trip__back {
    position: absolute;
    top: ${Spacings.MEDIUM}px;
    left: ${Spacings.MEDIUM}px;
  }

  .trip__header {
    display: flex;
    flex-direction: row;
    margin-bottom: ${Spacings.MEDIUM}px;
  }

  .trip__header-meta {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: ${Spacings.LARGE}px;
  }

  .trip__name {
    margin: 0;
    margin-top: 50px;
    padding: 0;
    font-weight: 400;
    text-align: center;
    color: ${Colors.GREY_BASE};
  }

  .trip__title {
    position: relative;
    width: 100%;
    font-size: ${Spacings.FONT.HEADER};
    font-weight: 900;
    text-transform: uppercase;
    color: ${Colors.GREY_BASE};
  }

  .trip__level {
    display: flex;
    flex-direction: row;
    margin: 0 0 ${Spacings.MEDIUM}px;
    padding: 0;
    text-align: left;
    width: 100%;
    color: ${Colors.GREY_BASE};

    .trip__level-value {
      color: ${Colors.GREY_BASE};
      font-size: ${Spacings.FONT.BODY};
    }
  }

  .trip__icon {
    margin: ${Spacings.SMALL}px ${Spacings.SMALL}px 0 0;
    svg {
      path {
        fill: ${Colors.BLUE_BASE};
        stroke: ${Colors.BLUE_BASE};
      }
      width: 20px;
      height: 20px;
    }
  }

  .trip__location {
    width: 100%;
    display: flex;
    flex-direction: column;
    /* height: 100px;
        width: calc(100% - 10%); */
    justify-content: space-between;
    align-items: center;
    margin: 0 5%;
    color: ${Colors.GREY_BASE};
  }

  .trip__location-meta {
    width: 100%;
    display: flex;
    flex-direction: column;
    color: ${Colors.GREY_BASE};
    margin-bottom: ${Spacings.MEDIUM}px;
    &.t-right {
      /* text-align: right; */
    }
  }

  .trip__location-header {
    font-size: ${Spacings.FONT.SMALL};
    color: ${Colors.BLUE_BASE};
    font-weight: 400;
    text-transform: uppercase;
  }

  .trip__location-place {
    font-weight: 600;
    color: ${Colors.GREY_BASE};
  }

  .trip__location-date {
    color: ${Colors.GREY_BASE};
    font-size: ${Spacings.FONT.BODY};
  }

  .trip__description {
    margin: ${Spacings.MEDIUM}px 0;
    font-size: ${Spacings.FONT.BODY};
  }

  .tripcad__viewdetails {
    padding: 5px 10px;
    color: ${Colors.GREY_BASE};
  }

  .tripcad__deletetrip {
    a {
      color: red;
    }
  }

  .trip__footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: ${Colors.GREY_BASE};
    p {
      margin: 0;
      padding: 0;
    }
  }

  .trip__card {
    width: 100%;
    margin: ${Spacings.MEDIUM}px 0 0;
  }

  .trip__join {
    width: 100%;
    margin-top: ${Spacings.LARGE}px;
  }

  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    .trip__avatar {
      left: 10%;
    }
  }
`

export const ContentContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`
