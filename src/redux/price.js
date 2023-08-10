export const rePrice = (state = null, action) => {
  switch (action.type) {
    case "TOTAL":
      return action.payload;
    default:
      return state;
  }
};

export const acPrice = (payload) => ({ type: "TOTAL", payload });
