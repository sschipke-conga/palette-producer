const selectedPaletteInfo = (state = {name: null, project_id: null, id:null}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PALETTE_INFO':
      return action.info;
    case 'RESET':
      console.log('reset')
      return { name: null, project_id: null, id:null }
    default:
      return state;
  }
};

export default selectedPaletteInfo;
