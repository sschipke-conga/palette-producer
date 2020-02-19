const allProjects = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return [...action.allProjects];
    case 'ADD_PROJECT':
      return [...state, action.project];
    case 'REMOVE_PROJECT':
      let updatedProjects = state.filter(palette => palette.id !== action.id);
      return [...updatedProjects];
    default:
      return state;
  }
};

export default allProjects;
