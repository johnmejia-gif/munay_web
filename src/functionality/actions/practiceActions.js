import {
	PRACTICE_LOADING,
	PRACTICE_ACTIVITY_SELECTED,
	PRACTICE_ACTIVITIES_LIKED,
	PRACTICE_PERCENTAGE,
	PRACTICE_SELECTED_READINGS,
	PRACTICE_LIST_READINGS_LOADING,
	PRACTICE_LIST_READINGS,
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
	PRACTICE_DIGITAL_GRAPHICS,
	PRACTICE_DIGITAL_FASTINGS_CONGRATULATIONS,
	PRACTICE_INTERMITTENT_TUTORIAL,
	PRACTICE_INTERMITTENT_STATUS,
	PRACTICE_INTERMITTENT_GRAPH,
	PRACTICE_INTERMITTENT_HISTORIAL,
	PRACTICE_LIST_READINGS_VIEWS,
	PRACTICE_LIST_READINGS_PAGE,
} from "../types/practiceTypes";
import { USER_ALL_DATA } from "../types/userTypes";
import axios from "axios";
import FirebaseActions from "./FirebaseActions";
import { PLAYLIST_DETAIL } from "../types/playlistTypes";
// import { Alert } from "react-native";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { userUpdate } from "./userActions";
import { api_endpoint as api_url } from "../../settings";

/**
 * Change status render loading
 * @param {boolean} payload
 */
export const practiceChanegeLoading = (payload) => (dispatch) => {
	if (payload) {
		dispatch({
			type: PRACTICE_ACTIVITY_SELECTED,
			payload: null,
		});
	}
	dispatch({
		type: PRACTICE_LOADING,
		payload,
	});
};

/**
 * Select avtivity
 * @param {string} cod_activity
 */
export const practiceSelectedActivity =
	(cod_activity) => (dispatch, getState) => {
		dispatch(practiceChanegeLoading(true));
		dispatch({
			type: PRACTICE_LIST_READINGS,
			payload: [],
		});
		dispatch({
			type: PRACTICE_LIST_PLAYLIST,
			payload: [],
		});

		const { practice_activities } = getState().practiceReducer;

		let practice = practice_activities.filter(
			(item) => item.id === cod_activity
		);

		if (practice.length > 0) {
			dispatch({
				type: PRACTICE_ACTIVITY_SELECTED,
				payload: practice[0],
			});
			setTimeout(() => {
				dispatch(practiceChanegeLoading(false));
			}, 100);
		} else {
			axios
				.get(`${api_url}/v1/activities/practice/${cod_activity}`)
				.then((res) => {
					if (res.data) {
						dispatch({
							type: PRACTICE_ACTIVITY_SELECTED,
							payload: res.data.data,
						});
						dispatch(practiceChanegeLoading(false));
					}
				})
				.catch((err) => console.log("Error initData: ", err));
		}
	};

/**
 * Get list like activities
 */
export const practiceListLikedActivities = () => async (dispatch, getState) => {
	const { user } = getState().userReducer;
	console.log("///// en practiceListLinkedActivities el user es:", { user });
	let payload = await FirebaseActions.getDocsPerUser(
		"liked_activities",
		user.uid
	);

	dispatch({
		type: PRACTICE_ACTIVITIES_LIKED,
		payload,
	});
};

/**
 * Like or dislike to activity
 * @param {string} cod_activity
 */
// export const practiceActivityLike = (cod_activity) => async (dispatch, getState) => {
//   const { user } = getState().userReducer;
//   const { practice_activities_liked } = getState().practiceReducer;

//   let data = {};
//   let isLiked = practice_activities_liked.filter(activity => (activity.cod_activity === cod_activity));

//   if (isLiked.length > 0) {
//     data = isLiked[0];
//     data.updated_on = FirebaseActions.getFormatDate();
//     data.status = !data.status;
//     FirebaseActions.saveDataCollectionWithSet('liked_activities', data.id, data);
//   } else {
//     data.cod_activity = cod_activity;
//     data.cod_user = user.uid;
//     data.status = true;
//     data.created_on = FirebaseActions.getFormatDate();

