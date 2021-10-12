import {
	CONTENT_PROGRAMS,
	CONTENT_PRACTICES,
	CONTENT_ACTIVITIES,
	CONTENT_SONGS,
	CONTENT_VIDEOS,
	CONTENT_AUDIOS,
	CONTENT_INFOGRAPHICS,
	CONTENT_ARTICLE_CATEGORIES,
	CONTENT_ARTICLES,
	CONTENT_PLAYLISTS,
	CONTENT_LOADING,
	CONTENT_HAPPY_MOMENTS,
	CONTENT_TRAINING_ITEMS,
	CONTENT_EPIPHANIES,
	CONTENT_CONSCIUS_PHRASES,
} from "../types/contentTypes";
import axios from "axios";
import {
	GARDEN_DATA,
	GARDEN_CHANGE,
	GARDEN_PLANTS,
	GARDEN_MY_LIST_MENU,
} from "../types/gardenTypes";
import { PROGRAM_ACTIVITIES } from "../types/programTypes";
import { PRACTICE_ACTIVITIES } from "../types/practiceTypes";
import { api_endpoint as api_url } from "../../settings";

/**
 * Allocate resources to activity
 * @param {object} activity
 * @param {array} videos
 * @param {array} audios
 * @param {array} playlists
 * @param {array} articles
 * @param {array} infographics
 * @param {array} article_categories
 */
const allocateResourceForActivity = (
	activity,
	videos,
	audios,
	playlists,
	articles,
	infographics,
	article_categories
) => {
	let resource = [];
	let cod_resource = activity.cod_resource;
	switch (activity.type_resource) {
		case 1:
			resource = videos.filter((video) => video.id === cod_resource);
			break;
		case 2:
			resource = audios.filter((audio) => audio.id === cod_resource);
			break;
		case 3:
			resource = playlists.filter((playlist) => playlist.id === cod_resource);
			// resource[0].title;
			break;
		case 4:
			resource = articles.filter((article) => article.id === cod_resource);
			break;
		case 5:
			resource = infographics.filter(
				(infographic) => infographic.id === cod_resource
			);
			break;
		case 6:
			resource = article_categories.filter(
				(category) => category.id === cod_resource
			);
			break;
	}
	resource = resource.length > 0 ? resource[0] : [];
	return resource;
};

/**
 * Allocate resources to program activities
 * @param {array} activites
 * @param {array} activity_items
 * @param {array} videos
 * @param {array} audios
 * @param {array} playlists
 * @param {array} articles
 * @param {array} infographics
 * @param {array} article_categories
 */
const allocateResourceForProgramActivities =
	(
		activites,
		activity_items,
		videos,
		audios,
		playlists,
		articles,
		infographics
	) =>
	(dispatch, getState) => {
		const { program_sections } = getState().programReducer;
		let payload = activites.map((activity) => {
			let list_activities = activity_items.filter(
				(activity1) => activity1.cod_activity === activity.id
			);
			let sections = program_sections.map((section) => {
				let select_activities = list_activities.filter(
					(activity3) => section.cod_section === activity3.section
				);
				let resource = select_activities.map((activity3) => {
					let activity_data = allocateResourceForActivity(
						activity3,
						videos,
						audios,
						playlists,
						articles,
						infographics,
						null
					);
					return { ...activity3, resource: activity_data };
				});

				return { ...section, activities: resource };
			});

			return { ...activity, sections };
		});

		dispatch({
			type: PROGRAM_ACTIVITIES,
			payload,
		});
	};

/**
 * Allocate resources to practice activities
 * @param {array} activites
 * @param {array} activity_items
 * @param {array} videos
 * @param {array} audios
 * @param {array} playlists
 * @param {array} articles
 * @param {array} infographics
 * @param {array} article_categories
 */
const allocateResourceForPracticeActivities =
	(
		activites,
		activity_items,
		videos,
		audios,
		playlists,
		articles,
		infographics,
		article_categories
	) =>
	(dispatch, getState) => {
		let payload = activites.map((activity) => {
			let list_activities = activity_items.filter(
				(item) => item.cod_activity === activity.id
			);
			let resources = list_activities.map((activity2) => {
				let activity_data = allocateResourceForActivity(
					activity2,
					videos,
					audios,
					playlists,
					articles,
					infographics,
					article_categories
				);
				return { ...activity2, resource: activity_data };
			});

			return { ...activity, activities: resources };
		});
		dispatch({
			type: PRACTICE_ACTIVITIES,
			payload,
		});
	};

/**
 * Separate different contens per type:
 * "Programs - item.type === 1" or
 * "Practices - type === 2"
 * @param {object} payload
 */
