const isMenuActive = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return !state;
    default:
      return state;
  }
};

export default isMenuActive;