//     let id = await FirebaseActions.saveDataCollectionWithAdd('liked_activities', data)
//       .then(res => {
//         return res.id;
//       })
//       .catch(error => console.log('Error practiceActivityLike: ', error));
//     if (id) {
//       data.id = id;
//     }
//   }

//   let updateData = practice_activities_liked.filter(activity => (activity.cod_activity !== cod_activity));
//   updateData.push(data);

//   dispatch({
//     type: PRACTICE_ACTIVITIES_LIKED,
//     payload: updateData,
//   });
// }

/**
 * View percetnage to activities complete
 * @param {string} cod_activity
 */
// export const practicePercentageOfCompletion = (cod_activity) => (dispatch, getState) => {
//   const { user_activities_historial } = getState().userReducer;
//   const { practice_activities } = getState().practiceReducer;

//   let practice = practice_activities.filter((item) => (item.id === cod_activity));
//   let activities = practice[0].activities.filter(item => (item.type_resource !== 3 && item.type_resource !== 1));

//   let totalActivities = activities.length

//   if (totalActivities > 1) {
//     let activitiesDone = user_activities_historial.filter(
//       item => (item.complement.cod_program === cod_activity)
//     );
//     let totalActivitiesDone = activitiesDone.length;
//     let percentage = Math.round((totalActivitiesDone * 100) / totalActivities);
//     percentage = (percentage > 100) ? 100 : percentage;

//     dispatch({
//       type: PRACTICE_PERCENTAGE,
//       payload: {
//         total: totalActivities,
//         done: totalActivitiesDone,
//         percentage,
//       }
//     });
//   }
// }

/**
 * Select and filter to view list readings
 * @param {string} cod_selected
 */
// export const practiceSelectReading = (cod_selected) => (dispatch, getState) => {
//   const { practice_activity_selected, practice_list_readings_items } = getState().practiceReducer;
//   let { activities } = practice_activity_selected;
//   let listActivities = activities.filter(item => (parseInt(item.type_resource) === 4));

//   if (cod_selected !== 'all') {
//     listActivities = listActivities.filter(activity => (activity.resource.cod_category.indexOf(cod_selected) >= 0));
//   }

//   dispatch({
//     type: PRACTICE_LIST_READINGS_LOADING,
//     payload: true,
//   });
//   dispatch({
//     type: PRACTICE_SELECTED_READINGS,
//     payload: cod_selected,
//   });
//   setTimeout(() => {
//     dispatch({
//       type: PRACTICE_LIST_READINGS,
//       payload: listActivities,
//     });
//     dispatch({
//       type: PRACTICE_LIST_READINGS_VIEWS,
//       payload: listActivities.slice(0, practice_list_readings_items),
//     });
//     dispatch({
//       type: PRACTICE_LIST_READINGS_PAGE,
//       payload: 1,
//     });
//   }, 10);
// }

/**
 * Add page to view more readings
 */
// export const practiceReadingAddPage = () => (dispatch, getState) => {
//   let {
//     practice_list_readings_items, practice_list_readings, practice_list_readings_page,
//   } = getState().practiceReducer;

//   let maxPages = Math.round((practice_list_readings.length) / practice_list_readings_items);
//   if (practice_list_readings_page <= maxPages) {
//     practice_list_readings_page = practice_list_readings_page + 1;
//     let listReadings = practice_list_readings.slice(0, (practice_list_readings_page * practice_list_readings_items));
//     dispatch({
//       type: PRACTICE_LIST_READINGS_VIEWS,
//       payload: listReadings,
//     });
//     dispatch({
//       type: PRACTICE_LIST_READINGS_PAGE,
//       payload: practice_list_readings_page,
//     });
//   }
// }

/**
 * Select to playlist
 * @param {int} position
 */
// export const practiceSelectPlaylist = (position) => (dispatch, getState) => {
//   const { playlists } = getState().contentReducer;
//   let playlist = playlists[position];

