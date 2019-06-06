import styled from 'styled-components'
import { Spacings } from 'config'

export const Dashboard = styled.div`
  width: 100%;
  height: 100%;
  .dashboard__switch {
    position: absolute;
    z-index: 99;
    top: 15px;
    height: 160px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const MapTripDetail = styled.div`
  position: absolute;
  max-width: 450px;
  min-height: 100px;
  padding: 0 0 0 ${Spacings.SMALL}px;
  bottom: 65px;
  left: ${Spacings.SMALL}px;
  width: calc(100% - 140px);
  z-index: 10;

  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    left: auto;
    padding: 0;
    bottom: 20px;
  }
`
export const Padd = styled.div`
  width: calc(100% - ${Spacings.LARGE}px);
  padding: 0 ${Spacings.MEDIUM}px;
  height: 100vh;
`
