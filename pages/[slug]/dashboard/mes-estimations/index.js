import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../../components/layout/DashboardLayout";
import Tables from "../../../../components/ui/Tables";
import { useSelector } from "react-redux";
import SearchBar from "../../../../components/ui/SearchBar";

const Index = () => {
  const userState = useSelector((state) => state.user);
  const [estimations, setEstimations] = useState([]);
  const [initialEstimations, setInitialEstimations] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [sortConfig, setSortConfig] = useState({
    column: null,
    direction: "asc",
  });

  useEffect(() => {
    if (userState?.estimations && !initialEstimations.length) {
      setInitialEstimations([...userState.estimations]);
    }
  }, [userState]);

  useEffect(() => {
    let sortedAndFilteredData = [...initialEstimations];

    // Filtre
    if (filterValue.trim()) {
      sortedAndFilteredData = sortedAndFilteredData.filter(
        (item) =>
          item.firstName.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.lastName.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.adresse.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.type.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.date.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.email.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.phone.includes(filterValue)
      );
    }

    // Tri
    if (sortConfig.column) {
      sortedAndFilteredData.sort((a, b) => {
        // Votre logique de tri ici basée sur sortConfig.column
        // Pour l'instant, je vais supposer une logique simple de tri par chaîne de caractères:
        if (a[sortConfig.column] > b[sortConfig.column]) return 1;
        if (a[sortConfig.column] < b[sortConfig.column]) return -1;
        return 0;
      });

      if (sortConfig.direction === "desc") {
        sortedAndFilteredData.reverse();
      }
    }

    setEstimations(sortedAndFilteredData);
  }, [filterValue, sortConfig, initialEstimations]);

  const handleFilter = (value) => {
    setFilterValue(value);
  };

  const handleSort = (column) => {
    const newDirection =
      sortConfig.column === column && sortConfig.direction === "asc"
        ? "desc"
        : "asc";
    setSortConfig({
      column,
      direction: newDirection,
    });
  };

  return (
    <DashboardLayout>
      <div className="w-full flex mt-5">
        <SearchBar onFilter={handleFilter} />
      </div>
      <Tables
        data={estimations}
        onSort={handleSort}
        sortedColumn={{
          name: sortConfig.column,
          direction: sortConfig.direction,
        }}
      />
    </DashboardLayout>
  );
};

export default Index;
