import {
	GLOBAL_NEW_MESSAGES,
	GLOBAL_SPLASH,
	GLOBAL_FONTS,
	GLOBAL_SIGNOUT,
	GLOBAL_CONTENT,
	GLOBAL_USERS_ACTIVE,
	GLOBAL_TOOLTIP,
	GLOBAL_SHARE_IMAGE,
	GLOBAL_INTRO,
	GLOBAL_TUTORIAL,
	GLOBAL_PRIVACY_POLICIES,
	GLOBAL_TERMS_CONDITIONS,
	GLOBAL_USER_PROFILE,
	GLOBAL_INTUIT_MESSAGE,
	GLOBAL_ORIENTATION,
	GLOBAL_DEVICE_SIZE,
} from "../types/globalTypes";

const active02 = "../../../assets/images/active-02.png";

const INITIAL_STATE = {
	new_messages: 0,
	global_splash: true,
	global_fonts: false,
	global_signout: false,
	global_background: "#FFBA24",
	global_mode: "light-content",
	global_section: "happy_program",
	global_active: active02,
	global_left_select: "",
	global_menu_left: "",
	global_menu_right: "",
	global_button_my_way: {
		content: "my_way",
		mode: "dark-content",
		background: "#5ADDB8",
		iconName: "my-way",
		name1: "Mi",
		name2: "Camino",
		backgroundIcon: "rgba(0,0,0,0)",
		topIcon: 8,
		colorIcon: "black",
		bottomIcon: 0,
	},
	global_button_happy_program: {
		content: "happy_program",
		mode: "light-content",
		background: "#FFBA24",
		iconName: "happy-program",
		name1: "Programa",
		name2: "De Felicidad",
		backgroundIcon: "black",
		topIcon: -16,
		colorIcon: "white",
		bottomIcon: 10,
	},
	global_button_workout_day: {
		content: "workout_day",
		mode: "light-content",
		background: "#FE6417",
		iconName: "workout-day",
		name1: "Momento",
		name2: "Feliz",
		backgroundIcon: "rgba(0,0,0,0)",
		topIcon: 8,
		colorIcon: "black",
		bottomIcon: 0,
	},
	global_button_happy_practice: {
		content: "happy_practice",
		mode: "light-content",
		background: "#A700FF",
		iconName: "happy-practice",
		name1: "Prácticas",
		name2: "De Felicidad",
		backgroundIcon: "rgba(0,0,0,0)",
		topIcon: 8,
		colorIcon: "black",
		bottomIcon: 0,
	},
	global_button_munay_social: {
		content: "munay_social",
		mode: "light-content",
		background: "#00BAFF",
		iconName: "social",
		name1: "Munay",
		name2: "Social",
		backgroundIcon: "rgba(0,0,0,0)",
		topIcon: 8,
		colorIcon: "black",
		bottomIcon: 0,
	},
	global_users_active: [],
	global_users_loading: true,
	global_tooltip: false,
	global_tooltip_title: "",
	global_tooltip_message: "",
	global_tooltip_open_subscription: false,
	global_share_image: [],
	global_intro: true,
	global_tutorial: false,
	global_privacy_policies: false,
	global_terms_conditions: false,
	global_user_profile: null,
	global_intuit_message: false,
	global_orientation: "PORTRAIT",
	global_device_width: 0,
	global_device_height: 0,
};

export default function globalReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case GLOBAL_SPLASH:
			return {
				...state,
				global_splash: action.payload,
			};
		case GLOBAL_NEW_MESSAGES:
			return {
				...state,
				new_messages: action.payload,
			};
		case GLOBAL_FONTS:
			return {
				...state,
				global_fonts: action.payload,
			};
		case GLOBAL_SIGNOUT:
			return {
				...state,
				global_signout: action.payload,
			};
		case GLOBAL_CONTENT:
			return {
				...state,
				global_background: action.payload.background,
				global_mode: action.payload.mode,
				global_section: action.payload.content,
				global_active: action.payload.active,
				global_left_select: action.payload.left,
				global_menu_left: action.payload.left,
				global_menu_right: action.payload.menu_right,
				global_button_my_way: action.payload.global_button_my_way,
				global_button_happy_program: action.payload.global_button_happy_program,
				global_button_workout_day: action.payload.global_button_workout_day,
				global_button_happy_practice:
					action.payload.global_button_happy_practice,
				global_button_munay_social: action.payload.global_button_munay_social,
			};
		case GLOBAL_USERS_ACTIVE:
			return {
				...state,
				global_users_active: action.payload,
				global_users_loading: false,
			};
		case GLOBAL_TOOLTIP:
			return {
				...state,
				global_tooltip: action.payload.status,
				global_tooltip_title: action.payload.title,
				global_tooltip_message: action.payload.message,
				global_tooltip_open_subscription: action.payload.subscription,
			};
		case GLOBAL_SHARE_IMAGE:
			return {
				...state,
				global_share_image: action.payload,
			};
		case GLOBAL_INTRO:
			return {
				...state,
				global_intro: action.payload,
			};
		case GLOBAL_TUTORIAL:
			return {
				...state,
				global_tutorial: action.payload,
			};
		case GLOBAL_PRIVACY_POLICIES:
			return {
				...state,
				global_privacy_policies: action.payload,
			};
		case GLOBAL_TERMS_CONDITIONS:
			return {
				...state,
				global_terms_conditions: action.payload,
			};
		case GLOBAL_USER_PROFILE:
			return {
				...state,
				global_user_profile: action.payload,
			};
		case GLOBAL_INTUIT_MESSAGE:
			return {
				...state,
				global_intuit_message: action.payload,
			};
		case GLOBAL_ORIENTATION:
			return {
				...state,
				global_orientation: action.payload,
			};
		case GLOBAL_DEVICE_SIZE:
			return {
				...state,
				global_device_width: action.payload.width,
				global_device_height: action.payload.height,
			};
		default:
			return {
				...state,
			};
	}
}
