export const reLocation = (state = "", action) => {
  switch (action.type) {
    case "GET_LOCATION":
      return action.payload;
    default:
      return state;
  }
};

export const acLocation = (payload) => ({ type: "GET_LOCATION", payload });
