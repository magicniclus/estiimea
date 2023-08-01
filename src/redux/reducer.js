const initState = {};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_USER_NAME_AND_EMAIL":
      return {
        ...state,
        user: {
          ...state.user,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
        },
      };
    default:
      return state;
  }
};

export default reducer;
