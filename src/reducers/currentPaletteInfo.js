const currentPaletteInfo = (state = {name: null, project_id: null}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PALETTE_INFO':
      return action.info;
    default:
      return state;
  }
};

export default currentPaletteInfo;
