import React, { useEffect, useState } from "react";

const Stage = ({ hostels, changeStages, id, stage }) => {
  const onChanged = (e) => {
    changeStages(id, "night", e.target.value);
  };

  return (
    <div>
      <select name="stage" id="stage">
        {hostels.map((ht) => {
          return (
            <option key={ht.id} value={ht.name}>
              {ht.name}
            </option>
          );
        })}
      </select>
      <input
        type="number"
        onChange={(e) => onChanged(e)}
        name="nights"
        value={stage[id].nights}
      />
    </div>
  );
};

export default Stage;
