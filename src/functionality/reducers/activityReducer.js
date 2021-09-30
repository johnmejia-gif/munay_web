import {
	ACTIVITY_RATING,
	ACTIVITY_MODAL_RATING,
	ACTIVITY_MODAL,
	ACTIVITY_VIEW_RATING,
	ACTIVITY_TUTORIAL,
	ACTIVITY_TRAINING_SELECT,
	ACTIVITY_DATE_DETAIL,
	ACTIVITY_PERCENTAGE,
} from "../types/activityTypes";

const INITIAL_STATE = {
	activity_rating: 0,
	activity_view_rating: null,
	activity_modal_rating: false,
	activity_modal: false,
	activity_modal_message: "",
	activity_tutorial: true,
	activity_training_select: null,
	activity_date_detail: [],
	activity_date_modal: false,
	activity_date: null,
	activity_percentage: 0,
};

export default function activityReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case ACTIVITY_RATING:
			return {
				...state,
				activity_rating: action.payload,
			};
		case ACTIVITY_MODAL_RATING:
			return {
				...state,
				activity_modal_rating: action.payload,
			};
		case ACTIVITY_MODAL:
			return {
				...state,
				activity_modal: action.payload.status,
				activity_modal_message: action.payload.message,
			};
		case ACTIVITY_VIEW_RATING:
			return {
				...state,
				activity_view_rating: action.payload,
			};
		case ACTIVITY_TUTORIAL:
			return {
				...state,
				activity_tutorial: action.payload,
			};
		case ACTIVITY_TRAINING_SELECT:
			return {
				...state,
				activity_training_select: action.payload,
			};
		case ACTIVITY_PERCENTAGE:
			return {
				...state,
				activity_percentage: action.payload,
			};
		case ACTIVITY_DATE_DETAIL:
			return {
				...state,
				activity_date_detail: action.payload.data,
				activity_date_modal: action.payload.status,
			};
		default:
			return { ...state };
	}
}
