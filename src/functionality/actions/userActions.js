import {
	USER_EMAIL,
	USER_PASSWORD,
	USER_FIRSTNAME,
	USER_LASTNAME,
	USER_ERROR,
	USER_DATA,
	USER_LOADING,
	USER_CLEAR,
	USER_STATUS,
	USER_SESSION,
	USER_ALL_DATA,
	USER_ACCOMPANYING,
	USER_ACCOMPANYING_LOADING,
	USER_CHANGE_LOADING_IMAGE,
	USER_TRAINING,
	USER_RATINGS,
	USER_HISTORIAL,
	USER_ACTIVITIES_HISTORIAL,
	USER_INTUITS,
	USER_MODAL_LEVEL,
	USER_LEVEL,
	USER_LIKE_RESOURCE,
	USER_PERMISSIONS,
	USER_TEST_TIME,
	USER_USERNAME,
	USER_HELLO,
} from "../types/userTypes";
import { INVENTORY_LIST_USERS, INVENTORY_CLEAR } from "../types/inventoryTypes";
import FirebaseActions from "./FirebaseActions";
import { GLOBAL_SIGNOUT, GLOBAL_SPLASH } from "../types/globalTypes";
// import { api_endpoint as api_url } from "../../../settings";
import axios from "axios";
// import { openCloseTooltip } from "./globalActions";
import { GARDEN_MY_LIST_CLEAR } from "../types/gardenTypes";
import { WAY_HAPPINESS_DAYS_TRAINED } from "../types/wayHappinessTypes";
import { SUBSCRIPTION_GROUP } from "../types/subscriptionTypes";

/**
 * Change and validate input email
 * @param {string} value
 */
export const userChangeEmail = (value) => (dispatch) => {
	let email_reg =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (value.length >= 5 && !email_reg.test(value)) {
		dispatch({
			type: USER_ERROR,
			payload: "El email está mal escrito.",
		});
	} else {
		// dispatch({
		// 	type: USER_ERROR,
		// 	payload: "",
		// });
	}
	dispatch({
		type: USER_EMAIL,
		payload: value,
	});
};

/**
 * Change and validate input password
 * @param {string} value
 */
export const userChangePassword = (value) => (dispatch) => {
	if (value.length > 0 && value.length < 6) {
		dispatch({
			type: USER_ERROR,
			payload: "La contraseña es muy corta.",
		});
	} else {
		// dispatch({
		// 	type: USER_ERROR,
		// 	payload: "",
		// });
	}
	dispatch({
		type: USER_PASSWORD,
		payload: value,
	});
};

/**
 * Change input firstname
 * @param {string} value
 */
export const userChangeFirstname = (value) => (dispatch) => {
	dispatch({
		type: USER_FIRSTNAME,
		payload: value,
	});
};

/**
 * Change input lastname
 * @param {string} value
 */
export const userChangeLastname = (value) => (dispatch) => {
	dispatch({
		type: USER_LASTNAME,
		payload: value,
	});
};

/**
 * Change input username
 * @param {string} value
 */
export const userChangeUsername = (value) => (dispatch) => {
	dispatch({
		type: USER_USERNAME,
		payload: value,
	});
};

/**
 * User register
 */
