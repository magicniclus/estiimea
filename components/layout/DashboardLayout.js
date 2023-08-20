import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Loader from "../loader/Loader";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/20/solid";
import { logoutUser, observeAuthState } from "../../firebase/auth";
import { getLoggedInUserData } from "../../firebase/dataManager";
import { useSelector, useDispatch } from "react-redux";

//Gestion des classes
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

//Layout pour le dashboard et management des donnés utilisateurs
const DashboardLayout = (props) => {
  const route = useRouter();
  const pathname = usePathname();

  const loadingState = useSelector((state) => state.isLoading);
  const userState = useSelector((state) => state.user);
  const userStateName = useSelector(
    (state) => state.user?.userInformation?.firstName
  );
  const userStateEmail = useSelector(
    (state) => state.user?.userInformation?.email
  );
  const userStateSlug = useSelector(
    (state) => state.user?.settings?.slug || state?.user?.slug
  );
  const photoProfil = useSelector(
    (state) => state.user?.userInformation?.photoProfil
  );
  const dispatch = useDispatch();

  const navigation = [
    {
      name: "Accueil",
      href: `/${userStateSlug}/dashboard`,
      nameOfLink: "/dashboard",
      title: "Ayez une vue d'ensemble de votre activité",
    },
    {
      name: "Personnalisation",
      href: `/${userStateSlug}/dashboard/personnalisation`,
      nameOfLink: "/personnalisation",
      title: "Personnalisez votre page d'estimation",
    },
    {
      name: "Mes Estimations",
      href: `/${userStateSlug}/dashboard/mes-estimations`,
      nameOfLink: "/dashboard/mes-estimations",
      title: "Consultez vos estimations",
    },
    {
      name: "Aide",
      href: `/${userStateSlug}/dashboard/aide`,
      nameOfLink: "/dashboard/aide",
      title: "Besoin d'aide ?",
    },
  ];

  const userNavigation = [
    {
      name: "Profil",
      href: `/${userStateSlug}/dashboard/profil`,
      title: "Profil",
    },
    {
      name: "Parametre",
      href: `/${userStateSlug}/dashboard/settings`,
      title: "Parametres",
    },
    { name: "Deconnexion", href: "#" },
  ];

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

  //Si aucun utilisateur n'est connecté, on le redirige vers la page de connexion
  useEffect(() => {
    observeAuthState((user) => {
      if (user) {
        null;
      } else {
        dispatch({ type: "SET_USER_LOADING", payload: true });
        dispatch({ type: "USER_LOGOUT" });
        route.push("/connexion");
      }
    });
  }, []);

  //Si on clique sur le bouton de déconnexion, on déconnecte l'utilisateur, on supprime ses informations de redux et on le redirige vers la page de connexion
  const logout = () => {
    dispatch({ type: "SET_USER_LOADING", payload: true });
    logoutUser()
      .then(() => {
        dispatch({ type: "USER_LOGOUT" });
        route.push("/connexion");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //Affichage du loader avant le chargement des données
  const LoaderWrapper = () => {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-50 bg-opacity-40 bottom-0">
        <Loader />
      </div>
    );
  };

  if (!userStateSlug) return <LoaderWrapper loading={true} />;

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="border-b border-gray-200 bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <a
                      href={`/${userStateSlug}/dashboard`}
                      className="flex flex-shrink-0 items-center"
                    >
                      <img
                        className="block h-10 w-auto lg:hidden"
                        src="/images/logos/estimmea-logo-primary.png"
                        alt="Estimmea"
                      />
                      <img
                        className="hidden h-10 w-auto lg:block"
                        src="/images/logos/estimmea-logo-primary.png"
                        alt="Estimmea"
                      />
                    </a>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={`${item.href}`}
                          className={classNames(
                            item.nameOfLink === pathname
                              ? "border-blue-500 text-gray-900"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                            "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <button
                      type="button"
                      className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Voir les notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-gray-100">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Ouvrir le menu</span>
                          {photoProfil ? (
                            <img
                              className="h-8 w-8 rounded-full object-cover"
                              src={photoProfil}
                              alt="profil utilisateur"
                            />
                          ) : (
                            <UserIcon
                              className="h-8 w-8 rounded-full text-gray-700"
                              aria-hidden="true"
                            />
                          )}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) =>
                                item.name === "Deconnexion" ? (
                                  <button
                                    onClick={logout}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </button>
                                ) : (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )
                              }
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Ouvrir le menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 pb-3 pt-2">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.href === pathname
                          ? "border-blue-500 bg-indigo-50 text-blue-700"
                          : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
                        "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-200 pb-3 pt-4">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      {photoProfil ? (
                        <img
                          className="h-8 w-8 rounded-full object-cover"
                          src={photoProfil}
                          alt="profil"
                        />
                      ) : (
                        <UserIcon
                          className="h-8 w-8 rounded-full text-gray-700"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {userStateName}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {userStateEmail}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Voir les notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1">
                    {userNavigation.map((item) =>
                      item.name === "Deconnexion" ? (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          onClick={logout}
                          className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ) : (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                        >
                          {item.name}
                        </Disclosure.Button>
                      )
                    )}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl pb-10 px-4 sm:px-6 lg:px-8 border-b-2 border-slate-50">
              <h1 className="text-2xl leading-tight tracking-tight text-gray-700">
                {pathname === `/${userStateSlug}/dashboard/profil`
                  ? "Profile"
                  : pathname === `/${userStateSlug}/dashboard/settings`
                  ? "Parametre"
                  : pathname === `/${userStateSlug}/dashboard/` ||
                    pathname === `/${userStateSlug}/dashboard`
                  ? "Dashboard"
                  : navigation.find((item) => item.href === pathname)?.title ||
                    ""}
              </h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 relative min-h-[calc(100vh-180px)]">
              {loadingState ? <LoaderWrapper loading={loadingState} /> : null}
              {props.children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
