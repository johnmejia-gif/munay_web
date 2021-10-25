import {
	GLOBAL_NEW_MESSAGES,
	GLOBAL_SPLASH,
	GLOBAL_FONTS,
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
// import {
// 	Platform,
// 	LayoutAnimation,
// 	Dimensions,
// 	UIManager,
// 	Alert,
// } from "react-native";
//import * as Analytics from 'expo-firebase-analytics';
import { subscriptionModal } from "./subscriptionActions";
import { userUpdate } from "./userActions";
// import { intuitMessage } from "./intuitActions";
import FirebaseActions from "./FirebaseActions";
// import { accompanyListRequest } from "./accompanyActions";
import axios from "axios";
import { api_endpoint as api_url } from "../../settings";

/**
 * Inactive button principal menu
 * @param {object} buttonMenu
 */
const clearButtonMenu = (buttonMenu) => {
	buttonMenu.backgroundIcon = "rgba(0,0,0,0)";
	buttonMenu.topIcon = 8;
	buttonMenu.colorIcon = "black";
	buttonMenu.bottomIcon = 0;
	return buttonMenu;
};

/**
 * Active button principal menu
 * @param {object} buttonMenu
 */
const activeButtonMenu = (buttonMenu) => {
	buttonMenu.backgroundIcon = "black";
	buttonMenu.topIcon = -16;
	buttonMenu.colorIcon = "white";
	buttonMenu.bottomIcon = 10;
	return buttonMenu;
};

/**
 * Show or hidden splash
 * @param {boolean} payload
 */
export const changeGlobalSplash = (payload) => (dispatch) => {
	dispatch({
		type: GLOBAL_SPLASH,
		payload,
	});
};

/**
 * Change font status
 * @param {boolean} payload
 */
export const changeGlobalFonts = (payload) => (dispatch) => {
	dispatch({
		type: GLOBAL_FONTS,
		payload,
	});
};

/**
 * Show content to push principal screen
 * @param {object} payload
 */
// export const changeContent = (payload) => (dispatch, getState) => {
//   let {
//     global_button_my_way, global_button_happy_program, global_button_workout_day,
//     global_button_happy_practice, global_button_munay_social,
//   } = getState().globalReducer;
//   const {
//     user,
//   } = getState().userReducer;
//   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

//   global_button_my_way = clearButtonMenu(global_button_my_way);
//   global_button_happy_program = clearButtonMenu(global_button_happy_program);
//   global_button_workout_day = clearButtonMenu(global_button_workout_day);
//   global_button_happy_practice = clearButtonMenu(global_button_happy_practice);
//   global_button_munay_social = clearButtonMenu(global_button_munay_social);

//   let widthActive = 64;
//   let widthButton = windowWidth / 5;
//   let movePrev = (widthButton - widthActive) / 2;

//   switch(payload.content) {
//     case 'my_way':
//       payload.left = movePrev;
//       global_button_my_way = activeButtonMenu(global_button_my_way);
//       break;
//     case 'happy_program':
//       payload.left = widthButton + movePrev;
//       global_button_happy_program = activeButtonMenu(global_button_happy_program);
//       break;
//     case 'workout_day':
//       payload.left = (widthButton * 2 ) + movePrev;
//       global_button_workout_day = activeButtonMenu(global_button_workout_day);
//       break;
//     case 'happy_practice':
//       payload.left = (widthButton * 3) + movePrev;
//       global_button_happy_practice = activeButtonMenu(global_button_happy_practice);
//       break;
//     case 'munay_social':
//       payload.left = (widthButton * 4) + movePrev;
//       global_button_munay_social = activeButtonMenu(global_button_munay_social);
//       break;
//   }

//   payload.menu_right = windowWidth - payload.left - widthActive;
//   payload.global_button_my_way = global_button_my_way;
//   payload.global_button_happy_program = global_button_happy_program;
//   payload.global_button_workout_day = global_button_workout_day;
//   payload.global_button_happy_practice = global_button_happy_practice;
//   payload.global_button_munay_social = global_button_munay_social;

//   dispatch({
//     type: GLOBAL_CONTENT,
//     payload,
//   });
//   if (user) {
//     /*Analytics.logEvent('ChangePrincipalSections', {
//       sender: `section_${payload.content}`,
//       user: user.uid,
//       screen: payload.content,
//       purpose: 'View principal screens'
//     });*/
//   }
// }

/**
 * Select and show garden info
 * @param {object} payload
 */
export const getUsersActive = () => (dispatch) => {
	FirebaseActions.getUsersActive((res) => {
		dispatch({
			type: GLOBAL_USERS_ACTIVE,
			payload: res,
		});
	});
};

export const newMessages = () => (dispatch, getState) => {
	let { new_messages } = getState().globalReducer;
	dispatch({
		type: GLOBAL_NEW_MESSAGES,
		payload: new_messages + 1,
	});
};

export const clearNewMessages = () => (dispatch) => {
	dispatch({
		type: GLOBAL_NEW_MESSAGES,
		payload: 0,
	});
};

/**
 * Send notification by expo notifications
 * @param {string} token
 * @param {string} title
 * @param {string} body
 * @param {object} data
 */
export const sendNotification =
	(token, title, body, data = {}) =>
	async (dispatch) => {
		const message = {
			to: token,
			sound: "default",
			title,
			body,
			data,
		};

		await fetch("https://exp.host/--/api/v2/push/send", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Accept-encoding": "gzip, deflate",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(message),
		});
	};