export const userRegister = () => async (dispatch, getState) => {
	let email_reg =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let username_reg = /^[a-zA-Z0-9_]*$/;

	// dispatch({
	// 	type: USER_ERROR,
	// 	payload: "",
	// });

	const { user_username, user_email, user_password } = getState().userReducer;

	let userName = user_username.split(" ").join("");

	if (userName.length > 0 && userName.length <= 3) {
		alert(
			"Upsss!!!, El nombre de usuario debe tener mínimo 4 caracteres sin espacios."
		);
		return;
	}
	if (!username_reg.test(userName)) {
		alert(
			"Upsss!!!, El nombre de usuario sólo debe contener letras y/o números. Sin espacios"
		);
		return;
	}
	if (!userName.length || !user_email || !user_password) {
		alert("Upsss!!!, Todos los campos son obligatorios.");
		return;
	}
	if (!email_reg.test(user_email)) {
		alert("Upsss!!!, Verifica que el email este bien escrito.");
		return;
	}
	if (user_password.length < 6) {
		alert("Upsss!!!, La contraseña debe tener mínimo 6 caracteres.");
		return;
	}

	dispatch({
		type: USER_LOADING,
		payload: {
			status: true,
			message: "Registrando...",
		},
	});

	let data = {
		username: userName,
		email: user_email,
		password: user_password,
	};

	let response = await FirebaseActions.signUp(data);
	try {
		if (!response) {
			alert(
				"Upsss!!!, El correo electrónico ingresado ya esta se encuentra en uso, por favor usa otro.",
				[
					{
						text: "Ok",
						onPress: () => {
							dispatch({
								type: USER_DATA,
								payload: response,
							});
						},
					},
				]
			);
		} else if (response === "isUser") {
			alert(
				"Upsss!!!, El nombre de usuario ingresado ya se encuentra en uso, por favor usa otro.",
				[
					{
						text: "Ok",
						onPress: () => {
							dispatch({
								type: USER_DATA,
								payload: null,
							});
						},
					},
				]
			);
		} else {
			dispatch({
				type: USER_DATA,
				payload: response,
			});
			localStorage.setItem("@Munay:isLogged", "is_logged");
		}
	} catch (err) {
		console.log("userRegister: ", err);
	}
};

/**
 * Show or hidden session status
 * @param {boolean} value
 */
export const userLoadedSession = (value) => (dispatch) => {
	dispatch({
		type: USER_SESSION,
		payload: value,
	});
};

/**
 * Session status
 */
export const userSessionStatus = () => (dispatch) => {
	localStorage.getItem("@Munay:isLogged").then((res) => {
		if (res) {
			FirebaseActions.currentUser((response) => {
				if (response) {
					dispatch({
						type: USER_DATA,
						payload: response,
					});
					localStorage.setItem("@Munay:isLogged", "is_logged");
				} else {
					dispatch({
						type: USER_STATUS,
						payload: false,
					});
				}
				dispatch({
					type: GLOBAL_SPLASH,
					payload: false,
				});
			});
		} else {
			dispatch({
				type: USER_STATUS,
				payload: false,
			});
			dispatch({
				type: GLOBAL_SPLASH,
				payload: false,
			});
		}
	});
};

/**
 * User login
 */
export const userAuth = () => async (dispatch, getState) => {
	let email_reg =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	dispatch({
		type: USER_ERROR,
		payload: "",
	});
	dispatch({
		type: USER_LOADING,
		payload: {
			status: true,
			message: "Iniciando sesión...",
		},
	});

	const { user_email, user_password } = getState().userReducer;
	if (!user_email.length || !user_password) {
		dispatch({
			type: USER_ERROR,
			payload: "Todos los campos son obligatorios.",
		});
		return;
	}

	if (!email_reg.test(user_email)) {
		dispatch({
			type: USER_ERROR,
			payload: "Verifica que el email esté bien escrito.",
		});
		return;
	}

	let data = {
		email: user_email,
		password: user_password,
	};
	console.log("en data hay...", data);

	let response = await FirebaseActions.signIn(data);
	console.log("la respuesta de signIn es:", response);

	try {
		if (!response) {
			dispatch({
				type: USER_ERROR,
				payload: "Datos de ingreso Incorrectos",
			});
			alert(
				" alerta 1 . Upsss!!!, Hubo un error, valida que los datos estén bien escritos.",
				[
					{
						text: "Ok",
						onPress: () => {
							dispatch({
								type: USER_DATA,
								payload: response,
							});
							dispatch({
								type: USER_ERROR,
								payload: "Datos de ingreso Incorrectos",
							});
						},
					},
				]
			);
			dispatch({
				type: USER_LOADING,
				payload: {
					status: false,
					message: "",
				},
			});
			dispatch({
				type: USER_ERROR,
				payload: "Datos de ingreso Incorrectos",
			});
		} else {
			console.log("-+-+-+ Entró al else");
			dispatch({
				type: USER_DATA,
				payload: response,
			});
			localStorage.setItem("@Munay:isLogged", "is_logged");
		}
		dispatch(userData());

		// localStorage.setItem("@Munay:isLogged", "is_logged");
	} catch (err) {
		console.log("=>>>>>>  entró al catch");
		alert(
			"alerta 2 . Upsss!!!, Hubo un error, valida que los datos estén bien escritos."
		);
	}
};

