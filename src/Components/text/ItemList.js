import React from "react";

const ItemList = ({ name, data, symble, ...rest }) => {
  return (
    <li className="list-item my-1 py-4 rounded" {...rest}>
      {name}
      <span className="d-block display-4">
        {data}
        {symble && data > 0 ? <small className="border-2 border-solid b">{symble}</small> : ""}
      </span>
    </li>
  );
};

export default ItemList;
