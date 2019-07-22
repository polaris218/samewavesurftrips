import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const MapCard = styled.div`
  padding: ${Spacings.SMALL}px;
  margin: 0 0 ${Spacings.SMALL}px;
  border-radius: 10px;
  width: calc(100% - ${Spacings.MEDIUM}px);
  min-width: 200px;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.WHITE};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, .15);
  position: relative;
  z-index: 10;
  color: ${Colors.GREY_BASE};
  cursor: pointer;
  outline: none;
  /* transform: translateY(200px); */
  &:hover {
    background-color: ${Colors.GREY_MID};
  }
  .mapcard__avatar {
    width: 30px;
    height: 30px;
  }

  .mapcard__header {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .mapcard__days {
    display: flex;
    flex-direction: row;
    font-weight: 600;
    color: ${Colors.GREY_BASE};
    margin-right: ${Spacings.MEDIUM}px;
    .__icon {
      margin-right: ${Spacings.SMALL / 2}px;
      margin-top: -4px;
      svg {
        path {
          /* fill: ${Colors.GREY_BASE};
          stroke: ${Colors.GREY_BASE}; */
        }
        width: 20px;
        height: 20px;
      }
    }
  }

  .mapcard__count {
    display: flex;
    flex-direction: row;
    font-weight: 600;
    color: ${Colors.GREY_BASE};
    .__icon {
      margin-right: ${Spacings.SMALL / 2}px;
      margin-top: -4px;
      svg {
        path {
          /* fill: ${Colors.GREY_BASE};
          stroke: ${Colors.GREY_BASE}; */
        }
        width: 20px;
        height: 20px;
      }
    }
  }

  .mapcard__title {
    margin: ${Spacings.SMALL}px 0 0;
    text-align: center;
    font-size: ${Spacings.FONT.LABEL};
    font-weight: 900;
  }

  .mapcard__location {
    display: flex;
    flex-direction: row;
    height: 60px;
    width: calc(100% - 6%);
    justify-content: space-between;
    margin: 0 ${Spacings.SMALL}px;
  }

  .mapcard__location-meta {
    display: flex;
    flex-direction: column;

    &.t-right {
      text-align: right;
    }
  }

  .mapcard__location-header {
    font-size: ${Spacings.FONT.LABEL};
    color: ${Colors.WHITE};
    .__icon {
      svg {
        path {
          fill: ${Colors.BLUE_BASE};
          stroke: ${Colors.BLUE_BASE};
        }
        width: 20px;
        height: 20px;
      }
    }
  }

  .mapcard__divider {
    /* display: none; */
    flex-direction: row;
    position: relative;
    width: 80%;
    justify-content: center;
    align-items: center;
    margin: 0 10%;
    padding: 16px 0%;
  }

  .mapcard__divider-start {
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background-color: ${Colors.WHITE};
    border: 2px solid ${Colors.BLUE_BASE};
    position: absolute;
    margin-left: -6px;
    margin-top: -6px;
  }
  .mapcard__divider-rule {
    height: 2px;
    width: 100%;
    background-color: ${Colors.BLUE_BASE};
  }
  .mapcard__divider-end {
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background-color: ${Colors.BLUE_BASE};
    border: 2px solid ${Colors.BLUE_BASE};
    position: absolute;
    right: 0;
    margin-left: -6px;
    margin-top: -7px;
  }

  .mapcard__location-place {
    font-weight: 600;
    font-size: ${Spacings.FONT.TINY};
    font-size: ${Spacings.FONT.TINY};
  }

  .mapcard__location-date {
    color: ${Colors.GREY_LIGHT};
    font-size: ${Spacings.FONT.TINY};
  }

  .tripcad__viewdetails {
    padding: 5px 10px;
  }

  .tripcad__deletetrip {
    a {
      color: red;
    }
  }

  .mapcard__footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    font-size: 12px;
    p {
      margin: 0;
      padding: 0;
    }
  }

  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    margin: 55px ${Spacings.MEDIUM}px 0 ${Spacings.SMALL}px;
  }
`
