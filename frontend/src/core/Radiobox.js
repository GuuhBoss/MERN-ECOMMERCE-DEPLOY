import React, { useState } from "react";

const Radiobox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);


  const handleChange = (e) => {
      handleFilters(e.target.value)
      setValue(e.target.value)
  }

  return prices.map((p, i) => (
    <div key={i} className="list-unstyled ms-4">
      <input
        type="radio"
        value={`${p._id}`}
        name={p}
        className="form-check-input"
        onChange={handleChange}
      />
      <label className="form-check-label ms-2">{p.name} </label>
    </div>
  ));
};

export default Radiobox;
