import {
	PRACTICE_ACTIVITIES,
	PRACTICE_ACTIVITY_SELECTED,
	PRACTICE_LOADING,
	PRACTICE_ACTIVITIES_LIKED,
	PRACTICE_PERCENTAGE,
	PRACTICE_SELECTED_READINGS,
	PRACTICE_LIST_READINGS,
	PRACTICE_LIST_READINGS_LOADING,
	PRACTICE_LIST_PLAYLIST,
	PRACTICE_LIST_PLAYLIST_LOADING,
	PRACTICE_SELECTED_PLAYLIST,
	PRACTICE_DIGITAL_FAST_TUTORIAL,
	PRACTICE_DIGITAL_FAST_HOURS,
	PRACTICE_DIGITAL_FAST_MINUTES,
	PRACTICE_DIGITAL_SUBSECTION,
	PRACTICE_DIGITAL_FASTING_STATUS,
	PRACTICE_DIGITAL_FASTINGS,
	PRACTICE_DIGITAL_FASTINGS_LOADING,
	PRACTICE_DIGITAL_FASTINGS_FRIENDS,
	PRACTICE_DIGITAL_FASTINGS_MODAL,
	PRACTICE_DIGITAL_FASTINGS_USER,
	PRACTICE_DIGITAL_FASTINGS_CONGRATULATIONS,
	PRACTICE_DIGITAL_GRAPHICS,
	PRACTICE_INTERMITTENT_TUTORIAL,
	PRACTICE_INTERMITTENT_STATUS,
	PRACTICE_INTERMITTENT_GRAPH,
	PRACTICE_INTERMITTENT_HISTORIAL,
	PRACTICE_LIST_READINGS_VIEWS,
	PRACTICE_LIST_READINGS_PAGE,
} from "../types/practiceTypes";

const INITIAL_STATE = {
	pratice_loading: true,
	practice_activities: [],
	practice_activity_selected: null,
	practice_activities_liked: null,
	practice_total_activities: null,
	practice_activities_done: null,
	practice_activities_percentage: null,
	practice_selected_readings: null,
	practice_list_readings: [],
	practice_list_readings_view: [],
	practice_list_readings_page: 0,
	practice_list_readings_items: 14,
	practice_list_readings_loading: true,
	practice_selected_playlist: 0,
	practice_list_playlist: [],
	practice_list_playlist_loading: true,
	practice_digital_fast_tutorial: true,
	practice_digital_fast_hours: "00",
	practice_digital_fast_minutes: "00",
	practice_digital_subsection: "fasting",
	practice_digital_menu: [
		{ id: 1, name: "Mis ayunos", label: "fasting" },
		{ id: 2, name: "Amigos en ayunos", label: "friends" },
	],
	practice_digital_fasting_status: false,
	practice_digital_fasting_data: null,
	practice_digital_fastings: null,
	practice_digital_fastings_loading: true,
	practice_digital_fastings_friends: [],
	practice_digital_fastings_modal: false,
	practice_digital_fastings_user: null,
	practice_digital_fastings_congratulations: false,
	practice_digital_graph_days_week: null,
	practice_digital_graph_week: null,
	practice_digital_graph_month: null,
	practice_intermittent_tutorial: true,
	practice_intermittent_status: null,
	practice_intermittent_historial: null,
	practice_intermittent_graph_days_week: null,
	practice_intermittent_graph_week: null,
	practice_intermittent_graph_month: null,
};

