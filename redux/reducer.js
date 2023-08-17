const initState = {
  isLoading: true,
  isFirstView: true,
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
          slug: action.payload.slug,
        },
      };

    case "RESET_USER":
      return {
        ...state,
        user: null,
      };

    case "SET_USER_INFORMATION":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };

    case "UPDATE_USER_INFORMATION":
      const updatedUserInformation = Object.assign(
        {},
        state.user.userInformation,
        action.payload
      );
      return {
        ...state,
        user: {
          ...state.user,
          userInformation: updatedUserInformation,
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
