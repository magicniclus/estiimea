import React from "react";
import { useRouter } from "next/router";
import {
  findUserIdBySlug,
  getLoggedInUserData,
} from "../../firebase/dataManager";
import DashboardLayout from "../../components/layout/DashboardLayout";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserPage = ({ userData }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Chargement...</div>;
  }
  return (
    <main>
      <h1>Hello ESTIMMEA</h1>
    </main>
  );
};

export async function getServerSideProps(context) {
  const slug = context.params.slug;
  const uid = await findUserIdBySlug(slug);
  const userData = await getLoggedInUserData(uid);

  if (!userData || userData.settings.slug !== slug) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      userData: userData,
    },
  };
}

export default UserPage;