//   dispatch({
//     type: PRACTICE_LIST_PLAYLIST_LOADING,
//     payload: true,
//   });
//   dispatch({
//     type: PRACTICE_SELECTED_PLAYLIST,
//     payload: position,
//   });
//   setTimeout(() => {
//     dispatch({
//       type: PRACTICE_LIST_PLAYLIST,
//       payload: playlist,
//     });
//     dispatch({
//       type: PLAYLIST_DETAIL,
//       payload: playlist,
//     });
//   }, 10);
// }

/**
 * Show or hidden digital fasting tutorial
 * @param {boolean} payload
 */
// export const practiceDigitalFastTutorial = (payload) => (dispatch, getState) => {
//   const { user_all_data } = getState().userReducer;

//   if (
//     !user_all_data.tutorials || user_all_data.tutorials.digital_fast === undefined ||
//     user_all_data.tutorials.digital_fast === null
//   ) {
//     if (!user_all_data.tutorials) {
//       user_all_data.tutorials = {
//         digital_fast: true,
//       }
//     } else {
//       user_all_data.tutorials.digital_fast = true;
//     }

//     dispatch(userUpdate(user_all_data));
//   }

//   dispatch({
//     type: PRACTICE_DIGITAL_FAST_TUTORIAL,
//     payload
//   });
// }

/**
 * Change hour to digital fasting
 * @param {string} payload
 */
// export const practiceDigitalFastHours = (payload) => (dispatch) => {
//   dispatch({
//     type: PRACTICE_DIGITAL_FAST_HOURS,
//     payload
//   });
// }

/**
 * Change minutes to digital fasting
 * @param {string} payload
 */
// export const practiceDigitalFastMinutes = (payload) => (dispatch) => {
//   dispatch({
//     type: PRACTICE_DIGITAL_FAST_MINUTES,
//     payload
//   });
// }

/**
 * Change view section
 * @param {string} payload
 */
// export const practiceChangeSubsction = (payload) => (dispatch) => {
//   dispatch({
//     type: PRACTICE_DIGITAL_SUBSECTION,
//     payload
//   });
// }

/**
 * Show or hidden modal digital fasting per status
 * @param {boolean} status
 * @param {object} data
 */
// export const practiceModalDigitalFasting = (status, data) => (dispatch, getState) => {
//   if (!status && !data) {
//     dispatch(practiceDigitalFastingsCongratulations(true));
//     let {
//       practice_digital_fasting_data: fasting, practice_digital_fastings: fastings,
//     } = getState().practiceReducer;
//     let { user_all_data } = getState().userReducer;

//     fasting.is_active = false;
//     let expiration_date = new Date(fasting.expiration_date * 1000);
//     let date_now = Date.now();
//     let res_date = (expiration_date - date_now + 1000) / 1000;
//     let minutes = Math.floor(res_date / 60 % 60);
//     let hours = Math.floor(res_date / 3600 % 24);
//     if (minutes > 0 || hours > 0) {
//       let total_minutes = (hours * 60) + minutes;
//       total_minutes = fasting.total_minutes - total_minutes;
//       fasting.minutes_done = total_minutes;
//     } else {
//       fasting.minutes_done = fasting.total_minutes;
//     }
//     // This counter is to add the number of entries created
//     if (user_all_data && user_all_data.content_counts) {
//       if (!user_all_data.content_counts.digital_fasting) {
//         user_all_data.content_counts.digital_fasting = 1;
//       } else {
//         user_all_data.content_counts.digital_fasting = user_all_data.content_counts.digital_fasting + 1;
//       }
//     } else {
//       user_all_data.content_counts = {
//         digital_fasting: 1
//       }
//     }

//     // This counter serves to validate the amount of resources to give
//     if (user_all_data && user_all_data.counts) {
//       if (!user_all_data.counts.digital_fasting) {
//         user_all_data.counts.digital_fasting = fasting.minutes_done;
//       } else {
//         user_all_data.counts.digital_fasting = user_all_data.counts.digital_fasting + fasting.minutes_done;
//       }
//     } else {
//       user_all_data.counts = {
//         digital_fasting: fasting.minutes_done
//       }
//     }

