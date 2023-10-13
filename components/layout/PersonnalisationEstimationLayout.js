import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUserData } from "../../firebase/dataManager";
import { observeAuthState } from "../../firebase/auth";

const PersonnalisationEstimationLayout = (props) => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const containWidth = useSelector((state) => state?.widthEstimationContainer);
  //récuperation des information utilisateur si elles ne sont pas déja dans rédux
  useEffect(() => {
    dispatch({ type: "SET_USER_LOADING", payload: true });
    if (!userState) {
      observeAuthState((user) => {
        if (user) {
          getLoggedInUserData(user.uid)
            .then((userInfo) => {
              dispatch({
                type: "SET_USER_INFORMATION",
                payload: { ...userInfo, uid: user.uid },
              });
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
              dispatch({ type: "SET_USER_LOADING", payload: false });
            });
        }
      });
    } else dispatch({ type: "SET_USER_LOADING", payload: false });
  }, [userState]);
  return (
    <main
      className={`w-full flex justify-center items-center bg-grayPrimary transition-all duration-300 ease-in-out ${
        containWidth === "computer" ? "lg:w-full" : "lg:w-[400px]"
      }`}
    >
      {props.children}
    </main>
  );
};

export default PersonnalisationEstimationLayout;
