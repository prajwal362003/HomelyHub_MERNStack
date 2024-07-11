import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"; // for type-checking props
import "../../CSS/FilterModal.css";
import "react-input-range/lib/css/index.css"; // Importing css file for input range styling
import InputRange from "react-input-range";

const FilterModel = ({ selectedFilters, onFilterChange, onClose }) => {
  const [priceRange, setPriceRange] = useState({
    min: selectedFilters.priceRange?.min || 600,
    max: selectedFilters.priceRange?.max || 30000,
  });

  // Property Type
  const [propertyType, setPropertyType] = useState(
    selectedFilters.propertyType || "" // default it is empty or the selected property type from user/props
  );

  const [roomType, setRoomType] = useState(selectedFilters.roomType || ""); // for rooms

  const [amenities, setAmenities] = useState(selectedFilters.amenities || []); // for amenities

  // useEffect hook to update state when the selectedFilters changes
  useEffect(() => {
    setPriceRange({
      min: selectedFilters.priceRange?.min || 600,
      max: selectedFilters.priceRange?.max || 30000,
    });
    setPropertyType(selectedFilters.propertyType || "");
    setRoomType(selectedFilters.roomType || "");
    setAmenities(selectedFilters.setAmenities || []);
  }, [selectedFilters]);

  // Funtion to handle the changes in the price range
  const handlePriceRangeChange = (value) => {
    setPriceRange(value); // update the price range change
  };

  // Function to handle min value
  const handleMinInputChange = (e) => {
    const minValue = parseInt(e.target.value, 10);
    setPriceRange((prev) => ({ ...prev, min: minValue }));
  };
  // Function to handle max value
  const handleMaxInputChange = (e) => {
    const maxValue = parseInt(e.target.value, 10);
    setPriceRange((prev) => ({ ...prev, min: maxValue }));
  };

  // Function to handle applying filters
  const handleFilterChange = () => {
    onFilterChange("minPrice", priceRange.min);
    onFilterChange("maxPrice", priceRange.max);
    onFilterChange("propertyType", propertyType);
    onFilterChange("roomType", roomType);
    onFilterChange("ameneties", amenities);
    onClose(); // closes the model
  };

  // Options for property types
  // House , Flat , GuestHouse , Hotel

  const propertyTypeOptions = [
    {
      value: "House",
      label: "House",
      icon: "home",
    },
    {
      value: "Flat",
      label: "Flat",
      icon: "apartment",
    },
    {
      value: "Guest House",
      label: "Guest House",
      icon: "hotel",
    },
    {
      value: "Hotel",
      label: "Hotel",
      icon: "meeting_room",
    },
  ];

  // Options for room types
  // Entire Room, Room, Any Type

  const roomTypeOptions = [
    {
      value: "Entire Room",
      label: "Entire Room",
      icon: "hotel",
    },
    {
      value: "Room",
      label: "Room",
      icon: "meeting_room",
    },
    {
      value: "AnyType",
      label: "AnyType",
      icon: "apartment",
    },
  ];

  // Options for ameneties
  // Wifi,AC,TV,Free Parking, Kitchen, Washing Machine, Pool
  const amenitiesOptions = [
    {
      value: "Wifi",
      label: "Wifi",
      icon: "wifi",
    },
    {
      value: "Kitchen",
      label: "Kitchen",
      icon: "kitchen",
    },
    {
      value: "Ac",
      label: "AC",
      icon: "ac_unit",
    },
    {
      value: "Washing Machine",
      label: "Wasing Machine",
      icon: "local_laundry_service",
    },
    {
      value: "Tv",
      label: "Tv",
      icon: "tv",
    },
    {
      value: "Pool",
      label: "Pool",
      icon: "pool",
    },
    {
      value: "Free Parking",
      label: "Free Parking",
      icon: "local_parking",
    },
  ];

  // Function to handle clearing filters
  const handleClearFilters = () => {
    setPriceRange({ min: 600, max: 30000 }); // reset the price range
    setPropertyType({});
    setRoomType("");
    setAmenities([]);
  };

  // Function to handle changes in ameneties
  const handleAmenitiesChange = (selectedAmenity) => {
    setAmenities((prevAmenities) =>
      prevAmenities.includes(selectedAmenity)
        ? prevAmenities.filter((item) => item !== selectedAmenity)
        : [...prevAmenities, selectedAmenity]
    );
  };

  // Function to handle the changes in property type
  const handlePropertyTypeChange = (selectedType) => {
    setPropertyType((prevType) =>
      prevType === selectedType ? "" : selectedType
    );
  };

  // Function to handle the changes in the room type
  const handleRoomTypeChange = (selectedType) => {
    setRoomType((prevType) => (prevType === selectedType ? "" : selectedType));
  };
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h4>
          Filters
          <hr />
        </h4>
        {/*close the buttons*/}
        <button className="close-button" onClick={onClose}>
          <span>&times;</span>
        </button>

        {/*Filter Sections*/}
        <div className="modal-filters-container">
          <div className="filter-section">
            <label>Price range:</label>
            <InputRange
              minValue={600}
              maxValue={30000}
              value={priceRange}
              onChange={handlePriceRangeChange}
            />
            <div className="range-inputs">
              <input
                type="number"
                value={priceRange.min}
                onChange={handleMinInputChange}
              />
              <span></span>
              <input
                type="number"
                value={priceRange.max}
                onChange={handleMaxInputChange}
              />
            </div>
          </div>

          {/*Property Type Filter*/}
          <div className="filter-section">
            <label>Property Type:</label>
            <div className="icon-box">
              {propertyTypeOptions.map((options) => (
                <div
                  key={options.value}
                  className={`selectable-box ${
                    propertyType === options.value ? "selected" : ""
                  }
                  }`}
                  onClick={() => handlePropertyTypeChange(options.value)}
                >
                  <span className="material-icons">{options.icon}</span>
                  <span>{options.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/*Room Type Filter */}
          <div>
            <label>Room Type:</label>
            <div className="icon-box">
              {roomTypeOptions.map((options) => (
                <div
                  key={options.value}
                  className={`selectable-box ${
                    roomType === options.value ? "selected" : ""
                  }`}
                  onClick={() => handleRoomTypeChange(options.value)}
                >
                  <span className="material-icons">{options.icon}</span>
                  <span>{options.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/*Amenities Filter*/}
          <div className="filter-section">
            <label>Amenities:</label>
            <div className="amenities-checkboxes">
              {amenitiesOptions.map((option) => (
                <div key={option.value} className="amenity-checkbox">
                  {console.log(amenities.includes(option.value))}
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={amenities.includes(option.value)}
                    onChange={() => handleAmenitiesChange(option.value)}
                  />
                  <span className="material-icons amenitieslabel">
                    {option.icon}
                  </span>
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/*Filter Actions for buttons*/}
          {/*Clear Button*/}
          <div className="filter-buttons">
            <button className="clear-button" onClick={handleClearFilters}>
              Clear
            </button>

            <button onClick={handleFilterChange}>Apply Filters</button>
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /*selectedFilters will only accept object*/
}
{
  /*onFilterChange will only accept function*/
}
{
  /*onClose will only accept function*/
}

FilterModel.propTypes = {
  selectedFilters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FilterModel;