//     if (user_all_data.counts.digital_fasting >= 60) {
//       let add_water = Math.floor(user_all_data.counts.digital_fasting / 60);
//       user_all_data.resources.water = user_all_data.resources.water + add_water;
//       user_all_data.counts.digital_fasting = Math.floor(user_all_data.counts.digital_fasting % 60);
//     }

//     if (fastings) {
//       fastings.push(fasting);
//     } else {
//       fastings = [fasting];
//     }

//     dispatch({
//       type: PRACTICE_DIGITAL_FASTINGS,
//       payload: fastings,
//     });
//     FirebaseActions.saveDataCollectionWithSet('users', user_all_data.uid, user_all_data);
//     AsyncStorage.setItem('@Munay:userData', JSON.stringify(user_all_data));
//     AsyncStorage.removeItem('@Munay:digitalFasting');
//     FirebaseActions.saveDataCollectionWithSet('digital_fasting', fasting.id, fasting);
//   } else {
//     AsyncStorage.setItem('@Munay:digitalFasting', JSON.stringify(data));
//   }
//   dispatch({
//     type: PRACTICE_DIGITAL_FASTING_STATUS,
//     payload: {
//       status, data
//     }
//   });
// }

/**
 * Show or hidden congratulations digital fasting
 */
// export const practiceDigitalFastingsCongratulations = (payload) => (dispatch) => {
//   dispatch({
//     type: PRACTICE_DIGITAL_FASTINGS_CONGRATULATIONS,
//     payload,
//   });
// }

/**
 * Validate if digital fasting is active
 */
// export const practiceDigitalFastigActive = () => (dispatch) => {
//   AsyncStorage.getItem('@Munay:digitalFasting')
//     .then(res => {
//       if (res) {
//         res = JSON.parse(res);
//         dispatch(practiceModalDigitalFasting(false, res));

//         let expiration_date = new Date(res.expiration_date * 1000);
//         let date_now = Date.now();
//         let res_date = (expiration_date - date_now + 1000) / 1000;
//         if (res_date > 1) {
//           dispatch(practiceModalDigitalFasting(true, res));
//         } else {
//           dispatch(practiceModalDigitalFasting(false, null));
//         }
//       }
//     })
//     .catch(error => console.log('Error practiceDigitalFastigActive: ', error));
// }

/**
 * Save digital fasting
 */
// export const practiceSaveDigitalFast = () => (dispatch, getState) => {
//   let {
//     practice_digital_fast_hours: hours, practice_digital_fast_minutes: minutes,
//   } = getState().practiceReducer;
//   let {
//     user_all_data,
//   } = getState().userReducer;
//   hours = parseInt(hours);
//   minutes = parseInt(minutes);

//   if (hours === 0 && minutes === 0) {
//     Alert.alert('Upsss!!!', 'Debes indicar el tiempo para el ayuno digital.');
//     return null;
//   }

//   let dateNow = Math.round(Date.now() / 1000);
//   let endMinutes = (hours * 60) + minutes;
//   let expiration_date = dateNow + (endMinutes * 60);
//   let currentDate = FirebaseActions.getFormatDate()
//   let data = {
//     cod_user: user_all_data.uid,
//     initial_date: dateNow,
//     expiration_date,
//     created_on: currentDate,
//     total_minutes: endMinutes,
//     minutes_done: 0,
//     is_active: true,
//   };

//   dispatch(
//     practiceModalDigitalFasting(true, data)
//   );

//   if (!user_all_data.last_digital_fast) {
//     user_all_data.last_digital_fast = currentDate;
//     if (user_all_data.counts) {
//       user_all_data.counts.digital_fasting_continuous = 1;
//     } else {
//       user_all_data.counts = {
//         digital_fasting_continuous: 1,
//       }
//     }
//   } else {
//     if (user_all_data.last_digital_fast !== currentDate) {
//       let last = new Date(user_all_data.last_digital_fast);
//       let now = new Date(currentDate);
//       let is_continuous = Math.floor((now - last) / (24 * 60 * 60 * 1000));