/**
 * User sign out
 */
export const userSignOut = () => (dispatch) => {
	console.log("Entró al userSignOut");
	dispatch({
		type: USER_DATA,
		payload: null,
	});
	dispatch({
		type: USER_ALL_DATA,
		payload: null,
	});
	dispatch({
		type: GLOBAL_SIGNOUT,
		payload: true,
	});
	dispatch({
		type: GARDEN_MY_LIST_CLEAR,
	});
	dispatch({
		type: WAY_HAPPINESS_DAYS_TRAINED,
		payload: null,
	});
	dispatch({
		type: SUBSCRIPTION_GROUP,
		payload: null,
	});
	dispatch(userHello(false));
	localStorage.removeItem("@Munay:isLogged");
	localStorage.removeItem("@Munay:userData");
	localStorage.removeItem("@Munay:userActivitiesHistorial");
	localStorage.removeItem("@Munay:userRatings");
	localStorage.removeItem("@Munay:userTraining");
	localStorage.removeItem("@Munay:userLikeResource");
	FirebaseActions.signOut();
};

/**
 * Clear user info
 */
export const userClear = () => (dispatch) => {
	dispatch({
		type: USER_CLEAR,
	});
};

/**
 * Get list activities historial
 * @param {string} codUser
 */
const getUserActivitiesHistorial = (codUser) => (dispatch) => {
	localStorage.getItem("@Munay:userActivitiesHistorial").then((res) => {
		if (res) {
			dispatch({
				type: USER_ACTIVITIES_HISTORIAL,
				payload: JSON.parse(res),
			});
		}
	});
	FirebaseActions.getDocsPerUser("activities_historial", codUser)
		.then((res) => {
			if (res) {
				dispatch({
					type: USER_ACTIVITIES_HISTORIAL,
					payload: res,
				});
				localStorage.setItem(
					"@Munay:userActivitiesHistorial",
					JSON.stringify(res)
				);
			}
		})
		.catch((err) => console.log("Error activities historial: ", err));
};

/**
 * Get list activities rating
 * @param {string} codUser
 */
const getUserRatings = (codUser) => (dispatch) => {
	localStorage.getItem("@Munay:userRatings").then((res) => {
		if (res) {
			dispatch({
				type: USER_RATINGS,
				payload: JSON.parse(res),
			});
		}
	});
	FirebaseActions.getDocsPerUser("activity_rating", codUser)
		.then((res) => {
			if (res) {
				dispatch({
					type: USER_RATINGS,
					payload: res,
				});
				localStorage.setItem("@Munay:userRatings", JSON.stringify(res));
			}
		})
		.catch((err) => console.log("Error list rating to activities: ", err));
};

/**
 * Get list trainig unblocked
 * @param {string} codUser
 */
// const getUserTraining = (codUser) => (dispatch) => {
// 	localStorage.getItem("@Munay:userTraining").then((res) => {
// 		if (res) {
// 			dispatch({
// 				type: USER_TRAINING,
// 				payload: JSON.parse(res),
// 			});
// 		}
// 	});
// 	axios
// 		.get(`${api_url}/v1/program/unblock/${codUser}`)
// 		.then((res) => {
// 			if (res.data) {
// 				dispatch({
// 					type: USER_TRAINING,
// 					payload: res.data.data,
// 				});
// 				localStorage.setItem(
// 					"@Munay:userTraining",
// 					JSON.stringify(res.data.data)
// 				);
// 			}
// 		})
// 		.catch((err) => console.log("Error list training: ", err));
// };

/**
 * Get likes to resources
 * @param {string} codUser
 */
