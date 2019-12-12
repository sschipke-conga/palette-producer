import {createNewUser, loginUser, getUserProjects, getProjectPalettes, savePalette, saveProject, deleteProject, deletePalette, updateProject, updatePalette} from '../util/apiCalls';

describe('createNewUser', () => {
  const mockUser = {
    username: 'Greg',
    password: 'password'
  }
  const mockUserResponse = {
    id: 1,
    username: 'Greg',
    password: 'password'
  }
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUserResponse)
      })
    })
  })
  it('should be called with the correct arguments', () => {
    const expected = ['http://localhost:3001/api/v1/signup', {
      method: 'POST',
      body: JSON.stringify(mockUser),
      headers: {
        'Content-Type': 'application/json'
      }
    }]
    createNewUser(mockUser);
    expect(window.fetch).toHaveBeenCalledWith(...expected)
  })
  it('should return a user with an id (HAPPY)', () => {
    expect(createNewUser(mockUser)).resolves.toEqual(mockUserResponse);
  });
  it('should tell us an username has already been used if the res has a status of 500 (SAD)', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        status: 500
      })
    })
    expect(createNewUser(mockUser)).rejects.toEqual(Error('This username already taken'))
  })
  it('should throw an error if something else goes wrong (SAD)', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    })
    expect(createNewUser(mockUser)).rejects.toEqual(Error('Woops! Something went wrong'))
  })
})

describe('loginUser', () => {
  let mockUserRes = {
    id: 34,
    username: 'Sam'
  }
  let mockUser = {
    username: 'Same',
    password: 'password'
  }

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUserRes)
      })
    })
  });
  it('should be called with the correct arguments', () => {
    const expected = ['http://localhost:3001/api/v1/login', {
      method: 'POST',
      body: JSON.stringify(mockUser),
      headers: {
        'Content-Type': 'application/json'
      }
    }]
    loginUser(mockUser);
    expect(window.fetch).toHaveBeenCalledWith(...expected)
  });
  it('should return a user with an id (HAPPY)', () => {
    expect(loginUser(mockUser)).resolves.toEqual(mockUserRes);
  });
  it('should tell us if the email or password is wrong if the res has a status of 401 (SAD)', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        status: 401
      })
    })
    expect(loginUser(mockUser)).rejects.toEqual(Error('Username or password is incorrect'))
  })
  it('should throw an error if something else goes wrong (SAD)', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    })
    expect(loginUser(mockUser)).rejects.toEqual(Error('Woops! Something went wrong'))
  })
})
describe("getUserProjecsts", () => {
  let mockRes = [{
    user_id: 8,
    id: 34,
    name: 'Project'
  }];

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRes)
      });
    });
  });
  it("should be called with the correct arguments", () => {
    const expected = [
      "http://localhost:3001/api/v1/users/8/projects",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    ];
    getUserProjects(8);
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });
  it("should return some Projects (HAPPY)", () => {
    expect(getUserProjects(8)).resolves.toEqual(mockRes);
  });
  it("should say if no projects are found (SAD)", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        status: 404
      });
    });
    expect(getUserProjects(8)).rejects.toEqual(Error("Projects not found"));
  });
  it("should throw an error if something else goes wrong (SAD)", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      });
    });
    expect(getUserProjects(8)).rejects.toEqual(
      Error("Woops! Something went wrong")
    );
  });
});

describe("getProjectPalettes", () => {
  let mockPalettesRes = {
    id: 34,
    project_id: 7,
    name: "Palette",
    color1: "#FFFFFFF",
    color2: "#FFFFFFF",
    color3: "#FFFFFFF",
    color4: "#FFFFFFF",
    color5: "#FFFFFFF"
  };

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPalettesRes)
      });
    });
  });
  it("should be called with the correct arguments", () => {
    const expected = [
      "http://localhost:3001/api/v1/projects/8/palettes",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    ];
    getProjectPalettes(8);
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });
  it("should return some palettes (HAPPY)", () => {
    expect(getProjectPalettes(8)).resolves.toEqual(mockPalettesRes);
  });
  it("should say if no projects are found (SAD)", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        status: 404
      });
    });
    expect(getProjectPalettes(8)).resolves.toEqual(Error("No palettes found"));
  });
  it("should throw an error if something else goes wrong (SAD)", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      });
    });
    expect(getProjectPalettes(8)).resolves.toEqual(
      Error("Woops! Something went wrong")
    );
  });
});

describe("savePalette", () => {
  let mockPalette = {
    project_id: 7,
    name: "Palette",
    color1: "#FFFFFFF",
    color2: "#FFFFFFF",
    color3: "#FFFFFFF",
    color4: "#FFFFFFF",
    color5: "#FFFFFFF"
  };

  const mockRes = {
    id: 84,
    project_id: 7,
    name: "Palette",
    color1: "#FFFFFFF",
    color2: "#FFFFFFF",
    color3: "#FFFFFFF",
    color4: "#FFFFFFF",
    color5: "#FFFFFFF"
  };

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRes)
      });
    });
  });
  it("should be called with the correct arguments", () => {
    const expected = [
      "http://localhost:3001/api/v1/palettes",
      {
        method: "POST",
        body: JSON.stringify(mockPalette),
        headers: {
          "Content-Type": "application/json"
        }
      }
    ];
    savePalette(mockPalette);
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });
  it("should return a palette with an id (HAPPY)", () => {
    expect(savePalette(mockPalette)).resolves.toEqual(mockRes);
  });
  it("should tell us if the palette was unable to be saved (SAD)", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        status: 422,
        error: 'Cannot process'
      });
    });
    expect(savePalette(mockPalette)).rejects.toEqual(Error ('Cannot process'))
  });
  it("should throw an error if something else goes wrong (SAD)", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      });
    });
    expect(savePalette(mockPalette)).rejects.toEqual(
      Error("Woops! Something went wrong")
    );
  });
});

