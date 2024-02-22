import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_ERROR } from "./actionTypes";

const initialState = {
  loading: false,
  tasks: [],
  error: false
};

export function taskReducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_REQUEST:
      return {...state, loading: true, error: false};

    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: [...action.data],
        error: false
      };

      case FETCH_ERROR:
        return {
          ...state,
          loading: false,
          tasks: [],
          error: true
        };
    
    default:
      return state;
  }
}