export const reCardUpdate = (state = false, action) => {
  switch (action.type) {
    case "UPDATE_CARD":
      return !state;
    case "TRUE":
      return !state;
    default:
      return state;
  }
};

export const acUpdateCard = (payload) => ({ type: "UPDATE_CARD", payload });
export const acUpdate = (payload) => ({ type: "TRUE", payload });
