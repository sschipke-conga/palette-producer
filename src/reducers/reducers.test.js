import { mockCurrentPalette } from '../assets/mockData'
import allPalettes from './allPalettes';
import allProjects from './allProjects'
import user from './user'
import currentPalette from './currentPalette'
import menuActive from './menuActive'
import selectedPaletteInfo from './selectedPaletteInfo'
import selectedProjectInfo from './selectedProjectInfo'

describe('allPalettes reducer', () => {
  it('should return the initial state', () => {
    const expected = [];
    const result = allPalettes(undefined, {});
    expect(result).toEqual(expected)
  });
  it('should return state with all the palettes in a single array when "SET_PALETTES" case is hit', () => {
    const mockPalettes = [
      [
        {
          id: 30,
          project_id: 35,
          name: "My Second Palette",
          color1: "#e5349d",
          color2: "#bdaac5",
          color3: "#5a9def",
          color4: "#2705b2",
          color5: "#309a6e",
          created_at: "2020-01-21T19:09:20.992Z",
          updated_at: "2020-01-21T19:09:20.992Z",
        },
        {
          id: 33,
          project_id: 35,
          name: "New one now",
          color1: "#f36d6b",
          color2: "#72cc20",
          color3: "#f11a21",
          color4: "#8eb4e8",
          color5: "#b08980",
          created_at: "2020-02-15T00:06:46.617Z",
          updated_at: "2020-02-15T00:06:46.617Z",
        },
        {
          id: 40,
          project_id: 35,
          name: "This time it should work",
          color1: "#57101d",
          color2: "#324086",
          color3: "#5a789c",
          color4: "#959191",
          color5: "#18a647",
          created_at: "2020-02-19T03:52:55.467Z",
          updated_at: "2020-02-19T03:52:55.467Z",
        }
      ],
      [
        {
          id: 45,
          project_id: 37,
          name: "My Second Palette",
          color1: "#e5349d",
          color2: "#bdaac5",
          color3: "#5a9def",
          color4: "#2705b2",
          color5: "#309a6e",
          created_at: "2020-01-21T19:09:20.992Z",
          updated_at: "2020-01-21T19:09:20.992Z"
        },
        {
          id: 43,
          project_id: 37,
          name: "This time it should work",
          color1: "#57101d",
          color2: "#324086",
          color3: "#5a789c",
          color4: "#959191",
          color5: "#18a647",
          created_at: "2020-02-19T03:52:55.467Z",
          updated_at: "2020-02-19T03:52:55.467Z"
        }
      ]
    ]
    const flatState = [
        {
          id: 30,
          project_id: 35,
          name: "My Second Palette",
          color1: "#e5349d",
          color2: "#bdaac5",
          color3: "#5a9def",
          color4: "#2705b2",
          color5: "#309a6e",
          created_at: "2020-01-21T19:09:20.992Z",
          updated_at: "2020-01-21T19:09:20.992Z",
        },
        {
          id: 33,
          project_id: 35,
          name: "New one now",
          color1: "#f36d6b",
          color2: "#72cc20",
          color3: "#f11a21",
          color4: "#8eb4e8",
          color5: "#b08980",
          created_at: "2020-02-15T00:06:46.617Z",
          updated_at: "2020-02-15T00:06:46.617Z",
        },
        {
          id: 40,
          project_id: 35,
          name: "This time it should work",
          color1: "#57101d",
          color2: "#324086",
          color3: "#5a789c",
          color4: "#959191",
          color5: "#18a647",
          created_at: "2020-02-19T03:52:55.467Z",
          updated_at: "2020-02-19T03:52:55.467Z",
        },
        {
          id: 45,
          project_id: 37,
          name: "My Second Palette",
          color1: "#e5349d",
          color2: "#bdaac5",
          color3: "#5a9def",
          color4: "#2705b2",
          color5: "#309a6e",
          created_at: "2020-01-21T19:09:20.992Z",
          updated_at: "2020-01-21T19:09:20.992Z"
        },
        {
          id: 43,
          project_id: 37,
          name: "This time it should work",
          color1: "#57101d",
          color2: "#324086",
          color3: "#5a789c",
          color4: "#959191",
          color5: "#18a647",
          created_at: "2020-02-19T03:52:55.467Z",
          updated_at: "2020-02-19T03:52:55.467Z"
        }
    ]
    let mockAction = {
      type: 'SET_PALETTES',
      allPalettes: mockPalettes
    }
    const result = allPalettes([], mockAction);
    expect(result).toEqual(flatState)
  })
  it('should add a palette to state state when "ADD_PALETTE" case is hit', () => {
    const mockPalettes = [
      {
        id: 30,
        project_id: 35,
        name: "My Second Palette",
        color1: "#e5349d",
        color2: "#bdaac5",
        color3: "#5a9def",
        color4: "#2705b2",
        color5: "#309a6e",
        created_at: "2020-01-21T19:09:20.992Z",
        updated_at: "2020-01-21T19:09:20.992Z",
      },
      {
        id: 33,
        project_id: 35,
        name: "New one now",
        color1: "#f36d6b",
        color2: "#72cc20",
        color3: "#f11a21",
        color4: "#8eb4e8",
        color5: "#b08980",
        created_at: "2020-02-15T00:06:46.617Z",
        updated_at: "2020-02-15T00:06:46.617Z",
      },
      {
        id: 40,
        project_id: 35,
        name: "This time it should work",
        color1: "#57101d",
        color2: "#324086",
        color3: "#5a789c",
        color4: "#959191",
        color5: "#18a647",
        created_at: "2020-02-19T03:52:55.467Z",
        updated_at: "2020-02-19T03:52:55.467Z",
      },
      {
        id: 45,
        project_id: 37,
        name: "My Second Palette",
        color1: "#e5349d",
        color2: "#bdaac5",
        color3: "#5a9def",
        color4: "#2705b2",
        color5: "#309a6e",
        created_at: "2020-01-21T19:09:20.992Z",
        updated_at: "2020-01-21T19:09:20.992Z"
      }
    ]
    const newPalette = {
      id: 50,
      project_id: 37,
      name: "New Palette",
      color1: "#e5349d",
      color2: "#bdaac5",
      color3: "#5a9def",
      color4: "#2705b2",
      color5: "#309a6e",
      created_at: "2020-01-21T19:09:20.992Z",
      updated_at: "2020-01-21T19:09:20.992Z"
    }
    let mockAction = {
      type: 'ADD_PALETTE',
      palette: newPalette
    }
    const result = allPalettes(mockPalettes, mockAction);
    expect(result).toEqual([...mockPalettes, newPalette])
  })
  it('should remove a palette from state, using its id when the "REMOVE_PALETTE" case is hit', () => {
    const mockState = [
      {
        id: 30,
        project_id: 35,
        name: "My Second Palette",
        color1: "#e5349d",
        color2: "#bdaac5",
        color3: "#5a9def",
        color4: "#2705b2",
        color5: "#309a6e",
        created_at: "2020-01-21T19:09:20.992Z",
        updated_at: "2020-01-21T19:09:20.992Z",
      },
      {
        id: 33,
        project_id: 35,
        name: "New one now",
        color1: "#f36d6b",
        color2: "#72cc20",
        color3: "#f11a21",
        color4: "#8eb4e8",
        color5: "#b08980",
        created_at: "2020-02-15T00:06:46.617Z",
        updated_at: "2020-02-15T00:06:46.617Z",
      },
      {
        id: 40,
        project_id: 35,
        name: "This time it should work",
        color1: "#57101d",
        color2: "#324086",
        color3: "#5a789c",
        color4: "#959191",
        color5: "#18a647",
        created_at: "2020-02-19T03:52:55.467Z",
        updated_at: "2020-02-19T03:52:55.467Z",
      }
    ]

    const expected = [
      {
        id: 30,
        project_id: 35,
        name: "My Second Palette",
        color1: "#e5349d",
        color2: "#bdaac5",
        color3: "#5a9def",
        color4: "#2705b2",
        color5: "#309a6e",
        created_at: "2020-01-21T19:09:20.992Z",
        updated_at: "2020-01-21T19:09:20.992Z",
      },
      {
        id: 40,
        project_id: 35,
        name: "This time it should work",
        color1: "#57101d",
        color2: "#324086",
        color3: "#5a789c",
        color4: "#959191",
        color5: "#18a647",
        created_at: "2020-02-19T03:52:55.467Z",
        updated_at: "2020-02-19T03:52:55.467Z",
      }
    ]
    const mockAction = {
      type: 'REMOVE_PALETTE',
      id: 33
    }
    const result = allPalettes(mockState, mockAction);
    expect(result).toEqual(expected)
  })
});