/**
 * Show or hidden tooltip
 * @param {object} payload
 */
export const openCloseTooltip = (payload) => (dispatch) => {
	dispatch({
		type: GLOBAL_TOOLTIP,
		payload,
	});
};

/**
 * Validate if user access to different contents
 * @param {function} callback
 */
export const validateAccess = (callback) => (dispatch, getState) => {
	const { user_permissions } = getState().userReducer;
	if (user_permissions) {
		callback();
	} else {
		dispatch(subscriptionModal(true));
	}
};

/**
 * Share image
 * @param {string} image
 * @param {string} base64
 */
export const addShareImage = (image, base64) => (dispatch, getState) => {
	let { global_share_image } = getState().globalReducer;
	let data = {
		image,
		base64,
	};
	global_share_image.push(data);
	dispatch({
		type: GLOBAL_SHARE_IMAGE,
		payload: global_share_image,
	});
};

/**
 * Save to share app in differents sections
 * @param {object} data
 */
export const saveShare = (data) => (dispatch, getState) => {
	let { user_all_data } = getState().userReducer;

	data.cod_user = user_all_data.uid;
	data.created_on = FirebaseActions.getFormatDate();

	// This counter is to share contents
	if (data !== "ShareApp" && user_all_data.content_counts) {
		if (user_all_data.content_counts.share_training) {
			user_all_data.content_counts.share_training =
				user_all_data.content_counts.share_training + 1;
		} else {
			user_all_data.content_counts.share_training = 1;
		}
	} else {
		user_all_data.content_counts = {
			share_training: 1,
		};
	}

	FirebaseActions.saveDataCollectionWithAdd("share", data);
	dispatch(userUpdate(user_all_data));
};

/**
 * Show ir hidden intro
 * @param {boolena} payload
 */
export const globalIntro = (payload) => (dispatch) => {
	dispatch({
		type: GLOBAL_INTRO,
		payload,
	});
};

/**
 * Select and show global tutorial
 * @param {boolean} payload
 * @param {string} active Image to select menu
 */
// export const globalTutorial = (payload, active) => (dispatch) => {
//   dispatch(changeContent({
//     content: 'my_way',
//     mode: 'dark-content',
//     background: '#5ADDBD',
//     active,
//   }));
//   dispatch({
//     type: GLOBAL_TUTORIAL,
//     payload,
//   });
// }

/**
 * Show or hidden Privacy Policies
 * @param {boolean} payload
 */
export const globalPrivacyPolicies = (payload) => (dispatch) => {
	dispatch({
		type: GLOBAL_PRIVACY_POLICIES,
		payload,
	});
};

/**
 * Show or hidden Terms and Conditions
 * @param {boolean} payload
 */
export const globalTermsConditions = (payload) => (dispatch) => {
	dispatch({
		type: GLOBAL_TERMS_CONDITIONS,
		payload,
	});
};

/**
 * Show or hidden form to send intuit message in user profile
 * @param {boolean} payload
 */
export const globalIntuitMessage = (payload) => (dispatch) => {
	dispatch({
		type: GLOBAL_INTUIT_MESSAGE,
		payload,
	});
};

/**
 * Show or hidden user modal profile
 * @param {object} payload
 */
