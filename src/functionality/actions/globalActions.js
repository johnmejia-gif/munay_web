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
