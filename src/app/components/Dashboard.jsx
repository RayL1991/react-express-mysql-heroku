import React from "react";
import { connect } from "react-redux";
import { ConnectedTaskList } from "./TaskList";
import { Link } from "react-router-dom";
import * as mutations from "../store/mutations";

export const Dashboard = ({ groups, logoutUser }) => (
  <div>
    <h3>Dashboard</h3>
    {/* {groups.map((group) => (
      <div key={group.id}>{group.name}</div>
    ))} */}
    {groups.map((group) => (
      <ConnectedTaskList key={group.id} id={group.id} name={group.name} />
    ))}

    <button onClick={logoutUser}>
      <Link to="/login">logout / return to Login page</Link>
    </button>
  </div>
);

function mapStateToProps(state) {
  return {
    groups: state.groups,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser() {
      console.info("step go here!!!");
      dispatch(mutations.logoutUser());
    },
  };
}

export const ConnectedDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