describe('allProjects reducer', () => {
  it('should return the initial state', () => {
    const expected = [];
    const result = allPalettes(undefined, {});
    expect(result).toEqual(expected)
  });
  it('should return state with all the projects "SET_PROJECTS" case is hit', () => {
    const mockProjects = [
        {
          id: 30,
          name: "My First Project",
        },
        {
          id: 33,
          name: "Second Projects",
        },
        {
          id: 40,
          name: "Third Project"
        }
    ]
    let mockAction = {
      type: 'SET_PROJECTS',
      allProjects: mockProjects
    }
    const result = allProjects([], mockAction);
    expect(result).toEqual(mockProjects)
  })
  it('should add a Project to state state when "ADD_PALETTE" case is hit', () => {
    const mockProjects = [
      {
        id: 30,
        name: "My First Project",
      },
      {
        id: 33,
        name: "Second Projects",
      },
      {
        id: 40,
        name: "Third Project"
      }
    ]
    const projectToAdd = {
      id: 50,
      name: "New Palette"
    }
    let mockAction = {
      type: 'ADD_PROJECT',
      project: projectToAdd
    }
    const result = allProjects(mockProjects, mockAction);
    expect(result).toEqual([...mockProjects, projectToAdd])
  })
  it('should remove a palette from state, using its id when the "REMOVE_PALETTE" case is hit', () => {
    const mockState = [
      {
        id: 30,
        project_id: 35,
        name: "My Second Palette",
        color1: "#e5349d",
        color2: "#bdaac5",
        color3: "#5a9def",
        color4: "#2705b2",
        color5: "#309a6e",
        created_at: "2020-01-21T19:09:20.992Z",
        updated_at: "2020-01-21T19:09:20.992Z",
      },
      {
        id: 33,
        project_id: 35,
        name: "New one now",
        color1: "#f36d6b",
        color2: "#72cc20",
        color3: "#f11a21",
        color4: "#8eb4e8",
        color5: "#b08980",
        created_at: "2020-02-15T00:06:46.617Z",
        updated_at: "2020-02-15T00:06:46.617Z",
      },
      {
        id: 40,
        project_id: 35,
        name: "This time it should work",
        color1: "#57101d",
        color2: "#324086",
        color3: "#5a789c",
        color4: "#959191",
        color5: "#18a647",
        created_at: "2020-02-19T03:52:55.467Z",
        updated_at: "2020-02-19T03:52:55.467Z",
      }
    ]

    const expected = [
      {
        id: 30,
        project_id: 35,
        name: "My Second Palette",
        color1: "#e5349d",
        color2: "#bdaac5",
        color3: "#5a9def",
        color4: "#2705b2",
        color5: "#309a6e",
        created_at: "2020-01-21T19:09:20.992Z",
        updated_at: "2020-01-21T19:09:20.992Z",
      },
      {
        id: 40,
        project_id: 35,
        name: "This time it should work",
        color1: "#57101d",
        color2: "#324086",
        color3: "#5a789c",
        color4: "#959191",
        color5: "#18a647",
        created_at: "2020-02-19T03:52:55.467Z",
        updated_at: "2020-02-19T03:52:55.467Z",
      }
    ]
    const mockAction = {
      type: 'REMOVE_PALETTE',
      id: 33
    }
    const result = allPalettes(mockState, mockAction);
    expect(result).toEqual(expected)
  })
});

