

export const setUser = user => ({
  type: 'Set_USER',
  user
});

export const setCurrentPalette = palette => ({
  type: 'SET_CURRENT_PALETTE',
  palette
});

export const setAllPalettes = allPalettes => ({
  type: 'SET_PLETTES',
  allPalettes
});
