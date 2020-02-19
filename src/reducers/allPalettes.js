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
      console.log('in reducer',action.palette)
      return  [...state, action.palette]
    default:
      return state;
  }
};

export default allPalettes;
