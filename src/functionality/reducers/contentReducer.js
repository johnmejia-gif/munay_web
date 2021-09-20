import {
	CONTENT_PROGRAMS,
	CONTENT_PRACTICES,
	CONTENT_ACTIVITIES,
	CONTENT_SONGS,
	CONTENT_AUDIOS,
	CONTENT_INFOGRAPHICS,
	CONTENT_ARTICLE_CATEGORIES,
	CONTENT_ARTICLES,
	CONTENT_PLAYLISTS,
	CONTENT_PLAYLIST_SONGS,
	CONTENT_VIDEOS,
	CONTENT_LOADING,
	CONTENT_HAPPY_MOMENTS,
	CONTENT_TRAINING_ITEMS,
	CONTENT_EPIPHANIES,
	CONTENT_CONSCIUS_PHRASES,
} from "../types/contentTypes";

const INITIAL_STATE = {
	content_loading: true,
	programs: [],
	practices: [],
	activities: [],
	songs: [],
	videos: [],
	audios: [],
	infographics: [],
	article_categories: [],
	articles: [],
	playlists: [],
	playlist_songs: [],
	happy_moments: [],
	training_items: [],
	epiphanies: [],
	conscious_phrases: [],
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CONTENT_PROGRAMS:
			return {
				...state,
				programs: action.payload,
			};
		case CONTENT_PRACTICES:
			console.log("<<<< está cambiando practices en CONTENT_PRACTICES");
			return {
				...state,
				practices: action.payload,
			};
		case CONTENT_ACTIVITIES:
			return {
				...state,
				activities: action.payload,
			};
		case CONTENT_SONGS:
			return {
				...state,
				songs: action.payload,
			};
		case CONTENT_VIDEOS:
			return {
				...state,
				videos: action.payload,
			};
		case CONTENT_AUDIOS:
			return {
				...state,
				audios: action.payload,
			};
		case CONTENT_INFOGRAPHICS:
			return {
				...state,
				infographics: action.payload,
			};
		case CONTENT_ARTICLE_CATEGORIES:
			return {
				...state,
				article_categories: action.payload,
			};
		case CONTENT_ARTICLES:
			return {
				...state,
				articles: action.payload,
			};
		case CONTENT_PLAYLISTS:
			return {
				...state,
				playlists: action.payload,
			};
		case CONTENT_PLAYLIST_SONGS:
			return {
				...state,
				playlist_songs: action.payload,
			};
		case CONTENT_LOADING:
			return {
				...state,
				content_loading: action.payload,
			};
		case CONTENT_HAPPY_MOMENTS:
			return {
				...state,
				happy_moments: action.payload,
			};
		case CONTENT_TRAINING_ITEMS:
			return {
				...state,
				training_items: action.payload,
			};
		case CONTENT_EPIPHANIES:
			return {
				...state,
				epiphanies: action.payload,
			};
		case CONTENT_CONSCIUS_PHRASES:
			return {
				...state,
				conscious_phrases: action.payload,
			};
		default:
			return { ...state };
	}
};
