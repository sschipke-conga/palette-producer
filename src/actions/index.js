

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

export const setCurrentPaletteInfo = info => ({
  type: 'SET_CURRENT_PALETTE_INFO',
  info
});

export const setCurrentProjectInfo = info => ({
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

export const removePalette = (id) => ({
  type: 'REMOVE_PALETTE',
  id: parseInt(id)
});