export const distributeContent = (payload) => (dispatch) => {
	const {
		data: {
			activities,
			activity_items,
			songs,
			videos,
			audios,
			infographics,
			article_categories,
			articles,
			playlists,
			gardens,
			plants,
			happy_moments,
			training_items,
			epiphanies,
			conscious_phrases,
		},
	} = payload;
	// console.log("++++ ingresó a distributeContent....");
	let programs = activities.filter((item) => item.type === 1);
	let practices = activities.filter((item) => item.type === 2);
	// console.log("que hay en activities:---");
	// console.log(activities);
	// console.log(">>>> que hay en practices");
	// console.log(practices);

	dispatch(
		allocateResourceForProgramActivities(
			programs,
			activity_items,
			videos,
			audios,
			playlists,
			articles,
			infographics
		)
	);

	dispatch(
		allocateResourceForPracticeActivities(
			practices,
			activity_items,
			videos,
			audios,
			playlists,
			articles,
			infographics,
			article_categories
		)
	);
	let listPlaylists = playlists.filter((item) => parseInt(item.status) === 1);
	dispatch({
		type: CONTENT_PROGRAMS,
		payload: programs,
	});
	dispatch({
		type: CONTENT_PRACTICES,
		payload: practices,
	});
	dispatch({
		type: CONTENT_ACTIVITIES,
		payload: activity_items,
	});
	dispatch({
		type: CONTENT_SONGS,
		payload: songs,
	});
	dispatch({
		type: CONTENT_VIDEOS,
		payload: videos,
	});
	dispatch({
		type: CONTENT_AUDIOS,
		payload: audios,
	});
	dispatch({
		type: CONTENT_INFOGRAPHICS,
		payload: infographics,
	});
	dispatch({
		type: CONTENT_ARTICLE_CATEGORIES,
		payload: article_categories,
	});
	dispatch({
		type: CONTENT_ARTICLES,
		payload: articles,
	});
	dispatch({
		type: CONTENT_PLAYLISTS,
		payload: listPlaylists,
	});
	dispatch({
		type: CONTENT_LOADING,
		payload: false,
	});
	dispatch({
		type: CONTENT_HAPPY_MOMENTS,
		payload: happy_moments,
	});
	dispatch({
		type: CONTENT_TRAINING_ITEMS,
		payload: training_items,
	});
	dispatch({
		type: CONTENT_EPIPHANIES,
		payload: epiphanies,
	});
	dispatch({
		type: CONTENT_CONSCIUS_PHRASES,
		payload: conscious_phrases,
	});
	dispatch({
		type: GARDEN_DATA,
		payload: {
			data: gardens,
			status: false,
		},
	});
	dispatch({
		type: GARDEN_PLANTS,
		payload: plants,
	});
	if (gardens.length) {
		dispatch({
			type: GARDEN_CHANGE,
			payload: gardens[0],
		});
		dispatch({
			type: GARDEN_MY_LIST_MENU,
			payload: gardens.slice(1, gardens.length),
		});
	}
};

/**
 * Get different contents
 */
export const getAllContents = () => (dispatch) => {
	let endTime = Date.now() + 60 * 60 * 1000;
	console.log("Llamando nuevos datos.....................");
	axios
		.get(`${api_url}/v1/init`)
		.then((res) => {
			console.log(">>>>> aquí está toda la data en res data");
			console.log(res);
			if (res.data) {
				let saveData = {
					data: res.data,
					endTime,
				};
				console.log("**** SI ENTRÓ PORQUE hay re.data, va a distributeContent");
				dispatch(distributeContent(res.data));
				localStorage.setItem("@MUNAY:allContents", JSON.stringify(saveData));
			}
		})
		.catch((err) => console.log("Error initData: ", err));
};

/**
 * Show or get contents
 */
export const allContents = () => (dispatch) => {
	dispatch(getAllContents());
	const res1 = localStorage.getItem("@MUNAY:allContents");
	if (res1) {
		const res = JSON.parse(res1);
		if (res.endTime > Date.now()) {
			dispatch(distributeContent(res.data));
		} else {
			dispatch(getAllContents());
		}
	} else {
		dispatch(getAllContents());
	}
	// localStorage
	// 	.getItem("@MUNAY:allContents")
	// 	.then((res) => {
	// 		res = res ? JSON.parse(res) : null;
	// 		if (res && res.endTime > Date.now()) {
	// 			console.log("Mostramos los datos guardados.....................");
	// 			dispatch(distributeContent(res.data));
	// 		} else {
	// 			dispatch(getAllContents());
	// 		}
	// 	})
	// 	.catch((err) => {
	// 		console.log("Error allContents: ", err);
	// 		dispatch(getAllContents());
	// 	});
};