export const globalUserProfile = (payload) => (dispatch, getState) => {
	const { accompany_request } = getState().accompanyReducer;
	if (!payload) {
		dispatch(globalIntuitMessage(false));
	} else {
		let userAccompanying = accompany_request.filter(
			(item) => item.id === payload.uid
		);
		if (userAccompanying.length > 0) {
			payload.is_request = true;
			payload.is_accompanying = userAccompanying[0].status;
		} else {
			payload.is_request = false;
			payload.is_accompanying = false;
		}
	}
	dispatch({
		type: GLOBAL_USER_PROFILE,
		payload,
	});
};

/**
 * Send and save intuits
 */
// export const globalSendIntuit = () => (dispatch, getState) => {
// 	const { user_all_data } = getState().userReducer;
// 	const { global_user_profile } = getState().globalReducer;
// 	const { intuit_message } = getState().intuitReducer;

// 	if (!intuit_message.length) {
// 		Alert.alert("Upsss!!!", "Debes escribir el Intuit para poder enviarlo.");
// 		return;
// 	}

// 	let users_view = {};
// 	users_view[user_all_data.uid] = true;
// 	users_view[global_user_profile.uid] = true;

// 	let data = {
// 		cod_user: user_all_data.uid,
// 		users_view,
// 		created_on: FirebaseActions.getFormatDate(),
// 		date: new Date(),
// 		message: intuit_message,
// 		type_resource: "",
// 		resource: "",
// 	};

// 	// This counter is to add the number of entries created
// 	if (user_all_data && user_all_data.content_counts) {
// 		if (!user_all_data.content_counts.intuits) {
// 			user_all_data.content_counts.intuits = 1;
// 		} else {
// 			user_all_data.content_counts.intuits =
// 				user_all_data.content_counts.intuits + 1;
// 		}
// 	} else {
// 		user_all_data.content_counts = {
// 			intuits: 1,
// 		};
// 	}
// 	FirebaseActions.saveDataCollectionWithAdd("intuits", data);
// 	dispatch(userUpdate(user_all_data));
// 	dispatch(globalUserProfile(null));
// 	dispatch(intuitMessage(""));
// };

/**
 * Get list users accompanying to current user
 * @param {object} payload Current user info
 */
// export const globalRequestAccompanying = (payload) => (dispatch, getState) => {
// 	const { user_all_data } = getState().userReducer;
// 	let { global_users_active } = getState().globalReducer;
// 	let { accompany_request } = getState().accompanyReducer;
// 	let userData = global_users_active.filter((item) => item.uid === payload.uid);

// 	let data = {
// 		cod_user: user_all_data.uid,
// 		cod_accompanying: payload.uid,
// 	};
// 	let pushData = {
// 		id: payload.uid,
// 		cod_user: payload.uid,
// 		request: true,
// 		status: false,
// 	};
// 	accompany_request.push(pushData);
// 	payload.is_request = true;
// 	payload.is_accompanying = false;
// 	dispatch({
// 		type: GLOBAL_USER_PROFILE,
// 		payload,
// 	});
// 	Alert.alert("¡Felicidades!", "Tu solicitud ha sido envida.");
// 	if (userData.length > 0 && userData[0].push_token) {
// 		let currentUser = user_all_data.username
// 			? user_all_data.username
// 			: `${user_all_data.firstname} ${user_all_data.lastname}`;
// 		let message = `${currentUser}, te ha envaido una solicitud para acompañarte en tu proceso.`;
// 		let accompanyingName = userData[0].username
// 			? userData[0].username
// 			: userData[0].name;
// 		dispatch(
// 			sendNotification(
// 				userData[0].push_token,
// 				`Hola ${accompanyingName}`,
// 				message,
// 				{ action: "open-screen", screen: "Accompany" }
// 			)
// 		);
// 	}
// 	dispatch(accompanyListRequest(accompany_request));
// 	axios.post(`${api_url}/v1/user/accompaniment-request`, data);
// };

/**
 * Change orientation type
 * @param {string} payload
 */
export const globalOrientation = (payload) => (dispatch) => {
	dispatch({
		type: GLOBAL_ORIENTATION,
		payload,
	});
};

/**
 * Device size
 * @param {int} width
 * @param {int} height
 */
export const globalDeviceSize = (width, height) => (dispatch) => {
	dispatch({
		type: GLOBAL_DEVICE_SIZE,
		payload: { width, height },
	});
};
