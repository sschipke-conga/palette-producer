const currentProjectInfo = (
  state = { name: null, id: null },
  action
) => {
  switch (action.type) {
    case 'SET_CURRENT_PROJECT_INFO':
      return action.info;
    default:
      return state;
  }
};

export default currentProjectInfo;
