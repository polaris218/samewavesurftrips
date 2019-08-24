import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const SearchContainer = styled.div`
  padding: 50px 0;
  margin: 0px;
  width: calc(100% - ${Spacings.SMALL}px);
  height: 165px;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 99;

  pointer-events: ${props => (!props.interactive ? 'auto' : 'none')};

  .search__slider {
    height: calc(100% + 50px);
  }

  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    height: 220px;
  }
`

export const SearchContent = styled.div`
  padding: ${Spacings.SMALL}px ${Spacings.SMALL / 2}px;
  width: 100%;
  height: 100%;
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  background-color: ${Colors.GREY_MID};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .inner__content {
    width: 100%;
    max-width: 400px;
    padding: 0;
  }
`

export const Label = styled.div`
  color: ${Colors.BLUE_BASE};
  font-size: ${Spacings.FONT.TINY};
  margin-top: ${Spacings.SMALL}px;
`

export const FilterButton = styled.div`
  margin: 63px 0 0;
  width: calc(100% - ${Spacings.LARGE}px);
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 110px;
  max-width: 405px;
  button {
    margin: 0 4px;
    height: 30px;
    padding: 0 ${Spacings.MEDIUM}px;
    p {
      font-size: ${Spacings.FONT.SMALL};
    }
  }
`

export const DateInput = styled.div`
  width: 100%;
  margin: ${0}px 0 ${Spacings.SMALL}px;
  margin-right: ${Spacings.MEDIUM}px;
  position: relative;

  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker__input-container {
    width: 100%;
    outline: none;
  }
  input {
    width: calc(100%);
    height: 40px;
    margin-top: ${-Spacings.LARGE}px;
    /* margin-right: ${Spacings.MEDIUM}px; */
    padding: 0px ${Spacings.TINY}px;
    font-size: ${Spacings.FONT.BODY};
    color: ${Colors.GREY_BASE};
    outline: none;
    border: 0;
    border-bottom: 1px solid ${Colors.GREY_BASE};
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: transparent;
  }
`

export const ContentContainer = styled.div`
  width: 100%;
  /* overflow-y: scroll; */
  /* overflow-x: hidden; */
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: calc(100% - ${Spacings.SMALL}px);
  max-width: 410px;
`
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  div {
    margin-bottom: 10px !important;
  }
`
export const PlaceInput = styled.div`
  /* margin-right: ${Spacings.SMALL}px; */
  &:first-child { 
    height: 30px !important;
  }
  input {
    margin: 0 0 0 !important;
    height: 30px !important;
    border-top: 1px solid rgba(0, 0, 0, 0.1) !important;
    border-left: 1px solid rgba(0, 0, 0, 0.1) !important;
    border-right: 1px solid rgba(0, 0, 0, 0.1) !important;
  }
`
export const Dates = styled.div`
  position: absolute;
  top: 100px;
`
export const DateIcon = styled.div`
  position: absolute;
  right: 8px;
  top: 14px;
  svg {
    width: 12px;
    height: 12px;
  }
`