describe('user', () => {
  const mockUser = {
    username: 'Shanda',
    id: 4
  }
  it('should return null for the default state', () => {
    const result = user(undefined, {});
    expect(result).toEqual(null)
  });
  it('should return a user object when the SET_USER case is hit', () => {
    const mockAction = {
      type: 'SET_USER',
      user: mockUser
    }
    const result = user(undefined, mockAction);
    expect(result).toEqual(mockUser)
  })
  it('should reset the state when the "CLEAR_USER" case is hit', () => {
    const mockAction = {
      type: 'CLEAR_USER',
    }
    const result = user(mockUser, mockAction);
    expect(result).toEqual(null)
  })
})

describe('currentPalette', () => {
  it('should return a randomly generate palette for the initialState',() => {
    const result=currentPalette(undefined, {})
    expect(result.length).toEqual(5)
  })
  it('should set the current palette to state when the SET_CURRENT_PALETTE case is hit', () => {
    const mockAction= {
      type: 'SET_CURRENT_PALETTE',
      palette: mockCurrentPalette
    }
    const result = currentPalette(null, mockAction)
    expect(result).toEqual(mockCurrentPalette)
  })
  it('should reset the state to the initial state when the RESET case is hit', () => {
    const mockAction = {
      type: 'SET_CURRENT_PALETTE',
      palette: mockCurrentPalette
    }
    expect(currentPalette(null, {})).toEqual(null)
    const result = currentPalette(null, mockAction)
    expect(result).toEqual(mockCurrentPalette)
  })
})

