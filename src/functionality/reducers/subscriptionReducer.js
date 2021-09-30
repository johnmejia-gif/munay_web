import {
	SUBSCRIPTION_MODAL,
	SUBSCRIPTION_PLAN_SELECTED,
	SUBSCRIPTION_CARD_NAME,
	SUBSCRIPTION_CARD_NUMBER,
	SUBSCRIPTION_CARD_EXP_MONTH,
	SUBSCRIPTION_CARD_EXP_YEAR,
	SUBSCRIPTION_CARD_CVC,
	SUBSCRIPTION_LOADING,
	SUBSCRIPTION_STEP,
	SUBSCRIPTION_CLEAR,
	SUBSCRIPTION_OPTIONS,
	SUBSCRIPTION_LOADING_MESSAGE,
	SUBSCRIPTION_MY_LIST,
	SUBSCRIPTION_SECTION,
	SUBSCRIPTION_GROUP,
	SUBSCRIPTION_GROUP_ADD,
	SUBSCRIPTION_GROUP_MODAL,
	SUBSCRIPTION_GROUP_FIRSTNAME,
	SUBSCRIPTION_GROUP_LASTNAME,
	SUBSCRIPTION_GROUP_EMAIL,
	SUBSCRIPTION_GROUP_CLEAR,
	SUBSCRIPTION_GROUP_EDIT,
} from "../types/subscriptionTypes";

const INITIAL_STATE = {
	subscription_options: null,
	subscription_my_list: null,
	subscription_modal: false,
	subscription_loading: false,
	subscription_loading_message: null,
	subscription_plan: null,
	subscription_card_name: "",
	subscription_card_number: "",
	subscription_card_exp_year: "",
	subscription_card_exp_month: "",
	subscription_card_cvc: "",
	subscription_step: 1,
	subscription_section: "detail",
	subscription_group: null,
	subscription_group_add: [],
	subscription_group_index: null,
	subscription_group_firstname: "",
	subscription_group_lastname: "",
	subscription_group_email: "",
	subscription_group_modal: false,
};

export default function suscriptionReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case SUBSCRIPTION_OPTIONS:
			return {
				...state,
				subscription_options: action.payload,
			};
		case SUBSCRIPTION_MY_LIST:
			return {
				...state,
				subscription_my_list: action.payload,
			};
		case SUBSCRIPTION_MODAL:
			return {
				...state,
				subscription_modal: action.payload,
			};
		case SUBSCRIPTION_PLAN_SELECTED:
			return {
				...state,
				subscription_plan: action.payload,
			};
		case SUBSCRIPTION_CARD_NAME:
			return {
				...state,
				subscription_card_name: action.payload,
			};
		case SUBSCRIPTION_CARD_NUMBER:
			return {
				...state,
				subscription_card_number: action.payload,
			};
		case SUBSCRIPTION_CARD_EXP_YEAR:
			return {
				...state,
				subscription_card_exp_year: action.payload,
			};
		case SUBSCRIPTION_CARD_EXP_MONTH:
			return {
				...state,
				subscription_card_exp_month: action.payload,
			};
		case SUBSCRIPTION_CARD_CVC:
			return {
				...state,
				subscription_card_cvc: action.payload,
			};
		case SUBSCRIPTION_LOADING:
			return {
				...state,
				subscription_loading: action.payload,
			};
		case SUBSCRIPTION_LOADING_MESSAGE:
			return {
				...state,
				subscription_loading_message: action.payload,
			};
		case SUBSCRIPTION_STEP:
			return {
				...state,
				subscription_step: action.payload,
			};
		case SUBSCRIPTION_CLEAR:
			return {
				...state,
				subscription_loading: false,
				subscription_loading_message: null,
				subscription_plan: null,
				subscription_card_name: "",
				subscription_card_number: "",
				subscription_card_exp_year: "",
				subscription_card_exp_month: "",
				subscription_card_cvc: "",
				subscription_step: 1,
				subscription_group_index: null,
				subscription_group_firstname: "",
				subscription_group_lastname: "",
				subscription_group_email: "",
				subscription_section: "detail",
			};
		case SUBSCRIPTION_SECTION:
			return {
				...state,
				subscription_section: action.payload,
			};
		case SUBSCRIPTION_GROUP_CLEAR:
			return {
				...state,
				subscription_group_index: null,
				subscription_group_firstname: "",
				subscription_group_lastname: "",
				subscription_group_email: "",
			};
		case SUBSCRIPTION_GROUP_EDIT:
			return {
				...state,
				subscription_group_index: action.payload.index,
				subscription_group_firstname: action.payload.firstname,
				subscription_group_lastname: action.payload.lastname,
				subscription_group_email: action.payload.email,
			};
		case SUBSCRIPTION_GROUP:
			return {
				...state,
				subscription_group: action.payload,
			};
		case SUBSCRIPTION_GROUP_ADD:
			return {
				...state,
				subscription_group_add: action.payload,
			};
		case SUBSCRIPTION_GROUP_MODAL:
			return {
				...state,
				subscription_group_modal: action.payload,
			};
		case SUBSCRIPTION_GROUP_FIRSTNAME:
			return {
				...state,
				subscription_group_firstname: action.payload,
			};
		case SUBSCRIPTION_GROUP_LASTNAME:
			return {
				...state,
				subscription_group_lastname: action.payload,
			};
		case SUBSCRIPTION_GROUP_EMAIL:
			return {
				...state,
				subscription_group_email: action.payload,
			};
		default:
			return { ...state };
	}
}
