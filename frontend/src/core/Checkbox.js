import React, { useState } from "react";
import { getCategories } from "../admin/apiAdmin";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (c) => () => {
    const currentCategoryId = checked.indexOf(c);
    //console.log(currentCategoryId);
    const newCheckedCategoryId = [...checked];

    if (currentCategoryId === -1) {
      //console.log('adicionou')
      //console.log(c)
      newCheckedCategoryId.push(c);
    } else {
      // console.log("Eliminou");
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    //console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId)
  };

  // console.log({categories})
  return categories.map((c, i) => (
    <li key={i} className="list-unstyled">
      <input
        type="checkbox"
        value={checked.indexOf(c._id === -1)}
        className="form-check-input"
        onChange={handleToggle(c)}
      />
      <label className="form-check-label ms-2">{c.name} </label>
    </li>
  ));
};

export default Checkbox;
