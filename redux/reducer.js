const initState = {
  isLoading: true,
  isFirstView: true,
  mapIsLoading: true,
  userIsLoading: true,
  clientInfomation: {},
  simulateurStep: 12,
  stepInProgress: 2,
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

    case "SET_CLIENT_INFORMATION":
      return {
        ...state,
        clientInfomation: {
          ...state.clientInfomation,
          ...action.payload,
        },
      };

    case "MAP_IS_LOADING":
      return {
        ...state,
        mapIsLoading: action.payload,
      };

    case "USER_IS_LOADING":
      return {
        ...state,
        userIsLoading: action.payload,
      };

    case "SET_SIMULATEUR_STEP":
      return {
        ...state,
        stepInProgress: action.payload,
      };

    case "UPDATE_SIMULATEUR_STEP":
      return {
        ...state,
        stepInProgress: state.stepInProgress + 1,
      };

    case "DOWN_SIMULATEUR_STEP":
      return {
        ...state,
        stepInProgress: state.stepInProgress - 1,
      };

    default:
      return state;
  }
};

export default reducer;
