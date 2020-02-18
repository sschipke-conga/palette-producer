

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

export const setAllPalettes = allPalettes => ({
  type: 'SET_PALETTES',
  allPalettes
});

export const toggleMenu = () => ({
  type: 'TOGGLE_MENU'
})