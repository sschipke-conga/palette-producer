import { generateRandomHex } from '../util/helperFuncs';
const initialState = [
        { name: 'color1',
          hexCode: generateRandomHex(),
          isLocked: false
        },
        { name: 'color2',
          hexCode: generateRandomHex(),
          isLocked: false
        },
        { name: 'color3',
          hexCode: generateRandomHex(),
          isLocked: false
        },
        { name: 'color4',
          hexCode: generateRandomHex(),
          isLocked: false
        },
        { name: 'color5',
          hexCode: generateRandomHex(),
          isLocked: false
        }
      ]

const currentPalette = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PALETTE':
      return [...action.palette];
    default:
      return state;
  }
};

export default currentPalette;
