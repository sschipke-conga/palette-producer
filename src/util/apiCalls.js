export const createNewUser = async user => {
  let url = `${process.env.REACT_APP_PALETTE_PRODUCER_BACKEND_BASE_URL}/api/v1/signup`;
  let options = {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  };
  let res = await fetch(url, options);
  if (res.status === 500) {
    throw Error("This username already taken");
  }
  if (!res.ok) {
    throw Error("Woops! Something went wrong");
  }
  return res.json();
};

export const loginUser = async user => {
  let url = `${process.env.REACT_APP_PALETTE_PRODUCER_BACKEND_BASE_URL}/api/v1/login`;
  let options = {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  };
  let res = await fetch(url, options);
  if (res.status === 401) {
    throw Error("Username or password is incorrect");
  }
  if (!res.ok) {
    throw Error("Woops! Something went wrong");
  }
  return res.json();
};

export const getUserProjects = async userID => {
  let url = `${process.env.REACT_APP_PALETTE_PRODUCER_BACKEND_BASE_URL}/api/v1/users/${userID}/projects`;
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };
  let res = await fetch(url, options);
  if (res.status === 404) {
    throw Error(res.message);
  }
  if (!res.ok) {
    throw Error("Woops! Something went wrong");
  }
  return res.json();
};

export const getProjectPalettes = async projectID => {
  let url = `${process.env.REACT_APP_PALETTE_PRODUCER_BACKEND_BASE_URL}/api/v1/projects/${projectID}/palettes`;
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };
  let res = await fetch(url, options);
  if (res.status === 404) {
    throw Error(res.message);
  }
  if (!res.ok) {
    throw Error("Woops! Something went wrong");
  }
  return res.json();
};

export const savePalette = async newPalette => {
  console.log(newPalette)
  let url = `${process.env.REACT_APP_PALETTE_PRODUCER_BACKEND_BASE_URL}/api/v1/palettes`;
  let options = {
    method: "POST",
    body: JSON.stringify(newPalette),
    headers: {
      "Content-Type": "application/json"
    }
  };
  let res = await fetch(url, options);
  if (res.status === 422) {
    throw Error(res.error);
  }
  if (!res.ok) {
    throw Error("Woops! Something went wrong");
  }
  console.log(res)
  return res.json();
}