//       if (is_continuous <= 1) {
//         if (user_all_data.counts) {
//           let total = (user_all_data.counts.digital_fasting_continuous) ?
//             (user_all_data.counts.digital_fasting_continuous + 1)
//             : 1;
//           user_all_data.counts.digital_fasting_continuous = total;
//         } else {
//           user_all_data.counts = {
//             digital_fasting_continuous: 1,
//           }
//         }
//       } else {
//         user_all_data.counts.digital_fasting_continuous = 1;
//       }
//       user_all_data.last_digital_fast = currentDate;
//     }
//   }

//   FirebaseActions.saveDataCollectionWithAdd('digital_fasting', data)
//   .then(res => {
//     if (res.id) {
//       data.id = res.id;
//     }
//     dispatch(
//       practiceModalDigitalFasting(true, data)
//     );
//   })
//   .catch(error => console.log('Error practiceSaveDigitalFast: ', error));
//   dispatch(userUpdate(user_all_data));
// }

/**
 * Get historial digital fasting
 */
// export const practiceDigitalFastingHistorial = () => async (dispatch, getState) => {
//   const { user } = getState().userReducer;

//   let response = await FirebaseActions.getHistorialDigitalFasting(user.uid);
//   dispatch({
//     type: PRACTICE_DIGITAL_FASTINGS,
//     payload: response,
//   });
// }

/**
 * Get list to friends in digital fasting
 */
// export const practiceDigitalFastingFriends = () => async (dispatch, getState) => {
//   const { user } = getState().userReducer;
//   dispatch({
//     type: PRACTICE_DIGITAL_FASTINGS_LOADING,
//     payload: true,
//   });

//   await axios.get(`${api_url}/v1/digital-fasting/accompanying/${user.uid}`)
//       .then(res => {
//         if (res.data) {
//           dispatch({
//             type: PRACTICE_DIGITAL_FASTINGS_LOADING,
//             payload: false,
//           });
//           dispatch({
//             type: PRACTICE_DIGITAL_FASTINGS_FRIENDS,
//             payload: res.data.data,
//           });
//         }
//       })
//       .catch(err => console.log('Error practiceDigitalFastingFriends: ', err));
// }

/**
 * Show or hidden user modal detail digital fasting
 * @param {boolean} status
 * @param {object} user
 */
// export const practiceDigitalFastigOpenUser = (status, user) => (dispatch) => {
//   dispatch({
//     type: PRACTICE_DIGITAL_FASTINGS_MODAL,
//     payload: status,
//   });
//   dispatch({
//     type: PRACTICE_DIGITAL_FASTINGS_USER,
//     payload: user,
//   });
// }

/**
 * Get data to digital fasting graph
 */
// export const practiceDigitalFastingGraph = () => async (dispatch, getState) => {
//   const { user_all_data } = getState().userReducer;
//   dispatch({
//     type: PRACTICE_DIGITAL_GRAPHICS,
//     payload: {
//       graph_week: null,
//       week: null,
//       graph_month: null,
//     },
//   });
//   let currentDate = FirebaseActions.getFormatDate();
//   currentDate = currentDate.split('/').join('-');

//   await axios.get(`${api_url}/v1/historial/digital-fasting/${user_all_data.uid}/${currentDate}`)
//     .then(res => {
//       if (res.data) {
//         dispatch({
//           type: PRACTICE_DIGITAL_GRAPHICS,
//           payload: res.data.data,
//         });
//       }
//     })
//     .catch(err => {
//       dispatch({
//         type: PRACTICE_DIGITAL_GRAPHICS,
//         payload: {
//           graph_week: [],
//           week: [],
//           graph_month: [],
//         },
//       });
//     });
// }

/**
 * Show or hidden intermittent tutorial
 * @param {boolean} payload
 */
// export const practiceIntermittentTutorial = (payload) => (dispatch, getState) => {
//   const { user_all_data } = getState().userReducer;
//   if (
//     !user_all_data.tutorials || user_all_data.tutorials.intermittent === undefined ||
//     user_all_data.tutorials.intermittent === null
//   ) {
//     if (!user_all_data.tutorials) {
//       user_all_data.tutorials = {
//         intermittent: true,
//       }
//     } else {
//       user_all_data.tutorials.intermittent = true;
//     }

