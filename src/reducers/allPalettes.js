const allPalettes = (state = [], action) => {
  switch (action.type) {
    case "SET_PALETTES":
      console.log('palettes reduce', action)
      return [...state, ...action.allPalettes];
    default:
      return state;
  }
};

export default allPalettes;
