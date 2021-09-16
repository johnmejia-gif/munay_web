import {
	USER_EMAIL,
	USER_PASSWORD,
	USER_FIRSTNAME,
	USER_LASTNAME,
	USER_CLEAR,
	USER_ERROR,
	USER_DATA,
	USER_LOADING,
	USER_STATUS,
	USER_SESSION,
	USER_ALL_DATA,
	USER_ACCOMPANYING,
	USER_ACCOMPANYING_LOADING,
	USER_CHANGE_IMAGE,
	USER_CHANGE_LOADING_IMAGE,
	USER_TRAINING,
	USER_RATINGS,
	USER_HISTORIAL,
	USER_ACTIVITIES_HISTORIAL,
	USER_INTUITS,
	USER_MODAL_LEVEL,
	USER_LEVEL,
	USER_LIKE_RESOURCE,
	USER_PERMISSIONS,
	USER_TEST_TIME,
	USER_USERNAME,
	USER_HELLO,
} from "../types/userTypes";

const INITIAL_STATE = {
	user: null,
	user_all_data: null,
	user_status: false,
	user_loading: false,
	user_session: false,
	user_email: "",
	user_password: "",
	user_firstname: "",
	user_lastname: "",
	user_username: "",
	user_error: "",
	user_modal_message: "",
	user_accompany_loading: true,
	user_accompanying: [],
	user_accompany: [],
	user_profile_image_update: false,
	user_profile_image_percentage: 0,
	user_profile_image_visible: "",
	user_training: [],
	user_ratings: [],
	user_historial: [],
	user_activities_historial: [],
	user_intuits: null,
	user_modal_level: false,
	user_level: 0,
	user_like_resource: [],
	user_permissions: false,
	user_test_time: null,
	user_hello: false,
};

export default function userReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case USER_EMAIL:
			return {
				...state,
				user_email: action.payload,
			};
		case USER_PASSWORD:
			return {
				...state,
				user_password: action.payload,
			};
		case USER_FIRSTNAME: {
			return {
				...state,
				user_firstname: action.payload,
			};
		}
		case USER_LASTNAME: {
			return {
				...state,
				user_lastname: action.payload,
			};
		}
		case USER_USERNAME: {
			return {
				...state,
				user_username: action.payload,
			};
		}
		case USER_CLEAR: {
			return {
				...state,
				user_email: "",
				user_password: "",
				user_username: "",
				user_firstname: "",
				user_lastname: "",
				user_error: "",
			};
		}
		case USER_ERROR: {
			return {
				...state,
				user_error: action.payload,
				user_loading: false,
				user_modal_message: "",
			};
		}
		case USER_DATA: {
			return {
				...state,
				user: action.payload,
				user_loading: false,
				user_status: true,
				user_session: false,
				user_modal_message: "",
			};
		}
		case USER_STATUS:
			return {
				...state,
				user_status: action.payload,
			};
		case USER_LOADING:
			return {
				...state,
				user_loading: action.payload.status,
				user_modal_message: action.payload.message,
			};
		case USER_SESSION:
			return {
				...state,
				user_session: action.payload,
			};
		case USER_ALL_DATA:
			return {
				...state,
				user_all_data: action.payload,
			};
		case USER_ACCOMPANYING:
			return {
				...state,
				user_accompanying: action.payload.accompanying,
				user_accompany: action.payload.accompany,
				user_accompany_loading: false,
			};
		case USER_ACCOMPANYING_LOADING:
			return {
				...state,
				user_accompany_loading: action.payload,
			};
		case USER_CHANGE_IMAGE:
			return {
				...state,
				user_profile_image_update: action.payload,
			};
		case USER_CHANGE_LOADING_IMAGE:
			return {
				...state,
				user_profile_image_percentage: action.payload.percentage,
				user_profile_image_visible: action.payload.visible,
			};
		case USER_TRAINING:
			return {
				...state,
				user_training: action.payload,
			};
		case USER_RATINGS:
			return {
				...state,
				user_ratings: action.payload,
			};
		case USER_HISTORIAL:
			return {
				...state,
				user_historial: action.payload,
			};
		case USER_ACTIVITIES_HISTORIAL:
			return {
				...state,
				user_activities_historial: action.payload,
			};
		case USER_INTUITS:
			return {
				...state,
				user_intuits: action.payload,
			};
		case USER_MODAL_LEVEL:
			return {
				...state,
				user_modal_level: action.payload,
			};
		case USER_LEVEL:
			return {
				...state,
				user_level: action.payload,
			};
		case USER_LIKE_RESOURCE:
			return {
				...state,
				user_like_resource: action.payload,
			};
		case USER_PERMISSIONS:
			return {
				...state,
				user_permissions: action.payload,
			};
		case USER_TEST_TIME:
			return {
				...state,
				user_test_time: action.payload,
			};
		case USER_HELLO:
			return {
				...state,
				user_hello: action.payload,
			};
		default:
			return { ...state };
	}
}
