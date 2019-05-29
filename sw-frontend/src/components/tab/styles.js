import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const Tab = styled.li`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border-top: 1px solid ${Colors.GREY_LIGHT}; */
    background-color: ${Colors.WHITE};
    transition: background-color .55s ease;

    .icon {
        width: 20px;
        height: 20px;
        /* margin-bottom: 8px; */

        svg {
            fill: ${Colors.GREY_BASE};
            transition: transform .25s ease;
        }
    }

    .title {
        padding: 0;
        margin: 0;
        font-size: ${Spacings.FONT.LABEL};
        color: ${Colors.GREY_BASE};
    }

    :hover, :focus, &&.tab-active {
        /* background: ${Colors.GREY_GREEN}; */
        .title {
            color: ${Colors.BLACK}
        }

        svg {
            fill: ${Colors.BLUE_BASE};
            transform: scale(1.1);
        }
    }
`

export const AvatarConatiner = styled.div`
  width: 22px;
  height: 22px;

  img {
    width: 26px;
    height: 26px;
  }
`
