import {
	ACTIVITY_RATING,
	ACTIVITY_MODAL,
	ACTIVITY_MODAL_RATING,
	ACTIVITY_VIEW_RATING,
	ACTIVITY_TUTORIAL,
	ACTIVITY_TRAINING_SELECT,
	ACTIVITY_DATE_DETAIL,
	ACTIVITY_PERCENTAGE,
} from "../types/activityTypes";
// import { Alert, Platform } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import FirebaseActions from "./FirebaseActions";
import {
	USER_RATINGS,
	USER_ALL_DATA,
	USER_ACTIVITIES_HISTORIAL,
} from "../types/userTypes";
import { userUpdate } from "./userActions";
import {
	WAY_HAPPINESS_DAYS_TRAINED,
	WAY_HAPPINESS_MINUTES_TRAINED,
	WAY_HAPPINESS_TOTAL_TRAINING,
	WAY_HAPPINESS_USER_CONSCIOUS,
} from "../types/wayHappinessTypes";

/**
 * Show or hidden activity modal
 * @param {boolean} payload
 */
// export const activityModal = (status, message) => (dispatch) => {
//   dispatch({
//     type: ACTIVITY_MODAL,
//     payload: {
//       status,
//       message,
//     },
//   });
// }

/**
 * Show rating to activity
 * @param {string} codActivity Id activity
 */
// export const activityViewRating = (codActivity) => (dispatch, getState) => {
//   if (codActivity !== null) {
//     const { user_ratings } = getState().userReducer;
//     let rating = user_ratings.filter(item => (item.cod_activity === codActivity));

//     if (rating.length > 0) {
//       dispatch({
//         type: ACTIVITY_VIEW_RATING,
//         payload: rating[0].rating
//       });
//     }
//   } else {
//     dispatch({
//       type: ACTIVITY_VIEW_RATING,
//       payload: null
//     });
//   }
// }

/**
 * Show or hidden modal to activity rating
 * @param {boolean} payload
 */
// export const activityModalRating = (payload) => (dispatch) => {
//   dispatch({
//     type: ACTIVITY_RATING,
//     payload: 0,
//   });
//   dispatch({
//     type: ACTIVITY_MODAL_RATING,
//     payload,
//   });
// }

/**
 * Change rating value
 * @param {int} payload
 */
// export const activityChangeRating = (payload) => (dispatch) => {
//   dispatch({
//     type: ACTIVITY_RATING,
//     payload
//   });
// }

/**
 * Save rating to activity
 * @param {string} codActivity
 * @param {string} section
 */
// export const activitySaveRating = (codActivity, section) => async (dispatch, getState) => {
//   let { user, user_ratings } = getState().userReducer;
//   const { activity_rating } = getState().activityReducer;
//   let data = {
//     cod_user: user.uid,
//     cod_activity: codActivity,
//     rating: activity_rating,
//     created_on: FirebaseActions.getFormatDate(),
//     section,
//   }
//   dispatch({
//     type: ACTIVITY_VIEW_RATING,
//     payload: activity_rating,
//   });
//   dispatch(activityModalRating(false));
//   if(Platform.OS === 'android'){
//     dispatch(activityModal(true, 'Guardando calificación...'));
//   }
//   await FirebaseActions.saveDataCollectionWithAdd('activity_rating', data)
//     .then((res) => {
//       data.id = res.id;
//       user_ratings.push(data);
//       dispatch({
//         type: USER_RATINGS,
//         payload: user_ratings
//       });
//       dispatch(activityModal(false, ''));
//       AsyncStorage.setItem('@Munay:userRatings', JSON.stringify(user_ratings));
//     })
//     .catch(err => {
//       dispatch(activityModal(false, ''));
//       console.log('Error activitySaveRating: ', err);
//       Alert.alert(
//         'Upsss!!!',
//         'Lo sentimos hubo un error, vuelve a intentarlo más tarde.',
//         [
//           {text: 'OK', onPress: () => {
//             dispatch(activityModal(false, ''));
//           }}
//         ]
//       );
//     });
// }

/**
 * Add earth resource to end user activity
 * @param {object} user_all_data Current user info
 */
// const addEarthResource = (user_all_data) => {
//   if (user_all_data.resources && user_all_data.resources.earth) {
//     user_all_data.resources.earth = user_all_data.resources.earth + 1;
//   } else {
//     user_all_data.resources.earth = 1;
//   }

//   return user_all_data;
// }

/**
 * Add oxygen resource to end user activity
 * @param {object} user_all_data Current user info
 */
