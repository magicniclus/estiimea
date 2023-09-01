import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataBySlug } from "../../firebase/dataManager";
import { useRouter } from "next/router";

const EstimationLayout = (props) => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  // Utilisez useRouter pour obtenir le slug
  const router = useRouter();
  const slug = router.query.slug;

  //récuperation des information utilisateur si elles ne sont pas déja dans rédux
  useEffect(() => {
    dispatch({ type: "SET_USER_LOADING", payload: true });
    console.log(slug);
    if (!userState) {
      getUserDataBySlug(slug) // Assurez-vous que 'slug' est accessible
        .then((userInfo) => {
          if (userInfo) {
            dispatch({
              type: "SET_USER_INFORMATION",
              payload: userInfo,
            });
          } else {
            // Vous pouvez gérer le cas où l'utilisateur n'existe pas ici
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          dispatch({ type: "SET_USER_LOADING", payload: false });
        });
    } else dispatch({ type: "SET_USER_LOADING", payload: false });
  }, [slug, userState]); // Assurez-vous que 'slug' est une dépendance

  return (
    <main className="w-full min-h-screen flex justify-center items-center bg-grayPrimary">
      {props.children}
    </main>
  );
};

export default EstimationLayout;