//     dispatch(userUpdate(user_all_data));
//   }

//   dispatch({
//     type: PRACTICE_INTERMITTENT_TUTORIAL,
//     payload
//   });
// }

/**
 * Save intermittent fasting
 */
// export const practiceSaveIntermittent = () => (dispatch, getState) => {
//   let {
//     practice_digital_fast_hours: hours, practice_digital_fast_minutes: minutes,
//   } = getState().practiceReducer;
//   let {
//     user_all_data,
//   } = getState().userReducer;
//   hours = parseInt(hours);
//   minutes = parseInt(minutes);

//   if (hours === 0 && minutes === 0) {
//     Alert.alert('Upsss!!!', 'Debes indicar el tiempo para el ayuno.');
//     return null;
//   }
//   if (hours < 14) {
//     Alert.alert('Upsss!!!', 'El ayuno debe tener mínimo 14 horas.');
//     return null;
//   }

//   let dateNow = Math.round(Date.now() / 1000);
//   let endMinutes = (hours * 60) + minutes;
//   let expiration_date = dateNow + (endMinutes * 60);
//   let currentDate = FirebaseActions.getFormatDate()
//   let data = {
//     cod_user: user_all_data.uid,
//     initial_date: dateNow,
//     expiration_date,
//     created_on: currentDate,
//     total_minutes: endMinutes,
//     minutes_done: 0,
//     is_active: true,
//   };

//   dispatch(
//     practiceTimeIntermittent(true, data)
//   );
//   dispatch(practiceDigitalFastHours(`00`));
//   dispatch(practiceDigitalFastMinutes(`00`));

//   if (!user_all_data.last_intermittent) {
//     user_all_data.last_intermittent = currentDate;
//     if (user_all_data.counts) {
//       user_all_data.counts.intermittent_continuous = 1;
//     } else {
//       user_all_data.counts = {
//         intermittent_continuous: 1,
//       }
//     }
//   } else {
//     if (user_all_data.last_intermittent !== currentDate) {
//       let last = new Date(user_all_data.last_intermittent);
//       let now = new Date(currentDate);
//       let is_continuous = Math.floor((now - last) / (24 * 60 * 60 * 1000));

//       if (is_continuous <= 1) {
//         if (user_all_data.counts) {
//           let total = (user_all_data.counts.intermittent_continuous) ?
//             (user_all_data.counts.intermittent_continuous + 1)
//             : 1;
//           user_all_data.counts.intermittent_continuous = total;
//         } else {
//           user_all_data.counts = {
//             intermittent_continuous: 1,
//           }
//         }
//       } else {
//         user_all_data.counts.intermittent_continuous = 1;
//       }
//       user_all_data.last_intermittent = currentDate;
//     }
//   }

//   FirebaseActions.saveDataCollectionWithAdd('intermittent_fasting', data)
//   .then(res => {
//     if (res.id) {
//       data.id = res.id;
//     }
//     dispatch(
//       practiceTimeIntermittent(true, data)
//     );
//   })
//   .catch(error => console.log('Error practiceSaveIntermittent: ', error));
//   dispatch(userUpdate(user_all_data));
// }

/**
 * Change status intermittent fasting
 * @param {boolean} status
 * @param {string} data
 */
// export const practiceTimeIntermittent = (status, data) => (dispatch) => {
//   if (!status) {
//     dispatch({
//       type: PRACTICE_INTERMITTENT_STATUS,
//       payload: null,
//     });
//     if (!data) {
//       AsyncStorage.getItem('@Munay:Intermittent')
//         .then(res => {
//           if (res) {
//             dispatch(practiceSaveIntermittentTime(JSON.parse(res)));
//           }
//         });
//     } else {
//       dispatch(practiceSaveIntermittentTime(data))
//     }
//     AsyncStorage.removeItem('@Munay:Intermittent');
//     return;
//   }
//   dispatch({
//     type: PRACTICE_INTERMITTENT_STATUS,
//     payload: data.expiration_date,
//   });
//   AsyncStorage.setItem('@Munay:Intermittent', JSON.stringify(data));
// }

