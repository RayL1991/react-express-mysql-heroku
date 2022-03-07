import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { requestTaskCreation } from "../store/mutations";

export const TaskList = ({ tasks, name, id, createNewTask }) => (
  <div>
    <h3>{name}</h3>
    <h3>{id}</h3>
    <div>
      {tasks.map((task) => (
        <Link to={"/task/" + task.id} key={task.id}>
          <div>
            {task.name}
            {task.id}
          </div>
        </Link>
      ))}
    </div>
    <button onClick={() => createNewTask(id)}>Add New Task</button>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  let groupID = ownProps.id;
  return {
    name: ownProps.name,
    id: groupID,
    tasks: state.tasks.filter((task) => task.group === groupID),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createNewTask(id) {
      console.log("creation new task function!!!", id);
      dispatch(requestTaskCreation(id));
    },
  };
};

export const ConnectedTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);