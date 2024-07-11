import React, { useEffect, useState } from "react";
import FilterModel from "./FilterModel";
import { UseDispatch, useDispatch } from "react-redux";
import { getAllProperties } from "../../Store/Property/property-action";
import { propertyAction } from "../../Store/Property/property-slice";
import Search from "./Search";

const Filter = () => {
  // State for controlling model visibility
  const [isModelOpen, setIsModelOpen] = useState(false);
  // State for storing selected filters
  const [selectedFilters, setSelectedFilters] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(propertyAction.updateSearchParams(selectedFilters));
    dispatch(getAllProperties());
  }, [selectedFilters, dispatch]);

  // Function for handeling model/popup window
  const handleOpenModel = () => {
    setIsModelOpen(true); // sets isModelOpen to true to open the model
  };

  const handleCloseModel = () => {
    setIsModelOpen(false); // sets isModelOpen to false to close the model
  };

  // function to handle changes in filter
  const handleFilterChange = (filterName, value) => {
    // Update the selected filters with the new Values
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  return (
    <>
      <span class="material-symbols-outlined filter" onClick={handleOpenModel}>
        tune
      </span>
      {isModelOpen && (
        <FilterModel
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onClose={handleCloseModel}
        />
      )}
    </>
  );
};

export default Filter;
