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
  background-color: ${Colors.BLUE_BASE}99;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, .15);
  position: relative;
  z-index: 10;
  color: ${Colors.WHITE};
  cursor: pointer;
  outline: none;
  /* transform: translateY(200px); */
  &:hover {
    background-color: ${Colors.BLUE_BASE};
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

  .mapcard__count {
    display: flex;
    flex-direction: row;
    font-weight: 600;
    color: ${Colors.WHITE};
    margin-right: ${Spacings.MEDIUM}px;
    .__icon {
      margin-right: ${Spacings.SMALL / 2}px;
      svg {
        path {
          fill: ${Colors.WHITE};
          stroke: ${Colors.WHITE};
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
          fill: ${Colors.WHITE};
          stroke: ${Colors.WHITE};
        }
        width: 20px;
        height: 20px;
      }
    }
  }

  .mapcard__location-place {
    font-weight: 600;
    font-size: ${Spacings.FONT.TINY};
    font-size: ${Spacings.FONT.TINY};
  }

  .mapcard__location-date {
    position: absolute;
    right: ${Spacings.MEDIUM}px;
    color: ${Colors.WHITE};
    margin-top: -2px;
    font-size: ${Spacings.FONT.SMALL};
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
    p {
      margin: 0;
      padding: 0;
    }
  }

  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    margin: 55px ${Spacings.MEDIUM}px 0 ${Spacings.SMALL}px;
  }
`