const getUserLikeResouce = (codUser) => (dispatch) => {
	localStorage.getItem("@Munay:userLikeResource").then((res) => {
		if (res) {
			dispatch({
				type: USER_LIKE_RESOURCE,
				payload: JSON.parse(res),
			});
		}
	});
	FirebaseActions.getDataSubcollection("users", codUser, "like_resources")
		.then((res) => {
			if (res) {
				dispatch({
					type: USER_LIKE_RESOURCE,
					payload: res,
				});
				localStorage.setItem("@Munay:userLikeResource", JSON.stringify(res));
			}
		})
		.catch((err) => console.log("Error like resources: ", err));
};

/**
 * show or hidden greeting
 * @param {boolean} payload
 */
export const userHello = (payload) => (dispatch) => {
	dispatch({
		type: USER_HELLO,
		payload: payload,
	});
};

/**
 * Get info to current user
 */
export const userData = () => (dispatch, getState) => {
	const { user } = getState().userReducer;
	console.log("ingresó a la función userData con user:", user);
	if (user) {
		console.log("comprobó el user...");
		const munayUserData = localStorage.getItem("@Munay:userData");
		console.log("*** munayUserData: ", munayUserData);
		if (munayUserData !== null) {
			console.log("entró al si....");
		} else {
			console.log("entró al NOOOO...");
			console.log("va a enviarlo a refreshUserData");
			dispatch(refreshUserData(true));
		}

		// localStorage.getItem("@Munay:userData").then((res) => {
		// 	console.log("res:", res);
		// 	if (res) {
		// 		const asyncRes = JSON.parse(res);
		// 		if (asyncRes.is_active) {
		// 			dispatch({
		// 				type: USER_ALL_DATA,
		// 				payload: asyncRes,
		// 			});
		// 			dispatch(userHello(true));
		// 			// dispatch(userPermissions());
		// 			dispatch(refreshUserData(false));
		// 		} else {
		// 			alert(
		// 				"Upsss!!!, Tu usuario esta bloqueado, por favor contacta al administrador para mas información"
		// 			);
		// 			dispatch(userSignOut());
		// 		}
		// 	} else {
		// 		console.log("va a enviarlo a refreshUserData");
		// 		dispatch(refreshUserData(true));
		// 	}
		// });
		// FirebaseActions.onUpdateUserData(user.uid, (res) => {
		// 	if (res) {
		// 		dispatch({
		// 			type: USER_ALL_DATA,
		// 			payload: res,
		// 		});
		// 		localStorage.setItem("@Munay:userData", JSON.stringify(res));
		// 	}
		// });
		// List trainings to user
		// dispatch(getUserTraining(user.uid));

		// List rating to activities from user
		// dispatch(getUserRatings(user.uid));

		// User activities historial
		// dispatch(getUserActivitiesHistorial(user.uid));

		// User like resource
		// dispatch(getUserLikeResouce(user.uid));
	}
};

/**
 * If refresh user data ans user permissions
 * @param {boolean} status
 */
export const refreshUserData = (status) => (dispatch, getState) => {
	const { user } = getState().userReducer;
	// const { global_tooltip } = getState().globalReducer;
	console.log("<==<<<<==  entró a refreshUserData con user:", user);
	FirebaseActions.docDetail("users", user.uid)
		.then((res) => {
			if (res) {
				console.log("**** la res es:", res);
				if (res.is_active) {
					dispatch({
						type: USER_ALL_DATA,
						payload: res,
					});
					// if (!global_tooltip) {
					// 	dispatch(userPermissions());
					// }
					if (status) {
						dispatch(userHello());
					}
					localStorage.setItem("@Munay:userData", JSON.stringify(res));
				} else {
					alert(
						"Upsss!!!, Tu usuario esta bloqueado, por favor contacta al administrador para mas información"
					);
					dispatch(userSignOut());
				}
			}
		})
		.catch((err) => console.log("Error user: ", err));
};

/**
 * Get my list users accompany and accompanying
 * @param {object} payload
 */
