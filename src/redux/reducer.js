const initState = {
  isLoading: true,
};

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

    case "SET_USER_INFORMATION":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };

    case "USER_LOGOUT":
      return {
        ...state,
        user: null,
      };

    case "SET_USER_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
