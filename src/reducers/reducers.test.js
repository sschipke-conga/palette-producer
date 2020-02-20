import allPalettes from './allPalettes';
import allProjects from './allProjects'
import user from './user'

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