// export const userListAccompanyingAccompany =
// 	(callback) => (dispatch, getState) => {
// 		const { user } = getState().userReducer;
// 		dispatch({
// 			type: INVENTORY_CLEAR,
// 		});
// 		dispatch({
// 			type: INVENTORY_LIST_USERS,
// 			payload: [],
// 		});
// 		dispatch({
// 			type: USER_ACCOMPANYING_LOADING,
// 			payload: true,
// 		});
// 		if (user) {
// 			axios
// 				.get(`${api_url}/v1/user/accompanying-accompany/${user.uid}`)
// 				.then((res) => {
// 					if (res.status === 200) {
// 						dispatch({
// 							type: USER_ACCOMPANYING,
// 							payload: res.data.data,
// 						});
// 						dispatch({
// 							type: INVENTORY_LIST_USERS,
// 							payload: res.data.data.accompanying,
// 						});
// 						if (callback) {
// 							callback();
// 						}
// 					} else {
// 						dispatch({
// 							type: USER_ACCOMPANYING_LOADING,
// 							payload: false,
// 						});
// 					}
// 				})
// 				.catch((err) => {
// 					dispatch({
// 						type: USER_ACCOMPANYING_LOADING,
// 						payload: false,
// 					});
// 				});
// 		}
// 	};

/**
 * Change upload status
 * @param {object} payload
 */
export const statusUploadUserProfileImage = (payload) => (dispatch) => {
	dispatch({
		type: USER_CHANGE_LOADING_IMAGE,
		payload,
	});
};

/**
 * SAve image profile
 * @param {string} payload
 */
export const saveUserProfileImage = (payload) => (dispatch, getState) => {
	let { user_all_data } = getState().userReducer;
	dispatch({
		type: USER_CHANGE_LOADING_IMAGE,
		payload: {
			percentage: 0,
			visible: false,
		},
	});

	user_all_data.picture = payload;

	dispatch({
		type: USER_ALL_DATA,
		payload: user_all_data,
	});

	localStorage.setItem("@Munay:userData", JSON.stringify(user_all_data));
	FirebaseActions.saveDataCollectionWithSet(
		"users",
		user_all_data.uid,
		user_all_data
	);
};

/**
 * Get list my intuits
 */
// export const myIntits = () => (dispatch, getState) => {
// 	const { user } = getState().userReducer;

// 	if (user) {
// 		axios
// 			.get(`${api_url}/v1/intuit/user/${user.uid}`)
// 			.then((res) => {
// 				if (res.status === 200) {
// 					dispatch({
// 						type: USER_INTUITS,
// 						payload: res.data.data,
// 					});
// 				} else {
// 					dispatch({
// 						type: USER_INTUITS,
// 						payload: [],
// 					});
// 				}
// 			})
// 			.catch((error) => {
// 				dispatch({
// 					type: USER_INTUITS,
// 					payload: [],
// 				});
// 			});
// 	}
// };

/**
 * Show or hidden level modal
 * @param {boolean} payload
 */
export const userModalLevel = (payload) => (dispatch) => {
	if (!payload) {
		dispatch(userLevel(0));
	}
	dispatch({
		type: USER_MODAL_LEVEL,
		payload,
	});
};

/**
 * Set level
 * @param {int} payload
 */
export const userLevel = (payload) => (dispatch) => {
	dispatch({
		type: USER_LEVEL,
		payload,
	});
};

/**
 * Save level
 */
export const userSaveLevel = () => (dispatch, getState) => {
	let { user_all_data, user_level } = getState().userReducer;
	user_all_data.my_level = user_level;

	dispatch(userUpdate(user_all_data));
	dispatch(userModalLevel(false));
};

/**
 * Like or dislike to resource
 * @param {string} cod_resource
 * @param {string} type_resource
 */
export const userLikeResource =
	(cod_resource, type_resource) => (dispatch, getState) => {
		let { user_like_resource, user } = getState().userReducer;
		let isLiked = user_like_resource.filter(
			(item) => item.cod_resource === cod_resource
		);

		let data = {
			cod_user: user.uid,
			cod_resource,
			type_resource,
		};

		if (isLiked.length > 0) {
			data.status = !isLiked[0].status;
		} else {
			data.status = true;
		}

		user_like_resource = user_like_resource.filter(
			(item) => item.cod_resource !== cod_resource
		);
		user_like_resource.push(data);

		dispatch({
			type: USER_LIKE_RESOURCE,
			payload: user_like_resource,
		});

		FirebaseActions.saveDataSubcollectionWithSet(
			"users",
			user.uid,
			"like_resources",
			cod_resource,
			data
		);
		localStorage.setItem(
			"@Munay:userLikeResource",
			JSON.stringify(user_like_resource)
		);
	};

