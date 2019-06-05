/* eslint-disable default-case */
import { General as config } from 'config'

export const PickIcon = icon => {
  switch (icon) {
    case 'goofy':
      return `${config.Root}/images/stance/Goofy.svg`
    case 'regular':
      return `${config.Root}/images/stance/Regular.svg`
    case 'shortboard':
      return `${config.Root}/images/board/Short_board.svg`
    case 'longboard':
      return `${config.Root}/images/board/Long_board.svg`
    case 'kneeboard':
      return `${config.Root}/images/board/Knee_board.svg`
    case 'bodyboard':
      return `${config.Root}/images/board/Body_board.svg`
    case 'stand up':
      return `${config.Root}/images/board/SUP.svg`
    case 'wind surf':
      return `${config.Root}/images/board/Wind_surf.svg`
    case 'kite surf':
      return `${config.Root}/images/board/Kite_surf.svg`
    case 'beginner':
      return `${config.Root}/images/level/Beginner.svg`
    case 'pre-intemediate':
      return `${config.Root}/images/level/Pre_intermediate.svg`
    case 'intemediate':
      return `${config.Root}/images/level/Intermediate.svg`
    case 'upper-intemediate':
      return `${config.Root}/images/level/Upper_intermediate.svg`
    case 'advanced':
      return `${config.Root}/images/level/Advanced.svg`
    case 'pro':
      return `${config.Root}/images/level/Advanced.svg`
    case 'any':
      return `${config.Root}/images/level/Beginner.svg`
  }
}
