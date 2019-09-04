import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const Trip = styled.div`
  width: 100%;
  height: 100%;
  color: ${Colors.GREY_BASE};
  background-color: ${Colors.GREY_MID};
  .trip__avatar {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -20px;
    left: ${Spacings.MEDIUM}px;
    z-index: 99;
    cursor: pointer;
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
    width: calc(100% - 6px);
    margin-bottom: ${Spacings.LARGE}px;
    padding: ${Spacings.MEDIUM}px;
    font-size: ${Spacings.FONT.LABEL};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .trip__person {
    padding-left: 110px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    @media (min-width: ${Spacings.SCREEN.TABLET}px) {
      padding-left: 100px;
    }
  }
  .trip__name,
  .trip__location {
    margin: 0;
    padding: 0;
    font-weight: 400;
    text-align: left;
    color: ${Colors.GREY_BASE};
    width: 100%;

    svg {
      width: 16px;
      height: 16px;
      margin-top: -1px;
      margin-right: 4px;
      padding: 4px 0;
      fill: ${Colors.BLUE_BASE};
    }
  }
  .trip__location {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 20px;
    padding-top: 12px;
    @media (min-width: ${Spacings.SCREEN.TABLET}px) {
      padding-top: 4px;
    }
  }
  .trip__name {
    font-weight: 700;
  }

  .trip__contact {
    display: flex;
    button {
      margin-left: ${Spacings.MEDIUM}px;
      height: 40px;
      p {
        font-size: .9rem;
        text-transform: uppercase;
      }
    }
  }
  .trip__join-desktop {
    display: none;
    @media (min-width: ${Spacings.SCREEN.TABLET}px) {
      display: block;
    }
  }
  .trip__join-mobile {
    @media (min-width: ${Spacings.SCREEN.TABLET}px) {
      display: none;
    }
  }
  .trip__title {
    position: relative;
    text-align: center;
    width: 100%;
    font-size: ${Spacings.FONT.TITLE};
    font-weight: 900;
    text-transform: uppercase;
    color: ${Colors.GREY_BASE};
    div {
      margin: ${Spacings.MEDIUM}px 0 0;
    }
    @media (min-width: ${Spacings.SCREEN.TABLET}px) {
      text-align: left;
      font-size: ${Spacings.FONT.HEADER};
    }
  }

  .trip__level {
    display: flex;
    flex-direction: row;
    /* margin: 0 0 ${Spacings.MEDIUM}px; */
    padding: 0;
    text-align: left;
    width: 100%;
    max-width: 100px;
    color: ${Colors.GREY_BASE};

    .trip__level-value {
      color: ${Colors.GREY_BASE};
      font-size: ${Spacings.FONT.BODY};
      display: flex;
      flex-direction: column;
      margin: ${Spacings.MEDIUM}px;
      justify-content: center;
      align-items: center;
      /* width: 100px; */
      img {
        width: 50px;
        height: 50px;
      }
      span {
        font-size: ${Spacings.FONT.SMALL};
        padding: ${Spacings.SMALL}px 0;
      }
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
    font-weight: 600;
    text-transform: uppercase;
    margin: ${Spacings.SMALL}px 0;
  }
  .trip__location-header-top {
    font-size: ${Spacings.FONT.SMALL};
    color: ${Colors.BLUE_BASE};
    font-weight: 600;
    text-transform: uppercase;
    margin: 8px 0 8px 108px;
    width: calc(100% - 152px);
    /* padding-left: 262px; */
    transform: translateY(12px);

    @media (min-width: ${Spacings.SCREEN.TABLET}px) {
      /* padding-left: calc(10% + 210px); */
      width: calc(100% - (10% + 210px));

    }
  }

  .paddTop {
    padding-top: ${Spacings.MEDIUM}px;
  }

  .trip__location-place {
    text-align: center;
    font-weight: 600;
    color: ${Colors.GREY_BASE};
  }

  .trip__location-date {
    text-align: center;
    color: ${Colors.GREY_BASE};
    font-size: ${Spacings.FONT.SMALL};
  }

  .trip__description {
    /* margin: ${Spacings.MEDIUM}px 0; */
    font-size: 1.5rem;
    font-weight: 500;
    color: ${Colors.GREY_BASE};
    text-transform: lowercase;
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
  .trip__details {
    width: 100%;
  }

  .trip__join {
    /* width: 100%; */
    position: fixed;
    z-index: 99;
    bottom: 0;
    width: 100%;
    padding: ${Spacings.MEDIUM}px 0;
    background: ${Colors.WHITE};
    
    @media (max-width: ${Spacings.SCREEN.TABLET}px) {
      div {
        padding: 4px ${Spacings.SMALL}px;
        width: calc(100% - ${Spacings.MEDIUM}px);
      }
      button {
        width: 100%;
        max-width: 100%;
      }
    }

    
  }

  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    .trip__avatar {
      left: calc(5% - ${Spacings.MEDIUM}px);
    }
  }
`

export const TripDivider = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  margin: 0 0 ${Spacings.MEDIUM}px;
  /* background: red; */

  .trip__divider-start {
    width: 11px;
    height: 12px;
    border-radius: 12px;
    background-color: ${Colors.WHITE};
    border: 2px solid ${Colors.BLUE_BASE};
  }
  .trip__divider-rule {
    height: 100%;
    width: 2px;
    background-color: ${Colors.BLUE_BASE};
  }
  .trip__divider-end {
    width: 11px;
    height: 12px;
    border-radius: 12px;
    background-color: ${Colors.BLUE_BASE};
    border: 2px solid ${Colors.BLUE_BASE};
  }
`

export const ContentContainer = styled.div`
  width: 100%;
  padding-top: 70px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-bottom: 70px;
`
export const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`
export const Stats = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-top: ${Spacings.SMALL}px;

  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    flex-direction: row;
  }
`

export const Stat = styled.div`
  width: 20px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Colors.BLUE_BASE};
  font-weight: 500;
`
export const Attendees = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: ${Spacings.SMALL}px;
  padding-left: 10px;

  div {
    margin-left: -10px;
  }
  div,
  img {
    width: 45px;
    height: 45px;
  }
`
export const Directions = styled.div`
  width: 100%;
  text-align: right;
  font-weight: bold;
  margin: -28px 0 25px;
  a {
    color: ${Colors.ORANGE_BASE};
  }
  svg {
    width: 15px;
    height: 15px;
    transform: translate(-2px, 2px);
    path {
      fill: ${Colors.ORANGE_BASE};
    }
  }
`
export const Row = styled.div`
  display: flex;
  flex-direction: row;
`