// const addOxygenResource = (user_all_data) => {
//   if (user_all_data.resources && user_all_data.resources.oxygen) {
//     user_all_data.resources.oxygen = user_all_data.resources.oxygen + 1;
//   } else {
//     user_all_data.resources.oxygen = 1;
//   }

//   return user_all_data;
// }

/**
 * Add sun resource to end user activity
 * @param {object} user_all_data Current user info
 */
// const addSunResource = (user_all_data) => {
//   if (user_all_data.resources && user_all_data.resources.sun) {
//     user_all_data.resources.sun = user_all_data.resources.sun + 1;
//   } else {
//     user_all_data.resources.sun = 1;
//   }

//   return user_all_data;
// }

/**
 * Add water resource to end user activity
 * @param {object} user_all_data Current user info
 */
// const addWaterResource = (user_all_data) => {
//   if (user_all_data.resources && user_all_data.resources.water) {
//     user_all_data.resources.water = user_all_data.resources.water + 1;
//   } else {
//     user_all_data.resources.water = 1;
//   }

//   return user_all_data;
// }

/**
 * Show or hidden modal to activity rating
 * @param {int} resource_type Code type resource
 * @param {object} user_all_data Current user info
 */
// let addResource = (resource_type, user_all_data) => {
//   switch(resource_type) {
//     case 2:
//       user_all_data = addOxygenResource(user_all_data);
//       break;
//     case 3:
//       user_all_data = addSunResource(user_all_data);
//       break;
//     case 4:
//       user_all_data = addWaterResource(user_all_data);
//       break;
//     default:
//       user_all_data = addEarthResource(user_all_data);
//       break;
//   }

//   return user_all_data;
// }

/**
 * Calculate percentage to end activities
 * @param {int} min Minimal number to calculate
 * @param {int} number Total activities ended
 */
// const calculatePercertage = (min, number) => {
//   let percetage = ((number * 100) / min) / 100;
//   percetage = (percetage > 1) ? 1 : percetage;
//   return percetage;
// }

/**
 * Save to end activity
 * @param {string} codActivity
 * @param {string} section
 * @param {int} time
 * @param {string} codProgram
 */
// export const activitySaveDone = (codActivity, section, time, codProgram) => (dispatch, getState) => {
//   let { user_all_data } = getState().userReducer;
//   let {
//     way_happiness_total_training, way_happiness_minutes_trained, way_happiness_user_conscious,
//     way_happiness_day_trained,
//   } = getState().wayHappinessReducer;

//   // UPDATE GRAPHICS IN WAY HAPPINESS
//   if (way_happiness_minutes_trained) {
//     let data = way_happiness_minutes_trained.datasets[0].data;
//     let indexData = data.length - 1;
//     let lastTotal = data[indexData] + Math.round(time / 60);
//     data[indexData] = lastTotal;
//     dispatch({
//       type: WAY_HAPPINESS_MINUTES_TRAINED,
//       payload: way_happiness_minutes_trained,
//     });
//   }
//   if (way_happiness_total_training) {
//     let data = way_happiness_total_training.datasets[0].data;
//     let indexData = data.length - 1;
//     if (parseInt(data[indexData]) === 0) {
//       let { days: {work_days, days_percentage, min_days } } = way_happiness_user_conscious;
//       work_days = work_days + 1;
//       way_happiness_day_trained[indexData].total = 1;
//       way_happiness_day_trained[indexData].count = 1;
//       days_percentage = calculatePercertage(min_days, work_days);
//       way_happiness_user_conscious.days.work_days = work_days;
//       way_happiness_user_conscious.days.days_percentage = days_percentage;
//       dispatch({
//         type: WAY_HAPPINESS_DAYS_TRAINED,
//         payload: way_happiness_day_trained,
//       });
//     }
//     let lastTotal = data[indexData] + 1;
//     data[indexData] = lastTotal;
//     way_happiness_total_training.datasets[0].data = data;
//     dispatch({
//       type: WAY_HAPPINESS_TOTAL_TRAINING,
//       payload: way_happiness_total_training,
//     });
//   }
//   dispatch({
//     type: WAY_HAPPINESS_USER_CONSCIOUS,
//     payload: way_happiness_user_conscious,
//   });
//   // END UPDATE GRAPHICS IN WAY HAPPINESS