/**
 * Validate status intermittent fasting
 */
// export const practiceStatusIntermittent = () => (dispatch) => {
//   AsyncStorage.getItem('@Munay:Intermittent')
//     .then(res => {
//       if (res) {
//         res = JSON.parse(res);

//         let expiration_date = new Date(res.expiration_date * 1000);
//         let date_now = Date.now();
//         let res_date = (expiration_date - date_now + 1000) / 1000;
//         if (res_date > 1) {
//           dispatch(practiceTimeIntermittent(true, res));
//         } else {
//           dispatch(practiceTimeIntermittent(false, res));
//         }
//       }
//     });
// }

/**
 * Save historial intermittent fasting
 * @param {object} data
 */
// export const practiceSaveIntermittentTime = (data) => (dispatch, getState) => {
//   let { user_all_data } = getState().userReducer;
//   let { practice_intermittent_historial } = getState().practiceReducer;

//   data.is_active = false;
//   let expiration_date = new Date(data.expiration_date * 1000);
//   let date_now = Date.now();
//   let res_date = (expiration_date - date_now + 1000) / 1000;
//   let minutes = Math.floor(res_date / 60 % 60);
//   let hours = Math.floor(res_date / 3600 % 24);
//   if (minutes > 0 || hours > 0) {
//     let total_minutes = (hours * 60) + minutes;
//     total_minutes = data.total_minutes - total_minutes;
//     data.minutes_done = total_minutes;
//   } else {
//     data.minutes_done = data.total_minutes;
//   }
//   // This counter is to add the number of entries created
//   if (user_all_data && user_all_data.content_counts) {
//     if (!user_all_data.content_counts.intermittent_fasting) {
//       user_all_data.content_counts.intermittent_fasting = 1;
//     } else {
//       user_all_data.content_counts.intermittent_fasting = user_all_data.content_counts.intermittent_fasting + 1;
//     }
//   } else {
//     user_all_data.content_counts = {
//       intermittent_fasting: 1
//     }
//   }

//   let historial = practice_intermittent_historial.filter(item => (item.id !== data.id));
//   historial.push(data);

//   dispatch({
//     type: PRACTICE_INTERMITTENT_HISTORIAL,
//     payload: historial,
//   });

//   FirebaseActions.saveDataCollectionWithSet('intermittent_fasting', data.id, data);
// }
/**
 * Get info to intermittent graph
 */
// export const practiceIntermittentFastingGraph = () => async (dispatch, getState) => {
//   const { user_all_data } = getState().userReducer;
//   dispatch({
//     type: PRACTICE_INTERMITTENT_GRAPH,
//     payload: {
//       graph_week: null,
//       week: null,
//       graph_month: null,
//     },
//   });
//   let currentDate = FirebaseActions.getFormatDate();
//   currentDate = currentDate.split('/').join('-');

//   await axios.get(`${api_url}/v1/historial/intermittent-fasting/${user_all_data.uid}/${currentDate}`)
//     .then(res => {
//       if (res.data) {
//         dispatch({
//           type: PRACTICE_INTERMITTENT_GRAPH,
//           payload: res.data.data,
//         });
//       }
//     })
//     .catch(err => {
//       console.log('Error practiceIntermittentFastingGraph: ', err)
//       dispatch({
//         type: PRACTICE_INTERMITTENT_GRAPH,
//         payload: {
//           graph_week: [],
//           week: [],
//           graph_month: [],
//         },
//       });
//     });
// }

/**
 * Get historial intermittent fasting
 */
// export const practiceIntermittentFastingHistorial = () => async (dispatch, getState) => {
//   const { user } = getState().userReducer;

//   let response = await FirebaseActions.getHistorialIntermittentFasting(user.uid);
//   dispatch({
//     type: PRACTICE_INTERMITTENT_HISTORIAL,
//     payload: response,
//   });
// }
