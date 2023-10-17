import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../../components/layout/DashboardLayout";
import Tables from "../../../../components/ui/Tables";
import { useSelector } from "react-redux";
import SearchBar from "../../../../components/ui/SearchBar";

const Index = () => {
  const userState = useSelector((state) => state.user);
  const [estimations, setEstimations] = useState([]);
  const [initialEstimations, setInitialEstimations] = useState([]);

  // Mise à jour des estimations lorsqu'elles sont disponibles dans userState
  useEffect(() => {
    if (userState?.estimations && !initialEstimations.length) {
      setEstimations([...userState.estimations]);
      setInitialEstimations([...userState.estimations]);
    }
  }, [userState]); // Ajout de userState.estimations comme dépendance

  const handleFilter = (filterValue) => {
    if (!filterValue.trim()) {
      setEstimations(initialEstimations);
      return;
    }

    const filteredData = initialEstimations.filter(
      (item) =>
        item.firstName.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.lastName.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.adresse.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.type.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.date.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.email.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.phone.includes(filterValue)
    );

    setEstimations(filteredData);
  };

  return (
    <DashboardLayout>
      <div className="w-full flex justify-center mt-5">
        <SearchBar onFilter={handleFilter} />
      </div>
      <Tables data={estimations} />
    </DashboardLayout>
  );
};

export default Index;