//   let data = {
//     cod_activity: codActivity,
//     section,
//     time: parseInt(time),
//     cod_program: codProgram,
//     cod_user: user_all_data.uid,
//     created_on: FirebaseActions.getFormatDate(),
//   }
//   if ((codProgram.indexOf('ConsciousMusic') >= 0) || (codProgram.indexOf('playlist') >= 0)) {
//     if (!user_all_data.limit_music) {
//       user_all_data.limit_music = {
//         date: FirebaseActions.getFormatDate(),
//         time: parseInt(time)
//       };
//     } else {
//       if (user_all_data.limit_music.date !== FirebaseActions.getFormatDate()) {
//         user_all_data.limit_music = {
//           date: FirebaseActions.getFormatDate(),
//           time: parseInt(time)
//         };
//       } else {
//         if (user_all_data.limit_music.time >= 900) {
//           data.time = 0;
//         } else {
//           user_all_data.limit_music = {
//             date: FirebaseActions.getFormatDate(),
//             time: parseInt(time) + user_all_data.limit_music.time,
//           }
//         }
//       }
//     }
//     dispatch(userUpdate(user_all_data));
//   }

//   FirebaseActions.saveDataCollectionWithAdd('activities_done', data);
// }

/**
 * Add end activity to historial
 * @param {boolean} codActivity
 * @param {boolean} section
 * @param {int} time
 * @param {boolean} codProgram
 */
// export const activitySaveHistorial = (codActivity, section, time, codProgram) => (dispatch, getState) => {
//   let { user_all_data, user_activities_historial } = getState().userReducer;
//   const { practice_activities } = getState().practiceReducer;
//   const { trainig_options } = getState().workoutReducer;

//   let data = {
//     cod_user: user_all_data.uid,
//     section,
//     created_on: FirebaseActions.getFormatDate(),
//     complement: {
//       cod_program: codProgram,
//       cod_activity: codActivity,
//       time,
//     }
//   }

//   let isSaved = user_activities_historial.filter(item => (
//     item.complement.cod_activity === codActivity && item.complement.cod_program === codProgram
//   ));

//   if (!isSaved.length) {
//     if (section === 'happy-program') {
//       user_all_data = addEarthResource(user_all_data);
//     }
//     else if (section === 'happy-practice') {
//       if (codProgram !== 'ConsciousReading-Infographic') {
//         let practice = practice_activities.filter((item) => (item.id === codProgram));
//         user_all_data = addResource(practice[0].resource_prize, user_all_data);
//       } else {
//         user_all_data = addOxygenResource(user_all_data);
//       }
//     }
//     else if (section === 'workout-of-the-day') {
//       let training = trainig_options.filter((item) => (item.id === codProgram));
//       user_all_data = addResource(training[0].resource_prize, user_all_data);
//     }

//     dispatch(userUpdate(user_all_data));

//     FirebaseActions.saveDataCollectionWithAdd('activities_historial', data)
//     .then(res => {
//       data.id = res.id;
//       user_activities_historial.push(data);
//       dispatch({
//         type: USER_ACTIVITIES_HISTORIAL,
//         payload: user_activities_historial,
//       });
//       dispatch(activityPercentage(codProgram));
//       AsyncStorage.setItem('@Munay:userActivitiesHistorial', JSON.stringify(user_activities_historial));
//     })
//     .catch(err => console.log('Error activitySaveHistorial: ', err));
//   }
//   dispatch(activitySaveDone(codActivity, section, time, codProgram));
// }

/**
 * Show or hidden and save status tutorial modal
 * @param {boolean} payload
 */
// export const activityChangeTutorial = (payload) => (dispatch, getState) => {
//   let { user_all_data } = getState().userReducer;
//   if (!payload && (!user_all_data.tutorials || !user_all_data.tutorials.training)) {
//     if (user_all_data.tutorials) {
//       user_all_data.tutorials.training = true;
//     } else {
//       user_all_data.tutorials = {
//         training: true,
//       }
//     }

//     dispatch(userUpdate(user_all_data));
//   }

//   dispatch({
//     type: ACTIVITY_TUTORIAL,
//     payload,
//   });
// }

/**
 * Select to activity, the param is object, 'error' or null
 * @param {object} payload
 */
// export const activityTrainigSelect = (payload) => (dispatch) => {
//   dispatch({
//     type: ACTIVITY_TRAINING_SELECT,
//     payload,
//   });
// }

/**
 * Request to percentage ends activities per program or practice
 * @param {string} codProgram
 */
