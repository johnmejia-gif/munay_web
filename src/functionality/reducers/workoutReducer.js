import {
	WORKOUT_SELECT,
	WORKOUT_BUTTON,
	WORKOUT_REDIRECT,
	WORKOUT_CLEAR,
	WORKOUT_MESSAGE,
	WORKOUT_TRAINING,
	WORKOUT_HAPPY_MOMENT,
	WORKOUT_DAY_MOMENT,
	WORKOUT_OPTIONS,
	WORKOUT_ACTIVITIES,
	WORKOUT_NO_REPEAT,
} from "../types/workoutTypes";

const INITIAL_STATE = {
	trainig_options: [
		{
			id: 1,
			name: "Retos",
			icon: "challenges",
			resource_prize: 1,
		},
		{
			id: 2,
			name: "Entrenamientos\nmentales",
			icon: "mental-training",
			resource_prize: 2,
		},
		{
			id: 3,
			name: "Entrenamientos\nemocionales",
			icon: "emotional-training",
			resource_prize: 4,
		},
		{
			id: 4,
			name: "Entrenamientos\nde energía",
			icon: "energy-training",
			resource_prize: 3,
		},
		{
			id: 5,
			name: "Audios",
			icon: "audios",
		},
		{
			id: 6,
			name: "Lectura\nconsciente",
			icon: "conscious-reading",
			resource_prize: 2,
		},
		{
			id: 7,
			name: "Música\nconsciente",
			icon: "conscious-music",
		},
		{
			id: 8,
			name: "Vivero",
			icon: "greenhouse",
		},
		{
			id: 9,
			name: "WriteNow",
			icon: "write",
		},
		{
			id: 10,
			name: "FlushNow",
			icon: "flush-now",
		},
		{
			id: 11,
			name: "Momentos\nde felicidad",
			icon: "happy-moments",
		},
		{
			id: 12,
			name: "Intuits",
			icon: "intuits",
		},
		{
			id: 13,
			name: "Comparte\nla felicidad",
			icon: "happy-sharer",
		},
		{
			id: 14,
			name: "Entrenamientos\nglobales",
			icon: "global-training",
		},
		{
			id: 15,
			name: "Ayuno\ndigital",
			icon: "time",
		},
	],
	roulette_select: {},
	roulette_step: 0,
	roulette_view_button: true,
	roulette_redirect: false,
	workout_message: "",
	workout_training: null,
	workout_happy_moment: null,
	workout_day_moment: "",
	workout_options: [],
	workout_activities: [],
	workout_no_repeat: [],
};

export default function workoutReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case WORKOUT_SELECT:
			return {
				...state,
				roulette_select: action.payload.select,
				roulette_step: action.payload.step,
			};
		case WORKOUT_BUTTON:
			return {
				...state,
				roulette_view_button: action.payload,
			};
		case WORKOUT_REDIRECT:
			return {
				...state,
				roulette_redirect: action.payload,
			};
		case WORKOUT_CLEAR:
			return {
				...state,
				roulette_redirect: false,
				roulette_step: 0,
			};
		case WORKOUT_MESSAGE:
			return {
				...state,
				workout_message: action.payload,
			};
		case WORKOUT_TRAINING:
			return {
				...state,
				workout_training: action.payload,
			};
		case WORKOUT_HAPPY_MOMENT:
			return {
				...state,
				workout_happy_moment: action.payload,
			};
		case WORKOUT_DAY_MOMENT:
			return {
				...state,
				workout_day_moment: action.payload,
			};
		case WORKOUT_OPTIONS:
			return {
				...state,
				workout_options: action.payload,
			};
		case WORKOUT_ACTIVITIES:
			return {
				...state,
				workout_activities: action.payload,
			};
		case WORKOUT_NO_REPEAT:
			return {
				...state,
				workout_no_repeat: action.payload,
			};
		default:
			return { ...state };
	}
}
