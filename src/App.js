import React from "react";
import { useState } from "react";
import Alert from "./Alert";
import List from "./List";
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
const App = () => {
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({ type: "", msg: "", state: true });
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
    if (!name) {
      showAlert("danger", "please enter a task", true);
    } else if (name && isEditing) {
      const newList = list.map((task) => {
        if (task.Id === editId) {
          task.Item = name;
        }
        return task;
      });
      setList(newList);
      showAlert("success", "Item edited succesfully", true);
      setName("");
      setIsEditing(false);
      setEditId(null);
      // edit functionality
    } else if (name) {
      // add to list functionality
      const newItem = { Id: new Date().getTime().toString(), Item: name };
      setList([...list, newItem]);
      setName("");
      showAlert("success", "Task added succesfully", true);
    }
  };
  const showAlert = (type = "", msg = "", state = false) => {
    setAlert({ type: type, msg: msg, state: state });
  };
  const deleteItem = (Id) => {
    const newlist = list.filter((Item) => Item.Id !== Id);
    setList(newlist);

    showAlert("danger", "task removed", true);
  };
  const editItem = (Id) => {
    const Item = list.find((Item) => Item.Id === Id);
    setName(Item.Item);
    setIsEditing(true);
    setEditId(Item.Id);
  };
  React.useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="main">
      {alert.state && <Alert alert={alert} showAlert={showAlert} list={list} />}
      <h1 className="heading1">Todo List</h1>
      <form className="form " onSubmit={handleSubmit}>
        <div className="container input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter your task"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <button className="input-group-text btn btn-primary" type="submit">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <List
          list={list}
          deleteItem={deleteItem}
          editItem={editItem}
          setList={setList}
        />
      )}
    </section>
  );
};

export default App;