export const activityPercentage = (codProgram) => (dispatch, getState) => {
	const { user_activities_historial } = getState().userReducer;
	const { activities } = getState().contentReducer;
	let programActivities = activities.filter(
		(item) => item.cod_activity === codProgram
	);
	programActivities = programActivities.filter(
		(item) => item.type_resource !== 3 && item.section !== 1
	);
	let activitiesCompleted = programActivities.map((activity) => {
		let response = user_activities_historial.filter((item) => {
			if (item.complement.cod_activity === activity.id) {
				return activity;
			} else {
				return null;
			}
		});
		if (response.length > 0) {
			return activity;
		} else {
			return null;
		}
	});
	activitiesCompleted = activitiesCompleted.filter((item) => item);

	let percentage = Math.round(
		(activitiesCompleted.length * 100) / programActivities.length
	);
	percentage = percentage > 100 ? 100 : percentage;
	dispatch({
		type: ACTIVITY_PERCENTAGE,
		payload: percentage,
	});
};

/**
 * Search or filter actities per program
 * @param {string} codProgram
 */
// export const activitySearchTraininig = (codProgram) => (dispatch, getState) => {
//   const { user_training } = getState().userReducer;
//   const { programs } = getState().contentReducer;
//   let training = user_training.filter(item => (item.cod_program === codProgram));
//   let program = programs.filter(item => (item.id === codProgram))[0];
//   if (program.plan) {
//     training.plan = program.plan;
//     training.training = [];
//     dispatch(activityPercentage(codProgram));
//     dispatch(activityTrainigSelect(training));
//   } else {
//     dispatch(activityTrainigSelect('error'));
//   }
// }

/**
 * Show or hidden modal to activity detail
 * @param {boolean} status
 * @param {object} data
 */
// export const activityModalDetail = (status, data) => (dispatch) => {
//   dispatch({
//     type: ACTIVITY_DATE_DETAIL,
//     payload: {
//       status,
//       data,
//     },
//   });
// }

/**
 * Show activities per day to work week
 * @param {int} week
 * @param {int} day
 * @param {string} codProgram
 */
// export const activityDateDetail = (week, day, codProgram) => (dispatch, getState) => {
//   const { user_activities_historial } = getState().userReducer;
//   const { activity_training_select } = getState().activityReducer;
//   const { activities } = getState().contentReducer;
//   const {
//     videos, audios, infographics, articles, playlists
//   } = getState().contentReducer;
//   let weekActivities = activity_training_select.plan.filter(item => (item.week === week));
//   let dayActivities = weekActivities.filter(item => (item.day === day));
//   dayActivities = dayActivities.sort((a, b) => (a.order - b.order) );

//   if (!dayActivities.length) {
//     Alert.alert('Upsss!!!', 'No hay actividades resgistradas para está fecha');
//     return null;
//   }
//   dayActivities = dayActivities.map(activity => {
//     let activityDetail = activities.filter(item => (item.id === activity.activity));
//     if (activityDetail.length > 0 ) {
//       activity.detail = activityDetail[0];
//     } else {
//       activity.detail = null;
//     }
//     return activity;
//   });

//   let payload = dayActivities.map(activity => {
//     let its_done = user_activities_historial.filter(item => {
//       let codActivity = (activity.detail)
//         ? activity.activity
//         : `${codProgram}-${activity.activity}-${activity.week}-${activity.day}`;

//       if (item.complement.cod_activity === codActivity) {
//         return item;
//       }
//     });
//     its_done = (!its_done.length) ? false : true;
//     let resource = null;
//     if (activity.detail) {
//       switch(activity.detail.type_resource) {
//         case 1:
//           let video = videos.filter(item => (item.id === activity.detail.cod_resource));
//           if (video.length > 0) {
//             resource = video[0];
//           }
//           break;
//         case 2:
//           let audio = audios.filter(item => (item.id === activity.detail.cod_resource));
//           if (audio.length > 0) {
//             resource = audio[0];
//           }
//           break;
//         case 3:
//           let playlist = playlists.filter(item => (item.id === activity.detail.cod_resource));
//           if (playlist.length > 0) {
//             resource = playlist[0];
//           }
//           break;
//         case 4:
//           let article = articles.filter(item => (item.id === activity.detail.cod_resource));
//           if (article.length > 0) {
//             resource = article[0];
//           }
//           break;
//         case 5:
//           let infographic = infographics.filter(item => (item.id === activity.detail.cod_resource));
//           if (infographic.length > 0) {
//             resource = infographic[0];
//           }
//           break;
//       }
//     }
//     activity.detail = { ...activity.detail, resource };
//     return {...activity, its_done }
//   });

//   dispatch(activityModalDetail(true, payload));
// }
