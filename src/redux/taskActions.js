import { FETCH_ERROR, FETCH_REQUEST, FETCH_SUCCESS } from "./actionTypes"

const fetchTaskRequestAction = () => {
  return {
    type: FETCH_REQUEST,
  }
}

const fetchTaskSuccessAction = (tasks) => {
  return {
    type: FETCH_SUCCESS,
    data: tasks
  }
}

const fetchTaskErrorAction = () => {
  return {
    type: FETCH_ERROR,
  }
}


export {
  fetchTaskRequestAction,
  fetchTaskSuccessAction,
  fetchTaskErrorAction,
};
