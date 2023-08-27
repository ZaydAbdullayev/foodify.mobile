export const reModal = (state = false, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return true;
    case "CLOSE_MODAL":
      return false;
    case "TOGGLE_MODAL":
      return !state;
    default:
      return state;
  }
};

export const acOpenMadal = (payload) => ({ type: "OPEN_MODAL", payload });
export const acCloseModal = (payload) => ({ type: "CLOSE_MODAL", payload });
export const acToggleModal = (payload) => ({ type: "TOGGLE_MODAL", payload });
