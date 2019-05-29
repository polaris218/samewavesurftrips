/* eslint-disable default-case */
import { General as config } from 'config'

export const PickIcon = icon => {
  switch (icon) {
    case 'Goofy':
      return `${config.Root}/images/stance/Goofy.svg`
    case 'Regular':
      return `${config.Root}/images/stance/Regular.svg`
    case 'Shortboard':
      return `${config.Root}/images/board/Short_board.svg`
    case 'Longboard':
      return `${config.Root}/images/board/Long_board.svg`
    case 'Kneeboard':
      return `${config.Root}/images/board/Knee_board.svg`
    case 'Bodyboard':
      return `${config.Root}/images/board/Body_board.svg`
    case 'Stand Up':
      return `${config.Root}/images/board/SUP.svg`
    case 'Wind Surf':
      return `${config.Root}/images/board/Wind_surf.svg`
    case 'Kite Surf':
      return `${config.Root}/images/board/Kite_surf.svg`
    case 'Beginner':
      return `${config.Root}/images/level/Beginner.svg`
    case 'Pre-Intemediate':
      return `${config.Root}/images/level/Pre_intermediate.svg`
    case 'Intemediate':
      return `${config.Root}/images/level/Intermediate.svg`
    case 'Upper-Intemediate':
      return `${config.Root}/images/level/Upper_intermediate.svg`
    case 'Advanced':
      return `${config.Root}/images/level/Advanced.svg`
  }
}
