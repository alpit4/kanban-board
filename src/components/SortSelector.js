import React from "react";

const SortSelector = ({ setSortBy }) => {
  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <select className="selector" onChange={handleChange}>
      <option value="priority">Sort by Priority</option>
      <option value="title">Sort by Title</option>
    </select>
  );
};

export default SortSelector;
