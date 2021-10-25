import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import contentReducer from "./contentReducer";
import programReducer from "./programReducer";
import gardenReducer from "./gardenReducer";
import suscriptionReducer from "./subscriptionReducer";
import activityReducer from "./activityReducer";
import practiceReducer from "./practiceReducer";
import globalReducer from "./globalReducer";
import workoutReducer from "./workoutReducer";

export default combineReducers({
	workoutReducer,
	userReducer,
	gardenReducer,
	contentReducer,
	programReducer,
	suscriptionReducer,
	activityReducer,
	practiceReducer,
	globalReducer,
	routing: routerReducer,
});