export default function practiceReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case PRACTICE_ACTIVITIES:
			return {
				...state,
				practice_activities: action.payload,
			};
		case PRACTICE_ACTIVITY_SELECTED:
			return {
				...state,
				practice_activity_selected: action.payload,
			};
		case PRACTICE_LOADING:
			return {
				...state,
				pratice_loading: action.payload,
			};
		case PRACTICE_ACTIVITIES_LIKED:
			return {
				...state,
				practice_activities_liked: action.payload,
			};
		case PRACTICE_PERCENTAGE:
			return {
				...state,
				practice_total_activities: action.payload.total,
				practice_activities_done: action.payload.done,
				practice_activities_percentage: action.payload.percentage,
			};
		case PRACTICE_SELECTED_READINGS:
			return {
				...state,
				practice_selected_readings: action.payload,
			};
		case PRACTICE_LIST_READINGS:
			return {
				...state,
				practice_list_readings: action.payload,
				practice_list_readings_loading: false,
			};
		case PRACTICE_LIST_READINGS_LOADING:
			return {
				...state,
				practice_list_readings_loading: action.payload,
			};
		case PRACTICE_LIST_PLAYLIST:
			return {
				...state,
				practice_list_playlist: action.payload,
				practice_list_playlist_loading: false,
			};
		case PRACTICE_LIST_PLAYLIST_LOADING:
			return {
				...state,
				practice_list_playlist_loading: action.payload,
			};
		case PRACTICE_SELECTED_PLAYLIST:
			return {
				...state,
				practice_selected_playlist: action.payload,
			};
		case PRACTICE_DIGITAL_FAST_TUTORIAL:
			return {
				...state,
				practice_digital_fast_tutorial: action.payload,
			};
		case PRACTICE_DIGITAL_FAST_HOURS:
			return {
				...state,
				practice_digital_fast_hours: action.payload,
			};
		case PRACTICE_DIGITAL_FAST_MINUTES:
			return {
				...state,
				practice_digital_fast_minutes: action.payload,
			};
		case PRACTICE_DIGITAL_SUBSECTION:
			return {
				...state,
				practice_digital_subsection: action.payload,
			};
		case PRACTICE_DIGITAL_FASTING_STATUS:
			return {
				...state,
				practice_digital_fasting_status: action.payload.status,
				practice_digital_fasting_data: action.payload.data,
			};
		case PRACTICE_DIGITAL_FASTINGS:
			return {
				...state,
				practice_digital_fastings: action.payload,
			};
		case PRACTICE_DIGITAL_FASTINGS_LOADING:
			return {
				...state,
				practice_digital_fastings_loading: action.payload,
			};
		case PRACTICE_DIGITAL_FASTINGS_FRIENDS:
			return {
				...state,
				practice_digital_fastings_friends: action.payload,
			};
		case PRACTICE_DIGITAL_FASTINGS_MODAL:
			return {
				...state,
				practice_digital_fastings_modal: action.payload,
			};
		case PRACTICE_DIGITAL_FASTINGS_USER:
			return {
				...state,
				practice_digital_fastings_user: action.payload,
			};
		case PRACTICE_DIGITAL_FASTINGS_CONGRATULATIONS:
			return {
				...state,
				practice_digital_fastings_congratulations: action.payload,
			};
		case PRACTICE_DIGITAL_GRAPHICS:
			return {
				...state,
				practice_digital_graph_days_week: action.payload.week,
				practice_digital_graph_week: action.payload.graph_week,
				practice_digital_graph_month: action.payload.graph_month,
			};
		case PRACTICE_INTERMITTENT_TUTORIAL:
			return {
				...state,
				practice_intermittent_tutorial: action.payload,
			};
		case PRACTICE_INTERMITTENT_STATUS:
			return {
				...state,
				practice_intermittent_status: action.payload,
			};
		case PRACTICE_INTERMITTENT_HISTORIAL:
			return {
				...state,
				practice_intermittent_historial: action.payload,
			};
		case PRACTICE_INTERMITTENT_GRAPH:
			return {
				...state,
				practice_intermittent_graph_days_week: action.payload.week,
				practice_intermittent_graph_week: action.payload.graph_week,
				practice_intermittent_graph_month: action.payload.graph_month,
			};
		case PRACTICE_LIST_READINGS_VIEWS:
			return {
				...state,
				practice_list_readings_view: action.payload,
			};
		case PRACTICE_LIST_READINGS_PAGE:
			return {
				...state,
				practice_list_readings_page: action.payload,
			};
		default:
			return { ...state };
	}
}
