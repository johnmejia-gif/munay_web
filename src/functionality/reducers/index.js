import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import contentReducer from "./contentReducer";
import programReducer from "./programReducer";
import gardenReducer from "./gardenReducer";
import suscriptionReducer from "./subscriptionReducer";
import activityReducer from "./activityReducer";
import practiceReducer from "./practiceReducer";

export default combineReducers({
	userReducer,
	gardenReducer,
	contentReducer,
	programReducer,
	suscriptionReducer,
	activityReducer,
	practiceReducer,
	routing: routerReducer,
});
