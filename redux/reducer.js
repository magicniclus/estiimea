const initState = {
  isLoading: true,
  isFirstView: true,
  mapIsLoading: true,
  userIsLoading: true,
  clientInfomation: {},
  simulateurStep: 14,
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

    case "UPDATE_USER_DATA":
      const updatedUser = {
        ...state.user,
        ...payload, // cela écrasera ou ajoutera de nouvelles clés directement à l'objet `user`
      };

      if (payload.setting) {
        updatedUser.setting = {
          ...state.user.setting,
          ...payload.setting,
        };
      }

      if (payload.userInformation) {
        updatedUser.userInformation = {
          ...state.user.userInformation,
          ...payload.userInformation,
        };
      }

      if (payload.plan) {
        updatedUser.plan = {
          ...state.user.plan,
          ...payload.plan,
        };
      }

      // Si vous avez d'autres sous-dossiers à vérifier et à mettre à jour, ajoutez-les de manière similaire à ce qui précède.

      return {
        ...state,
        user: updatedUser,
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

    case "UPDATE_SETTINGS":
      const updatedSettings = Object.assign(
        {},
        state.user.settings,
        action.payload
      );
      return {
        ...state,
        user: {
          ...state.user,
          settings: updatedSettings,
        },
      };

    case "UPDATE_FONT_COLOR":
      return {
        ...state,
        user: {
          ...state.user,
          settings: {
            ...state.user.settings,
            fontColor: action.payload.fontColor,
          },
        },
      };

    case "UPDATE_FONT_COLOR2":
      return {
        ...state,
        user: {
          ...state.user,
          settings: {
            ...state.user.settings,
            fontColor2: action.payload.fontColor2,
          },
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
