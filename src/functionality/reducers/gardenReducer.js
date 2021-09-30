import {
	GARDEN_CHANGE,
	GARDEN_DATA,
	GARDEN_MY_LIST,
	GARDEN_MY_PLANTS,
	GARDEN_LOADING_LIST,
	GARDEN_LOADING_SELECT,
	GARDEN_STATION,
	GARDEN_MODAL_LOADING,
	GARDEN_VIEW_PLANTS,
	GARDEN_PLANTS,
	GARDEN_PLANT_SELECT,
	GARDEN_PLANT_MODAL,
	GARDEN_PLANT_PURPOSE,
	GARDEN_PLANT_CLEAR,
	GARDEN_PLANT_RESOURCE,
	GARDEN_CHANGE_QUANTITY,
	GARDEN_PLANT_ACTION_MODAL,
	GARDEN_PLANT_ACTION,
	GARDEN_PLANT_HISTORIAL,
	GARDEN_CLEAR,
	GARDEN_REMINDER_MODAL,
	GARDEN_REMINDER_HOUR,
	GARDEN_REMINDER_MINUTE,
	GARDEN_REMINDER_CLEAR,
	GARDEN_TUTORIAL,
	GARDEN_MY_LIST_MENU,
	GARDEN_PLANT_NAME,
	GARDEN_REMINDER,
	GARDEN_PLANT_SELECTED,
	GARDEN_PLANT_EDIT,
	GARDEN_CHANGE_LOADING,
	GARDEN_LOADING,
	GARDEN_MY_LIST_CLEAR,
	GARDEN_SUPPLIES,
} from "../types/gardenTypes";
// import { Dimensions } from 'react-native';

// const { width } = Dimensions.get('window');

const INITIAL_STATE = {
	gardern_loading: true,
	gardens: [],
	plants: [],
	garden_select: null,
	garden_loading_select: true,
	// garden_content_width: (width - 117),
	garden_right_menu: 10,
	loading_my_garden: true,
	my_garden: [],
	my_garden_menu: [],
	my_plants: [],
	my_plants_historial: [],
	garden_plants: [],
	station_default: {
		station: "Primavera",
		icon: "spring",
		color: "#5ADDB8",
	},
	garden_station: null,
	garden_modal_loading: false,
	garden_modal_message: "",
	garden_plant_modal: false,
	plant_selected: "",
	plant_name: "",
	plant_purpose: "",
	garden_plan_resource: "earth",
	garden_quantity_resource: 0,
	garden_plant_action_modal: false,
	garden_plant_action: "",
	garden_reminder_modal: false,
	garden_reminder_hour: "",
	garden_reminder_minute: "",
	garden_tutorial: false,
	garden_reminder: [],
	garden_plant_selected: null,
	garden_modal_plant_edit: false,
	garden_change_loading: false,
	garden_supplies: false,
};

export default function gardenReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case GARDEN_DATA:
			return {
				...state,
				gardens: action.payload.data,
				gardern_loading: action.payload.status,
			};
		case GARDEN_LOADING:
			return {
				...state,
				gardern_loading: action.payload,
			};
		case GARDEN_PLANTS:
			return {
				...state,
				plants: action.payload,
			};
		case GARDEN_CHANGE:
			return {
				...state,
				garden_select: action.payload,
			};
		case GARDEN_MY_LIST:
			return {
				...state,
				my_garden: action.payload,
			};
		case GARDEN_MY_LIST_MENU:
			return {
				...state,
				my_garden_menu: action.payload,
			};
		case GARDEN_MY_PLANTS:
			return {
				...state,
				my_plants: action.payload,
			};
		case GARDEN_LOADING_LIST:
			return {
				...state,
				loading_my_garden: action.payload,
			};
		case GARDEN_LOADING_SELECT:
			return {
				...state,
				garden_loading_select: action.payload,
			};
		case GARDEN_STATION:
			return {
				...state,
				garden_station: action.payload,
			};
		case GARDEN_MODAL_LOADING:
			return {
				...state,
				garden_modal_loading: action.payload.loading,
				garden_modal_message: action.payload.message,
			};
		case GARDEN_VIEW_PLANTS:
			return {
				...state,
				garden_plants: action.payload,
			};
		case GARDEN_PLANT_MODAL:
			return {
				...state,
				garden_plant_modal: action.payload,
			};
		case GARDEN_PLANT_SELECT:
			return {
				...state,
				plant_selected: action.payload,
			};
		case GARDEN_PLANT_PURPOSE:
			return {
				...state,
				plant_purpose: action.payload,
			};
		case GARDEN_PLANT_NAME:
			return {
				...state,
				plant_name: action.payload,
			};
		case GARDEN_PLANT_CLEAR:
			return {
				...state,
				plant_selected: "",
				plant_name: "",
				plant_purpose: "",
				garden_plant_modal: false,
			};
		case GARDEN_PLANT_RESOURCE:
			return {
				...state,
				garden_plan_resource: action.payload,
				garden_quantity_resource: 0,
			};
		case GARDEN_CHANGE_QUANTITY:
			return {
				...state,
				garden_quantity_resource: action.payload,
			};
		case GARDEN_PLANT_ACTION_MODAL:
			return {
				...state,
				garden_plant_action_modal: action.payload,
			};
		case GARDEN_PLANT_ACTION:
			return {
				...state,
				garden_plant_action: action.payload,
			};
		case GARDEN_PLANT_HISTORIAL:
			return {
				...state,
				my_plants_historial: action.payload,
			};
		case GARDEN_CLEAR:
			return {
				...state,
				garden_quantity_resource: 0,
				garden_modal_loading: false,
				garden_modal_message: "",
			};
		case GARDEN_REMINDER_MODAL:
			return {
				...state,
				garden_reminder_modal: action.payload,
			};
		case GARDEN_REMINDER_HOUR:
			return {
				...state,
				garden_reminder_hour: action.payload,
			};
		case GARDEN_REMINDER_MINUTE:
			return {
				...state,
				garden_reminder_minute: action.payload,
			};
		case GARDEN_REMINDER:
			return {
				...state,
				garden_reminder: action.payload,
			};
		case GARDEN_REMINDER_CLEAR:
			return {
				...state,
				garden_reminder_modal: false,
				garden_reminder_hour: "",
				garden_reminder_minute: "",
			};
		case GARDEN_TUTORIAL:
			return {
				...state,
				garden_tutorial: action.payload,
			};
		case GARDEN_REMINDER:
			return {
				...state,
				garden_reminder: action.payload,
			};
		case GARDEN_PLANT_SELECTED:
			return {
				...state,
				garden_plant_selected: action.payload,
			};
		case GARDEN_PLANT_EDIT:
			return {
				...state,
				plant_name: action.payload.name,
				plant_purpose: action.payload.purpose,
				garden_modal_plant_edit: action.payload.status,
			};
		case GARDEN_CHANGE_LOADING:
			return {
				...state,
				garden_change_loading: action.payload,
			};
		case GARDEN_MY_LIST_CLEAR:
			return {
				...state,
				garden_loading_select: true,
				loading_my_garden: true,
				my_garden: [],
				my_plants: [],
				my_plants_historial: [],
				garden_station: null,
			};
		case GARDEN_SUPPLIES:
			return {
				...state,
				garden_supplies: action.payload,
			};
		default:
			return { ...state };
	}
}