/**
 * Update user info
 * @param {object} payload
 */
export const userUpdate = (payload) => (dispatch, getState) => {
	const { user_test_time } = getState().userReducer;
	dispatch({
		type: USER_ALL_DATA,
		payload,
	});

	if (!user_test_time) {
		// dispatch(userPermissions());
	}

	localStorage.setItem("@Munay:userData", JSON.stringify(payload));
	FirebaseActions.saveDataCollectionWithSet("users", payload.uid, payload);
};

/**
 * SAve push tocken
 * @param {string} push_token
 */
export const userTokenNotifications = (push_token) => (dispatch, getState) => {
	let { user_all_data } = getState().userReducer;
	if (push_token) {
		let data = {
			cod_user: user_all_data.uid,
			token: push_token,
			name: user_all_data.firstname,
		};
		FirebaseActions.saveDataCollectionWithSet(
			"notification_token",
			user_all_data.uid,
			data
		);
		user_all_data.push_token = push_token;
		dispatch(userUpdate(user_all_data));
	}
};

/**
 * Validate permissions to current user
 */
// export const userPermissions = () => (dispatch, getState) => {
// 	const { user_all_data } = getState().userReducer;
// 	dispatch({
// 		type: USER_TEST_TIME,
// 		payload: true,
// 	});
// 	if (user_all_data.app_access_type != undefined) {
// 		if (user_all_data.app_access_type == "1") {
// 			dispatch({
// 				type: USER_PERMISSIONS,
// 				payload: true,
// 			});
// 			return;
// 		}
// 	}
// 	if (user_all_data.cod_subscription && user_all_data.subscription !== "free") {
// 		dispatch({
// 			type: USER_PERMISSIONS,
// 			payload: true,
// 		});
// 		return;
// 	}
// 	if (!user_all_data.start_trial) {
// 		dispatch(
// 			openCloseTooltip({
// 				status: false,
// 				title: "",
// 				message: "",
// 				subscription: false,
// 			})
// 		);
// 		dispatch({
// 			type: USER_PERMISSIONS,
// 			payload: false,
// 		});
// 		return;
// 	}
// 	let currentDate = FirebaseActions.getFormatDate();
// 	currentDate = new Date(currentDate);
// 	let testDate = new Date(user_all_data.start_trial);
// 	// let testDate = new Date('2020/08/02');
// 	let resDate = currentDate - testDate;
// 	resDate = resDate / (1000 * 60 * 60 * 24);
// 	if (resDate >= 0 && resDate <= 7) {
// 		let days = 7 - resDate;
// 		let message = `Tienes ${days} días de prueba. Puedes activar Munay premium en cualquier momento.`;
// 		if (days === 0) {
// 			message = `Este es tu último día de prueba. Puedes activar Munay premium en cualquier momento.`;
// 		}
// 		let title = `¡Gracias por entrenar la felicidad en Munay!`;
// 		dispatch({
// 			type: USER_PERMISSIONS,
// 			payload: true,
// 		});
// 		dispatch(
// 			openCloseTooltip({
// 				status: true,
// 				title,
// 				message,
// 				subscription: true,
// 			})
// 		);
// 		return;
// 	} else {
// 		let name =
// 			user_all_data.firstname != ""
// 				? user_all_data.firstname
// 				: user_all_data.username;
// 		let message = `Hola ${name}, la semana de prueba en Munay premium terminó. Si quieres volver a Munay Premium con acceso a todo el contenido y secciones puedes suscribirte en "Mi espacio" o haz click aquí.`;
// 		let title = `Entrenar tu felicidad es nuestra motivación y sustento`;
// 		dispatch(
// 			openCloseTooltip({
// 				status: true,
// 				title,
// 				message,
// 				subscription: true,
// 			})
// 		);
// 		dispatch({
// 			type: USER_PERMISSIONS,
// 			payload: false,
// 		});
// 	}
// };
