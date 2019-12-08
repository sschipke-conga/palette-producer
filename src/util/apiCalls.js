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
    throw Error("This email has already been used");
  }

  if (!res.ok) {
    throw Error("Woops! Something went wrong");
  }

  return res.json();
};