describe('menuActive', () => {
  it('should return false for the default state', () => {
    const result = menuActive(undefined, {});
    expect(result).toEqual(false)
  });
  it('should toggle the state when the TOGGLE_MENU case is hit', () => {
    expect(menuActive(undefined, {})).toBe(false)
    const mockAction = {
      type: 'TOGGLE_MENU',
    }
    const result = menuActive(false, mockAction)
    expect(result).toBe(true)
  })
})

describe('selectedPaletteInfo', () => {
  it('should return the initial state', () => {
    const expected = {name: null, project_id: null, id:  null};
    const result = selectedPaletteInfo(undefined, {});
    expect(result).toEqual(expected)
  });
  it('should set the current palette info to state when the SET_CURRENT_PALETTE_INFO case is hit', () => {
    const mockAction = {
      type: 'SET_CURRENT_PALETTE_INFO',
      info: {name: 'Cecily', id: 4, project_id: 12}
    }
    const result = selectedPaletteInfo(undefined, mockAction)
    expect(result).toEqual(mockAction.info)
  })
  it('should reset the state when the RESET case is hit', () => {
    const expected = { name: null, project_id: null, id: null };
    const mockInfo = { name: 'Cecily', id: 4, project_id: 12 }
    const mockAction = {
      type: 'RESET',
    }
    expect(selectedPaletteInfo(mockInfo, {})).toEqual(mockInfo)
    const result = selectedPaletteInfo(mockInfo, mockAction)
    expect(result).toEqual(expected)
  })
})

describe('selectedProjectInfo', () => {
  it('should return the initial state', () => {
    const expected = { name: null, id: null };
    const result = selectedProjectInfo(undefined, {});
    expect(result).toEqual(expected)
  });
  it('should set the current project info to state when the SET_CURRENT_PROJECT_INFO case is hit', () => {
    const mockAction = {
      type: 'SET_CURRENT_PROJECT_INFO',
      info: { name: 'Living Room', id: 4 }
    }
    const result = selectedProjectInfo(undefined, mockAction)
    expect(result).toEqual(mockAction.info)
  })
  it('should reset the state when the RESET case is hit', () => {
    const expected = { name: null, id: null };
    const mockInfo = { name: 'Living Room', id: 4 }
    const mockAction = {
      type: 'RESET',
    }
    expect(selectedProjectInfo(mockInfo, {})).toEqual(mockInfo)
    const result = selectedProjectInfo(mockInfo, mockAction)
    expect(result).toEqual(expected)
  })
})

