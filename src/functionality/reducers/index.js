import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import contentReducer from "./contentReducer";
import programReducer from "./programReducer";
import gardenReducer from "./gardenReducer";

export default combineReducers({
	userReducer,
	gardenReducer,
	contentReducer,
	programReducer,
	routing: routerReducer,
});
