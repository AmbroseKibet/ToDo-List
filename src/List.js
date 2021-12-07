import React from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
const List = ({ list, deleteItem, editItem, setList }) => {
  return (
    <div className="container gy-6">
      {list.map((task) => {
        const { Id, Item } = task;
        return (
          <article key={Id} className="article">
            <p className="item-container">{Item}</p>

            <div className="buttons-container">
              <FaPencilAlt className="edit" onClick={() => editItem(Id)} />
              <FaTrash className="delete" onClick={() => deleteItem(Id)} />
            </div>
          </article>
        );
      })}
      <div className="btn-container">
        <button className="btn btn-danger clr-btn" onClick={() => setList([])}>
          Clear All
        </button>
      </div>
    </div>
  );
};

export default List;
