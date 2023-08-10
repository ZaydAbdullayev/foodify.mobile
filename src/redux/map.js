export const reLocation = (state = null, action) => {
  switch (action.type) {
    case "CORDINATE":
      return action.payload;
    default:
      return state;
  }
};
