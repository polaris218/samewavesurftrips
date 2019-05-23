import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const Profile = styled.div`
  width: 100%;
  height: 100%;

  .profile__avatar {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -20px;
    left: ${Spacings.MEDIUM}px;
    z-index: 99;
  }
  .profile__back {
    position: absolute;
    top: ${Spacings.MEDIUM}px;
    left: ${Spacings.MEDIUM}px;
  }

  .profile__header-meta {
    width: calc(100% - ${Spacings.LARGE}px);
    margin-bottom: ${Spacings.LARGE}px;
    padding: ${Spacings.MEDIUM}px;
    font-size: ${Spacings.FONT.LABEL};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .profile__person {
    padding-left: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (min-width: ${Spacings.SCREEN.TABLET}px) {
      padding-left: 80px;
    }
  }
  .profile__name,
  .profile__location {
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
    }
  }
  .profile__location {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 20px;
    padding-top: 4px;
  }
  .profile__name {
    font-weight: 700;
  }

  .profile__contact,
  .profile__contact_mobile {
    display: none;
    button {
      margin-left: ${Spacings.MEDIUM}px;
      height: 40px;
      p {
        font-size: .9rem;
        text-transform: uppercase;
      }
    }
    @media (min-width: ${Spacings.SCREEN.TABLET}px) {
      display: flex;
    }
  }
  .profile__contact_mobile {
    display: flex;
    button {
      margin: ${Spacings.SMALL}px ${Spacings.SMALL}px ${Spacings.MEDIUM}px;
    }
    @media (min-width: ${Spacings.SCREEN.TABLET}px) {
      display: none;
    }
  }

  .profile__detail {
    padding: 0;
    font-weight: 400;
    text-align: left;
    color: ${Colors.GREY_BASE};
    width: 100%;
  }

  .profile__level {
    display: flex;
    flex-direction: row;
    margin: 0 0;
    padding: 0;
    text-align: left;
    width: 100%;
    color: ${Colors.GREY_BASE};

    .profile__level-value {
      color: ${Colors.BLUE_BASE};
      font-size: ${Spacings.FONT.BODY};
    }
  }

  .profile__icon {
    margin-right: ${Spacings.SMALL}px;
    svg {
      path {
        fill: ${Colors.BLUE_BASE};
        stroke: ${Colors.BLUE_BASE};
      }
      width: 20px;
      height: 20px;
    }
  }

  .profile__location-header {
    text-transform: uppercase;
    font-size: ${Spacings.FONT.SMALL};
    color: ${Colors.BLUE_BASE};
  }

  .profile__location-place {
    font-weight: 600;
    color: ${Colors.GREY_BASE};
  }

  .profile__location-date {
    color: ${Colors.GREY_BASE};
    font-size: ${Spacings.FONT.BODY};
  }

  .profile__description {
    margin: ${Spacings.MEDIUM}px 0;
    font-size: ${Spacings.FONT.BODY};
  }

  .profilecad__viewdetails {
    padding: 5px 10px;
    color: ${Colors.GREY_BASE};
  }

  .profile__card {
    width: 100%;
    margin: ${Spacings.MEDIUM}px 0 0;
  }
  .profile__trips {
    width: calc(100% - ${Spacings.LARGE}px);
    margin: ${Spacings.MEDIUM}px 0 ${Spacings.MEDIUM}px -${Spacings.LARGE}px;
  }

  .profile_interests {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: ${Spacings.MEDIUM}px 0 0;
  }

  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    .profile__avatar {
      left: calc(5% - ${Spacings.MEDIUM}px);
    }
  }
`
export const Stats = styled.div`
  display: flex;
  flex-direction: row;
`
export const StatDivide = styled.div`
  width: 1px;
  height: 55px;
  background: ${Colors.BLUE_BASE};
  margin: 0 ${Spacings.MEDIUM}px;
`
export const ContentContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`
export const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`
export const Interest = styled.div`
  padding: ${Spacings.SMALL}px ${Spacings.MEDIUM}px;
  background: ${Colors.BLUE_BASE};
  text-transform: uppercase;
  font-size: ${Spacings.FONT.SMALL};
  color: ${Colors.WHITE};
  margin: 0 ${Spacings.SMALL}px ${Spacings.SMALL}px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
`
