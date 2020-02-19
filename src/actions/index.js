

export const setUser = user => ({
  type: 'SET_USER',
  user
});

export const setAllProjects = allProjects => ({
  type: 'SET_PROJECTS',
  allProjects
});

export const setCurrentPalette = palette => ({
  type: 'SET_CURRENT_PALETTE',
  palette
});

export const selectPaletteInfo = info => ({
  type: 'SET_CURRENT_PALETTE_INFO',
  info
});

export const selectProjectInfo = info => ({
  type: 'SET_CURRENT_PROJECT_INFO',
  info
});

export const setAllPalettes = allPalettes => ({
  type: 'SET_PALETTES',
  allPalettes
});

export const toggleMenu = () => ({
  type: 'TOGGLE_MENU'
})

export const addPalette = palette => ({
  type: 'ADD_PALETTE',
  palette
});

export const removePalette = (id) => ({
  type: 'REMOVE_PALETTE',
  id: parseInt(id)
});

export const addProject = project => ({
  type: 'ADD_PROJECT',
  project
});

export const removeProject = id => ({
  type: 'REMOVE_PROJECT',
  id
})

export const resetSelectedPalette = () => ({
  type: 'RESET'
})

export const resetSelectedProject = () => ({
  type: 'RESET'
})

export const resetCurrentPalette = () => ({
  type: 'RESET'
})
