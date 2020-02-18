const allProjects = (state = [], action) => {
  switch (action.type) {
    case "SET_PROJECTS":
      return [...action.allProjects];
    default:
      return state;
  }
};

export default allProjects;
