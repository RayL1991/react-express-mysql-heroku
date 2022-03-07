import React from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";
import { Navigate } from "react-router";
import md5 from "md5";

const RegisterComponent = ({ createUser, userCreationStatus }) => {
  return (
    <div>
      <form onSubmit={createUser}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          placeholder="please input your username"
          name="username"
          defaultValue="new user"
          className="form-control"
          id="username"
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          placeholder="please input your password"
          name="password"
          defaultValue="NEWPASSWORD"
          className="form-control mt-2"
          id="password"
        />

        <label htmlFor="id">id</label>
        <input
          type="text"
          placeholder="please input your prefer id, default value is UX"
          name="id"
          defaultValue="UX"
          className="form-control mt-2"
          id="id"
        />

        {userCreationStatus === "CREATE_SUCCESS" ? (
          <div>
            <p>user create Successfully</p>
            <Navigate to="/login" />
          </div>
        ) : null}

        <div>
          <button type="submit">create a new user</button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ session }) => ({
  userCreationStatus: session.userCreationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  createUser(e) {
    e.preventDefault();
    let username = e.target["username"].value;
    let password = md5(e.target["password"].value);
    let id = e.target["id"].value;
    dispatch(mutations.createUser(username, password, id));
  },
});

export const ConnectedRegister = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterComponent);
