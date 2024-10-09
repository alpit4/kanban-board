import React from "react";

const GroupSelector = ({ setGroupBy }) => {
  const handleChange = (event) => {
    setGroupBy(event.target.value);
  };

  return (
    <select onChange={handleChange}>
      <option value="status">Group by Status</option>
      <option value="user">Group by User</option>
      <option value="priority">Group by Priority</option>
    </select>
  );
};

export default GroupSelector;
