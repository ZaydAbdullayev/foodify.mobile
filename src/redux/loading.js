export const reLoading = (state = false, action) => {
  switch (action.type) {
    case "LOAD":
      return action.payload;
    default:
      return state;
  }
};

export const acLoading = (payload) => ({ type: "LOAD", payload });
