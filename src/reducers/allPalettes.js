const allPalettes = (state = [], action) => {
  switch (action.type) {
    case 'SET_PALETTES':
      return action.allPalettes.reduce((flatPalettes, groupOfPallets) =>{
            groupOfPallets.forEach(palette => flatPalettes.push(palette))
            return flatPalettes
          }, [])
    case 'REMOVE_PALETTE':
      let updatedPalettes = state.filter(palette => palette.id !== action.id)
      return [...updatedPalettes]
    case 'ADD_PALETTE':
      return  [...state, action.palette]
      case 'UPDATE_PALETTE':
        let paletteToUpdate = state.findIndex(palette => palette.id === action.palette.id)
        state[paletteToUpdate] = action.palette
        return [...state]
    default:
      return state;
  }
};

export default allPalettes;
