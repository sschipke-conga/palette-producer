const selectedProjectInfo = (
  state = { name: null, id: null },
  action
) => {
  switch (action.type) {
    case 'SET_CURRENT_PROJECT_INFO':
      return action.info;
    case 'RESET':
      return {name: null, id: null}
    default:
      return state;
  }
};

export default selectedProjectInfo;
