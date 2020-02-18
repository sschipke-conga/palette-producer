const allPalettes = (state = [], action) => {
  switch (action.type) {
    case "SET_PALETTES":
      return [...state, ...action.allPalettes];
      case 'REMOVE_PALETTE':
        let updatedPalettes = state.filter(palette => palette.id !== action.id)
        return [...updatedPalettes]
    default:
      return state;
  }
};

export default allPalettes;
