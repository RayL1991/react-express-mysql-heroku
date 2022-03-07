import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
//import { Router } from "react-router";
import {
  BrowserRouter,
  Router,
  Routes,
  Route,
  Navigate,
  useParams,
  Outlet,
} from "react-router-dom";
import { history } from "../store/history";

import { ConnectedDashboard, Dashboard } from "./Dashboard";
import { ConnectedNavigation } from "./Navigation";
import { ConnectedTaskDetail } from "./TaskDetails";
import { ConnectedLogin } from "./Login";
import { ConnectedRegister } from "./Register";

const RouteGuard = () => {
  if (!store.getState().session.authenticated) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

const ConnectedTaskDetailWrapper = (props) => {
  const { id } = useParams();
  // useEffect(() => {
  //   console.log("/somthing/" + id + "this is form main session");
  // }, []);
  return <ConnectedTaskDetail id={id} />;
};

export const Main = () => (
  <BrowserRouter history={history}>
    <Provider store={store}>
      <div>
        <ConnectedNavigation />
        <Routes>
          <Route exact path="/login" element={<ConnectedLogin />} />
          <Route exact path="/" element={<ConnectedLogin />} />
          <Route exact path="/register" element={<ConnectedRegister />} />
          <Route element={<RouteGuard />}>
            <Route exact path="/dashboard" element={<ConnectedDashboard />} />
            <Route
              exact
              path="/task/:id"
              element={<ConnectedTaskDetailWrapper />}
            />
          </Route>
        </Routes>
      </div>
    </Provider>
  </BrowserRouter>
);
