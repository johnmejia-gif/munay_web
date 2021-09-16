import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import userReducer from "./userReducer";

export default combineReducers({ userReducer, routing: routerReducer });
