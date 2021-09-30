import {
	PROGRAM_TOOLTIP_SELECT,
	PROGRAM_DESCRIPTION,
	PROGRAM_SECTIONS,
	PROGRAM_LOADING,
	PROGRAM_VIEW_ACTIVITIES,
	PROGRAM_ACTIVITIES,
	PROGRAM_STATUS,
	PROGRAM_MODAL,
	PROGRAM_MODAL_SHARER,
} from "../types/programTypes";

const INITIAL_STATE = {
	program_tooltip_select: 0,
	program_description: "",
	program_loading: true,
	program_sections: [
		{ cod_section: 1, name: "Introducción" },
		{ cod_section: 2, name: "Prácticas" },
		{ cod_section: 3, name: "Entrenamientos diarios" },
		{ cod_section: 4, name: "Reto" },
		{ cod_section: 5, name: "Música" },
		{ cod_section: 6, name: "Lectura consciente" },
		{ cod_section: 7, name: "Infografías" },
	],
	program_activities: [],
	program_view_activities: [],
	program_status: false,
	program_modal: false,
	program_modal_sharer: false,
	program_modal_message: "",
};

export default function programReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case PROGRAM_TOOLTIP_SELECT:
			return {
				...state,
				program_tooltip_select: action.payload,
			};
		case PROGRAM_DESCRIPTION:
			return {
				...state,
				program_description: action.payload,
			};
		case PROGRAM_LOADING:
			return {
				...state,
				program_loading: action.payload,
			};
		case PROGRAM_SECTIONS:
			return {
				...state,
				program_sections: action.payload,
			};
		case PROGRAM_VIEW_ACTIVITIES:
			return {
				...state,
				program_view_activities: action.payload,
			};
		case PROGRAM_ACTIVITIES:
			return {
				...state,
				program_activities: action.payload,
			};
		case PROGRAM_STATUS:
			return {
				...state,
				program_status: action.payload,
			};
		case PROGRAM_MODAL:
			return {
				...state,
				program_modal: action.payload.status,
				program_modal_message: action.payload.message,
			};
		case PROGRAM_MODAL_SHARER:
			return {
				...state,
				program_modal_sharer: action.payload,
			};
		default:
			return { ...state };
	}
}
