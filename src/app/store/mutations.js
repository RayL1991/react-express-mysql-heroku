export const REQUEST_TASK_CREATION = "REQUEST_TASK_CREATION";
export const CREATE_TASK = "CREATE_TASK";
export const SET_TASK_COMPLETE = "SET_TASK_COMPLETE";
export const SET_TASK_GROUP = "SET_TASK_GROUP";
export const SET_TASK_NAME = "SET_TASK_NAME";

export const REQUEST_AUTHENTICATE_USER = "REQUEST_AUTHENTICATE_USER";
export const PROCESS_AUTHENTICATE_USER = "PROCESS_AUTHENTICATE_USER";
export const AUTHENTICATING = "AUTHENTICATING";
export const AUTHENTICATED = "AUTHENTICATED";
export const NOT_AUTHENTICATED = "NOT_AUTHENTICATED";

export const LOGOUT_USER = "LOGOUT_USER";
export const CREATE_USER = "CREATE_USER";
export const CREATE_SUCCESS = "CREATE_SUCCESS";
export const SET_STATE = "SET_STATE";

export const requestTaskCreation = (groupID) => ({
  type: REQUEST_TASK_CREATION,
  groupID,
});
export const createTask = (taskID, groupID, ownerID) => ({
  type: CREATE_TASK,
  taskID,
  groupID,
  ownerID,
});

export const createUser = (username, password, id) => ({
  type: CREATE_USER,
  username,
  password,
  id,
});

export const setTaskCompletion = (id, isComplete) => ({
  type: SET_TASK_COMPLETE,
  taskID: id,
  isComplete,
});

export const setTaskName = (id, name) => ({
  type: SET_TASK_NAME,
  taskID: id,
  name,
});

export const setTaskGroup = (id, groupID) => ({
  type: SET_TASK_GROUP,
  taskID: id,
  groupID,
});

export const requestAuthenticateUser = (username, password) => ({
  type: REQUEST_AUTHENTICATE_USER,
  username,
  password,
});

export const processAuthenticateUser = (
  status = AUTHENTICATING,
  session = null
) => ({
  type: PROCESS_AUTHENTICATE_USER,
  session,
  authenticated: status,
});

export const setSate = (state = {}) => ({
  type: SET_STATE,
  state,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
  authenticated: NOT_AUTHENTICATED,
});
