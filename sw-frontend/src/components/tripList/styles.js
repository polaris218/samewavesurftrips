import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const TripList = styled.div`
  padding: ${props => props.paddingTop}px
    ${props => (props.paddingSide ? Spacings.MEDIUM : Spacings.SMALL)}px 60px;
  margin: 0px;
  width: calc(
    100% - ${props => (props.paddingSide ? Spacings.LARGE : Spacings.MEDIUM)}px
  );
  /* overflow-y: scroll; */
  overflow-x: hidden;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .triplist__preloader {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: ${Spacings.LARGE}px 0;
  }
  .triplist__fetch {
    margin: ${Spacings.LARGE}px 0;
  }
  .triplist__icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    width: 100%;
    color: ${Colors.GREY_BASE};
    /* text-transform: uppercase; */
    text-align: center;
    line-height: 1.7rem;
    font-size: ${Spacings.FONT.TITLE};
    svg {
      margin-bottom: ${Spacings.XLARGE}px;
      width: 200px;
      height: 60px;
    }
  }
`

export const PreloadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 100px);
  width: 100%;
  min-height: 400px;
`

export const ListContainer = styled.div`
  width: 100%;
  max-width: 700px;
`