describe("saveProject", () => {
  let mockProject = {
    name: "Project",
  };

  const mockRes = {
    id: 84,
    name: "Project"
  };

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRes)
      });
    });
  });
  it("should be called with the correct arguments", () => {
    const expected = [
      "http://localhost:3001/api/v1/projects",
      {
        method: "POST",
        body: JSON.stringify(mockProject),
        headers: {
          "Content-Type": "application/json"
        }
      }
    ];
    saveProject(mockProject);
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });
  it("should return a palette with an id (HAPPY)", () => {
    expect(saveProject(mockProject)).resolves.toEqual(mockRes);
  });
  it("should tell us if the project was unable to be saved (SAD)", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        status: 422,
        error: "Cannot process"
      });
    });
    expect(saveProject(mockProject)).rejects.toEqual(Error ("Cannot process"));
  });
  it("should throw an error if something else goes wrong (SAD)", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      });
    });
    expect(saveProject(mockProject)).rejects.toEqual(
      Error("Woops! Something went wrong")
    );
  });
});

describe("deleteProject", () => {
  const mockRes = {
  message: 'Deleted'
  };

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRes)
      });
    });
  });
  it("should be called with the correct arguments", () => {
    const expected = [
      "http://localhost:3001/api/v1/projects/5",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
    ];
    deleteProject(5);
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });
  it("should say a project was deleted (HAPPY)", () => {
    expect(deleteProject(5)).resolves.toEqual(mockRes);
  });
  it("should tell us if the project was unable to be deleted (SAD)", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        status: 404,
        error: "Cannot delete"
      });
    });
    expect(deleteProject(5)).rejects.toEqual(Error ("Cannot delete"));
  });
  it("should throw an error if something else goes wrong (SAD)", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      });
    });
    expect(deleteProject(5)).rejects.toEqual(
      Error("Woops! Something went wrong")
    );
  });
});

describe("deletePalette", () => {
  const mockRes = {
    message: "Deleted"
  };

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRes)
      });
    });
  });
  it("should be called with the correct arguments", () => {
    const expected = [
      "http://localhost:3001/api/v1/palettes/5",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
    ];
    deletePalette(5);
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });
  it("should say a Palette was deleted (HAPPY)", () => {
    expect(deletePalette(5)).resolves.toEqual(mockRes);
  });
  it("should tell us if the Palette was unable to be deleted (SAD)", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        status: 404,
        error: "Cannot delete"
      });
    });
    expect(deletePalette(5)).rejects.toEqual(Error("Cannot delete"));
  });
  it("should throw an error if something else goes wrong (SAD)", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      });
    });
    expect(deletePalette(5)).rejects.toEqual(
      Error("Woops! Something went wrong")
    );
  });
});

describe("updateProject", () => {
  const mockRes = {
    message: "William Updated"
  };

  const mockProject = {
    id: 5,
    name: 'William'
  }

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRes)
      });
    });
  });
  it("should be called with the correct arguments", () => {
    const expected = [
      "http://localhost:3001/api/v1/projects/5",
      {
        method: "PATCH",
        body: JSON.stringify({name: mockProject.name}),
        headers: {
          "Content-Type": "application/json"
        }
      }
    ];
    updateProject(mockProject);
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });
  it("should say a project was updated (HAPPY)", () => {
    expect(updateProject(mockProject)).resolves.toEqual(mockRes);
  });
  it("should tell us if the project was unable to be updated (SAD)", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        status: 422,
        error: "Cannot update"
      });
    });
    expect(updateProject(mockProject)).rejects.toEqual(Error("Cannot update"));
  });
    it("should tell us if the project was unable to be found (SAD)", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          status: 404,
          error: "Cannot find project"
        });
      });
      expect(updateProject(mockProject)).rejects.toEqual(
        Error("Cannot find project")
      );
    });
  it("should throw an error if something else goes wrong (SAD)", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      });
    });
    expect(updateProject(mockProject)).rejects.toEqual(
      Error("Woops! Something went wrong")
    );
  });
});

describe("updatePalette", () => {
  const mockRes = {
    message: "New palette Updated"
  };

  const mockPalette = {
    id: 5,
    project_id: 7,
    name: "WilBooliam",
    color1: "#FFFFFFF",
    color2: "#FFFFFFF",
    color3: "#FFFFFFF",
    color4: "#FFFFFFF",
    color5: "#FFFFFFF"
  };

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRes)
      });
    });
  });
  it("should be called with the correct arguments", () => {
    const expected = [
      "http://localhost:3001/api/v1/palettes/5",
      {
        method: "PUT",
        body: JSON.stringify(mockPalette),
        headers: {
          "Content-Type": "application/json"
        }
      }
    ];
    updatePalette(mockPalette);
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });
  it("should say a Palette was updated (HAPPY)", () => {
    expect(updatePalette(mockPalette)).resolves.toEqual(mockRes);
  });
  it("should tell us if the Palette was unable to be updated (SAD)", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        status: 422,
        error: "Cannot update"
      });
    });
    expect(updatePalette(mockPalette)).rejects.toEqual(Error("Cannot update"));
  });
    it("should tell us if the Palette was not found(SAD)", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          status: 404,
          error: "Cannot find palette"
        });
      });
      expect(updatePalette(mockPalette)).rejects.toEqual(
        Error("Cannot find palette")
      );
    });
  it("should throw an error if something else goes wrong (SAD)", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      });
    });
    expect(updatePalette(mockPalette)).rejects.toEqual(
      Error("Woops! Something went wrong")
    );
  });
});