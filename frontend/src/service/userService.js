export const getName = () => {
  const username = localStorage.getItem("username");
  if (username && username !== undefined) return username;
  return false;
};

export const setName = (username) => {
  localStorage.setItem("username", username);
  return username;
};
