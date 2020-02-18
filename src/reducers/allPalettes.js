const allPalettes = (state = [], action) => {
  switch (action.type) {
    case "SET_PALETTES":
      return [...action.allPalettes];
    default:
      return state;
  }
};

export default allPalettes;
