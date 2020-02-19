const allPalettes = (state = [], action) => {
  switch (action.type) {
    case 'SET_PALETTES':
      return [...action.allPalettes];
    case 'REMOVE_PALETTE':
      let updatedPalettes = state.filter(palette => palette.id !== action.id)
      return [...updatedPalettes]
    case 'ADD_PALETTE':
      return [...state, action.palette]  
    default:
      return state;
  }
};

export default allPalettes;
