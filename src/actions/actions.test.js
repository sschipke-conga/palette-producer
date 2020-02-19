import {
  setUser,
  setAllProjects,
  setAllPalettes,
  setCurrentPalette,
  selectPaletteInfo,
  selectProjectInfo,
  toggleMenu,
  addPalette,
  removePalette,
  addProject,
  removeProject,
  resetCurrentPalette,
  resetSelectedPalette,
  resetSelectedProject,
} from './index.js';

describe('action creators', () => {
  it('setUser should return the correct object', () => {
    const user = {username: 'William', id: 22};
    const expected = ({
      type: 'SET_USER',
      user
    });
    const results = setUser(user);

    expect(results).toEqual(expected);
  });

  it('setAllProjects should return the correct object', () => {
    const allProjects = [
      {
        name: 'Test Project 1', id: 33
      },
      {
        name: 'Test Project 2', id: 34
      }
    ];
    const expected = ({
      type: 'SET_PROJECTS',
      allProjects
    });
    const results = setAllProjects(allProjects);

    expect(results).toEqual(expected);
  });

  it('setAllPalettes should return the correct object', () => {
    const allPalettes = [
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
    const expected = ({
      type: 'SET_PALETTES',
      allPalettes
    });
    const results = setAllPalettes(allPalettes);

    expect(results).toEqual(expected);
  });

  it('setCurrentPalette should return the correct object', () => {
    const palette = [
      {
        name: 'color1',
        hexCode: '#FFFFFF',
        isLocked: false
      },
      {
        name: 'color2',
        hexCode: '#FFFFFF',
        isLocked: false
      },
      {
        name: 'color3',
        hexCode: '#FFFFFF',
        isLocked: false
      },
      {
        name: 'color4',
        hexCode: '#FFFFFF',
        isLocked: false
      },
      {
        name: 'color5',
        hexCode: '#FFFFFF',
        isLocked: false
      }
    ];
    const expected = ({
      type: 'SET_CURRENT_PALETTE',
      palette
    });
    const results = setCurrentPalette(palette);

    expect(results).toEqual(expected);
  });

  it('addPalette should return the correct object', () => {
    const palette =
    {
      id: 30,
      project_id: 35,
      name: "My Second Palette",
      color1: "#e5349d",
      color2: "#bdaac5",
      color3: "#5a9def",
      color4: "#2705b2",
      color5: "#309a6e",
    }
    const expected = ({
      type: 'ADD_PALETTE',
      palette
    });
    const results = addPalette(palette);

    expect(results).toEqual(expected);
  });

  it('removePalette should return the correct object', () => {
    const id = 22
    const expected = ({
      type: 'REMOVE_PALETTE',
      id
    });
    const results = removePalette(id);

    expect(results).toEqual(expected);
  });

  it('addProject should return the correct object', () => {
    const project = {id: 44, name: 'Cistine'}
    const expected = ({
      type: 'ADD_PROJECT',
      project
    });
    const results = addProject(project);

    expect(results).toEqual(expected);
  });

  it('removeProject should return the correct object', () => {
    const id = 33
    const expected = ({
      type: 'REMOVE_PROJECT',
      id
    });
    const results = removeProject(id);

    expect(results).toEqual(expected);
  });

  it('selectPaletteInfo should return the correct object', () => {
    const paletteInfo = {
      name: 'Palette name', id: 45, project_id: 22
    };
    const expected = ({
      type: 'SET_CURRENT_PALETTE_INFO',
      info: paletteInfo
    });
    const results = selectPaletteInfo(paletteInfo);

    expect(results).toEqual(expected);
  });

  it('selectProjectInfo should return the correct object', () => {
    const projectInfo = {
      name: 'Project name', id: 45
    };
    const expected = ({
      type: 'SET_CURRENT_PROJECT_INFO',
      info: projectInfo
    });
    const results = selectProjectInfo(projectInfo);

    expect(results).toEqual(expected);
  });

  it('toggleMenu should return the correct object', () => {
    const expected = ({
      type: 'TOGGLE_MENU',
    });
    const results = toggleMenu();

    expect(results).toEqual(expected);
  });

  it('resetCurrentPalette should return the correct object', () => {
    const expected = ({
      type: 'RESET',
    });
    const results = resetCurrentPalette();

    expect(results).toEqual(expected);
  });

  it('resetSelectedPalette should return the correct object', () => {
    const expected = ({
      type: 'RESET',
    });
    const results = resetSelectedPalette();

    expect(results).toEqual(expected);
  });

  it('resetSelectedProject should return the correct object', () => {
    const expected = ({
      type: 'RESET',
    });
    const results = resetSelectedProject();

    expect(results).toEqual(expected);
  });


})