import {
	SUBSCRIPTION_MODAL,
	SUBSCRIPTION_PLAN_SELECTED,
	SUBSCRIPTION_CARD_NAME,
	SUBSCRIPTION_CARD_NUMBER,
	SUBSCRIPTION_CARD_EXP_MONTH,
	SUBSCRIPTION_CARD_EXP_YEAR,
	SUBSCRIPTION_CARD_CVC,
	SUBSCRIPTION_LOADING,
	SUBSCRIPTION_STEP,
	SUBSCRIPTION_CLEAR,
	SUBSCRIPTION_OPTIONS,
	SUBSCRIPTION_LOADING_MESSAGE,
	SUBSCRIPTION_MY_LIST,
	SUBSCRIPTION_GROUP,
	SUBSCRIPTION_GROUP_FIRSTNAME,
	SUBSCRIPTION_GROUP_MODAL,
	SUBSCRIPTION_GROUP_LASTNAME,
	SUBSCRIPTION_GROUP_EMAIL,
	SUBSCRIPTION_GROUP_ADD,
	SUBSCRIPTION_GROUP_CLEAR,
	SUBSCRIPTION_GROUP_EDIT,
	SUBSCRIPTION_SECTION,
} from "../types/subscriptionTypes";
import FirebaseActions from "./FirebaseActions";
import {
	api_endpoint,
	stripe_endpoint,
	stripe_test_endpoint,
	mode,
} from "../../settings";
import axios from "axios";
import { USER_TEST_TIME } from "../types/userTypes";
import { userUpdate } from "./userActions";
const stripe_url =
	mode === "production" ? stripe_endpoint : stripe_test_endpoint;

/**
 * List plan options
 */
export const subscriptionGetOptions = () => async (dispatch) => {
	let response = await FirebaseActions.getSubscriptionPlans();
	dispatch({
		type: SUBSCRIPTION_OPTIONS,
		payload: response,
	});
};

/**
 * List my subscriptions
 */
export const subscriptionGetMyList = () => async (dispatch, getState) => {
	const { user } = getState().userReducer;
	let response = await FirebaseActions.getMySubscriptions(
		"subscriptions",
		user.uid
	);
	dispatch({
		type: SUBSCRIPTION_MY_LIST,
		payload: response,
	});
};

/**
 * Created customer id
 */
export const subscriptionCreateCustomer = () => (dispatch, getState) => {
	const { user_all_data } = getState().userReducer;
	if (user_all_data) {
		let data = {
			name: `${user_all_data.username}`,
			email: user_all_data.email,
			cod_user: user_all_data.uid,
		};
		axios
			.post(`${stripe_endpoint}/v1/customer`, data)
			.then((res) => {
				if (res.status === 201) {
					dispatch(userUpdate(res.data.data));
				}
			})
			.catch((error) =>
				console.log("Error subscriptionCreateCustomer: ", error)
			);
	}
};

/**
 * Created test customer id
 */
export const subscriptionCreateTestCustomer = () => (dispatch, getState) => {
	const { user_all_data } = getState().userReducer;
	if (user_all_data) {
		let data = {
			name: `${user_all_data.username}`,
			email: user_all_data.email,
			cod_user: user_all_data.uid,
		};
		axios
			.post(`${stripe_test_endpoint}/v1/customer`, data)
			.then((res) => {
				if (res.status === 201) {
					dispatch(userUpdate(res.data.data));
				}
			})
			.catch((error) =>
				console.log("Error subscriptionCreateTestCustomer: ", error)
			);
	}
};

/**
 * Show or hidden subscription modal
 * @param {boolean} payload
 */
export const subscriptionModal = (payload) => (dispatch, getState) => {
	let { user_all_data } = getState().userReducer;
	if (!payload) {
		dispatch({
			type: SUBSCRIPTION_CLEAR,
		});
	}
	dispatch({
		type: SUBSCRIPTION_MODAL,
		payload,
	});
	if (!user_all_data.modal_subscription) {
		user_all_data.modal_subscription = true;
		user_all_data.start_trial = FirebaseActions.getFormatDate();
		dispatch(userUpdate(user_all_data));
	}
};

/**
 * Select plan
 * @param {string} payload
 */
export const subscriptionSelected = (payload) => (dispatch) => {
	dispatch({
		type: SUBSCRIPTION_PLAN_SELECTED,
		payload,
	});
};

/**
 * Change step to subscribe
 * @param {int} payload
 */
export const subscriptionChangeStep = (payload) => (dispatch, getState) => {
	const { subscription_plan } = getState().subscriptionReducer;

	if (parseInt(payload) === 2 && !subscription_plan) {
		alert("Upsss!!!", "Para continuar debes seleccionar un plan.");
		return null;
	}

	dispatch({
		type: SUBSCRIPTION_STEP,
		payload: parseInt(payload),
	});
};

/**
 * Change input card name
 * @param {string} payload
 */
export const subscriptionCardName = (payload) => (dispatch) => {
	dispatch({
		type: SUBSCRIPTION_CARD_NAME,
		payload,
	});
};

/**
 * Change input card number
 * @param {string} payload
 */
export const subscriptionCardNumber = (payload) => (dispatch) => {
	dispatch({
		type: SUBSCRIPTION_CARD_NUMBER,
		payload,
	});
};

/**
 * Change select month
 * @param {string} payload
 */
export const subscriptionCardExpMonth = (payload) => (dispatch) => {
	dispatch({
		type: SUBSCRIPTION_CARD_EXP_MONTH,
		payload,
	});
};

/**
 * Change select year
 * @param {string} payload
 */
export const subscriptionCardExpYear = (payload) => (dispatch) => {
	dispatch({
		type: SUBSCRIPTION_CARD_EXP_YEAR,
		payload,
	});
};

/**
 * Change input cvc
 * @param {string} payload
 */
export const subscriptionCardCvc = (payload) => (dispatch) => {
	dispatch({
		type: SUBSCRIPTION_CARD_CVC,
		payload,
	});
};

/**
 * Show or hidden modal loading
 * @param {boolean} payload
 */
export const subscriptionLoading = (status, message) => (dispatch) => {
	dispatch({
		type: SUBSCRIPTION_LOADING,
		payload: status,
	});
	dispatch({
		type: SUBSCRIPTION_LOADING_MESSAGE,
		payload: message,
	});
};

/**
 * To subscribe me
 */
export const subscriptionCreate = () => (dispatch, getState) => {
	const {
		subscription_plan,
		subscription_card_name,
		subscription_card_number,
		subscription_card_exp_year,
		subscription_card_exp_month,
		subscription_card_cvc,
	} = getState().subscriptionReducer;
	let { user_all_data } = getState().userReducer;

	if (mode === "production" && !user_all_data.customer_id) {
		alert(
			"Upsss!!!",
			"Lo sentimos, en enste momento no podemos procesar el pago, vuelve a intentarlo más tarde."
		);
		return;
	}
	if (mode !== "production" && !user_all_data.test_customer_id) {
		alert(
			"Upsss!!!",
			"Lo sentimos, en enste momento no podemos procesar el pago, vuelve a intentarlo más tarde."
		);
		return;
	}
	if (!subscription_plan) {
		alert("Upsss!!!", "Debes seleccionar un plan.");
		return;
	}
	if (!subscription_card_number.length) {
		alert("Upsss!!!", "Debes escribir el número de la tarjeta.");
		return;
	}
	if (!subscription_card_exp_month.length) {
		alert("Upsss!!!", "Debes seleccionar el mes de vencimiento de la tarjeta.");
		return;
	}
	if (!subscription_card_exp_year.length) {
		alert("Upsss!!!", "Debes seleccionar el año de vencimiento de la tarjeta.");
		return;
	}
	if (!subscription_card_cvc.length) {
		alert("Upsss!!!", "Debes escribir el código de seguridad.");
		return;
	}
	if (!subscription_card_name.length) {
		alert("Upsss!!!", "Debes escribir el nombre del títular de la tarjeta.");
		return;
	}
	let subscriptionData = {
		cod_user: user_all_data.uid,
		email: user_all_data.email,
		email_name: user_all_data.firstname,
		subscription_name: subscription_plan.subscription_name,
		customer_id:
			mode === "production"
				? user_all_data.customer_id
				: user_all_data.test_customer_id,
		number: subscription_card_number,
		exp_month: parseInt(subscription_card_exp_month),
		exp_year: parseInt(subscription_card_exp_year),
		cvc: subscription_card_cvc,
		cod_price_plan: subscription_plan.cod_price_plan,
		name: subscription_card_name,
		cod_plan_subscription: subscription_plan.cod_subscription,
	};

	dispatch(subscriptionLoading(true, "Porcesando pago..."));
	axios
		.post(`${stripe_url}/v1/customer/subscribe`, subscriptionData)
		.then((res) => {
			if (res.data && res.data.cod_status === 201) {
				dispatch(subscriptionGetMyList());
				user_all_data.subscription = subscription_plan.subscription;
				user_all_data.cod_subscription = subscription_plan.cod_subscription;
				user_all_data.subscribed_on = FirebaseActions.getFormatDate();
				user_all_data.cancelled = false;
				alert(
					`¡Gracias ${user_all_data.username}!`,
					'Activaste tu suscripción a Munay Premium. Puedes administrarla en la sección "Mi espacio".',
					[
						{
							text: "OK",
							onPress: () => {
								dispatch({
									type: USER_TEST_TIME,
									payload: null,
								});
								dispatch(userUpdate(user_all_data));
								dispatch(subscriptionLoading(false, null));
							},
						},
					]
				);
			} else {
				let message = "";
				switch (res.data.data.code) {
					case "incorrect_cvc":
						message = "El código CVC es incorrecto.";
						break;
					case "expired_card":
						message = "No se pudo procesar el pago, la tarjeta ha expirado.";
						break;
					case "incorrect_number":
						message = "El número de la tarjeta es invalido.";
						break;
					case "card_declined":
						if (res.data.data.decline_code === "insufficient_funds") {
							message = "No tienes fondos suficientes.";
						} else if (
							res.data.data.decline_code === "lost_card" ||
							res.data.data.decline_code === "stolen_card"
						) {
							message =
								"Hubo un problema con la tarjeta, valida con tu entidad bancaria el estado de tu tarjeta.";
						} else {
							message =
								"Hubo un error al procesar el pago, la tarjeta fue rechazada.";
						}
						break;
					default:
						message =
							"Hubo un error al procesar el pago, valida que los datos de la tarjeta esten correctos.";
						break;
				}
				alert("Upsss!!!", message, [
					{
						text: "OK",
						onPress: () => {
							dispatch(subscriptionLoading(false, null));
						},
					},
				]);
			}
		})
		.catch((error) => {
			console.log("Error subscriptionCreateCustomer: ", error);
			alert(
				"Upsss!!!",
				"Hubo un error al procesar tu pago, valida que los datos de la tarjeta estén bien escritos.",
				[
					{
						text: "OK",
						onPress: () => {
							dispatch(subscriptionLoading(false, null));
						},
					},
				]
			);
		});
};

/**
 * Get list users group
 */
export const subscriptionMyGroup = () => (dispatch, getState) => {
	const { user_all_data } = getState().userReducer;
	dispatch({
		type: SUBSCRIPTION_GROUP,
		payload: null,
	});

	axios
		.get(`${api_endpoint}/v1/user/group/${user_all_data.uid}`)
		.then((res) => {
			if (res.status === 200) {
				dispatch({
					type: SUBSCRIPTION_GROUP,
					payload: res.data.data,
				});
			}
		})
		.catch(() => {
			dispatch({
				type: SUBSCRIPTION_GROUP,
				payload: [],
			});
		});
};

export const subscriptionMyGroupUserInvited = () => (dispatch, getState) => {
	const { user_all_data } = getState().userReducer;
	dispatch({
		type: SUBSCRIPTION_GROUP,
		payload: null,
	});
	axios
		.get(`${api_endpoint}/v1/user/group/${user_all_data.cod_group}`)
		.then((res) => {
			if (res.status === 200) {
				dispatch({
					type: SUBSCRIPTION_GROUP,
					payload: res.data.data,
				});
			}
		})
		.catch((error) => {
			dispatch({
				type: SUBSCRIPTION_GROUP,
				payload: [],
			});
		});
};

/**
 * Show or hiddem modal subscription group
 * @param {boolean} payload
 */
export const subscriptionGroupModal = (payload) => (dispatch) => {
	if (!payload) {
		dispatch({
			type: SUBSCRIPTION_GROUP_CLEAR,
		});
	}
	dispatch({
		type: SUBSCRIPTION_GROUP_MODAL,
		payload,
	});
};

/**
 * Change section
 * @param {string} payload
 */
export const subscriptionSection = (payload) => (dispatch) => {
	dispatch({
		type: SUBSCRIPTION_SECTION,
		payload,
	});
};

/**
 * Change firstname user group
 * @param {string} payload
 */
export const subscriptionGroupFirstname = (payload) => (dispatch) => {
	dispatch({
		type: SUBSCRIPTION_GROUP_FIRSTNAME,
		payload,
	});
};

/**
 * Change lastname user group
 * @param {string} payload
 */
export const subscriptionGroupLastname = (payload) => (dispatch) => {
	dispatch({
		type: SUBSCRIPTION_GROUP_LASTNAME,
		payload,
	});
};

/**
 * Change email user group
 * @param {string} payload
 */
export const subscriptionGroupEmail = (payload) => (dispatch) => {
	dispatch({
		type: SUBSCRIPTION_GROUP_EMAIL,
		payload,
	});
};

/**
 * Select user to edit
 * @param {object} payload
 */
export const subscriptionGroupEdit = (payload) => (dispatch) => {
	dispatch({
		type: SUBSCRIPTION_GROUP_EDIT,
		payload,
	});
	dispatch(subscriptionGroupModal(true));
};

/**
 * Add user to group
 */
export const subscriptionAddGroup = () => (dispatch, getState) => {
	let {
		subscription_group_firstname,
		subscription_group_lastname,
		subscription_group_email,
		subscription_group_add,
		subscription_group_index,
	} = getState().subscriptionReducer;
	let { user_all_data } = getState().userReducer;
	let email_reg =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	console.log("subscription_group_firstname");
	console.log(subscription_group_firstname);
	console.log("subscription_group_lastname");
	console.log(subscription_group_lastname);
	console.log("subscription_group_email");
	console.log(subscription_group_email);
	console.log("subscription_group_add");
	console.log(subscription_group_add);
	console.log("subscription_group_index");
	console.log(subscription_group_index);
	console.log("user_all_data");
	console.log(user_all_data);
	if (!subscription_group_firstname.length) {
		alert(
			"Upsss!!!",
			"Escribe el nombre del usuario para agregarlo a tu grupo."
		);
		return;
	}
	if (!subscription_group_lastname.length) {
		alert(
			"Upsss!!!",
			"Escribe el apellido del usuario para agregarlo a tu grupo."
		);
		return;
	}
	if (!subscription_group_email.length) {
		alert(
			"Upsss!!!",
			"Escribe el email del usuario para agregarlo a tu grupo."
		);
		return;
	}
	if (!email_reg.test(subscription_group_email)) {
		alert("Upsss!!!", "Valida que el email este bien escrito.");
		return;
	}
	let isAdded = subscription_group_add.filter(
		(item) => item.email === subscription_group_email
	);

	if (
		(isAdded.length > 0 || user_all_data.email === subscription_group_email) &&
		subscription_group_index === null
	) {
		alert("Upsss!!!", "El email ya se enceuntra registrado en tu grupo.");
		return;
	}

	let data = {
		firstname: subscription_group_firstname,
		lastname: subscription_group_lastname,
		email: subscription_group_email,
	};

	if (subscription_group_index === null) {
		subscription_group_add.push(data);
	} else {
		subscription_group_add[subscription_group_index] = data;
	}
	console.log("subscription_group_add_2");
	console.log(subscription_group_add);

	dispatch({
		type: SUBSCRIPTION_GROUP_ADD,
		payload: subscription_group_add,
	});
	dispatch(subscriptionGroupModal(false));
};

/**
 * Remove user to group
 * @param {int} index
 */
export const subscriptionGroupRemove = (index) => (dispatch, getState) => {
	alert(
		"¿Estás seguro?",
		"Vas a quitar a un integrante de tu grupo de entrenamiento.",
		[
			{
				text: "OK",
				onPress: () => {
					let { subscription_group_add } = getState().subscriptionReducer;

					subscription_group_add.splice(index, 1);
					dispatch({
						type: SUBSCRIPTION_GROUP_ADD,
						payload: subscription_group_add,
					});
				},
			},
			{
				text: "Cancelar",
				onPress: () => () => false,
			},
		]
	);
};

/**
 * Create ans save training group
 * @param {string} subscription_name
 */
export const subscriptionSaveGroup =
	(subscription_name) => (dispatch, getState) => {
		const { subscription_group_add, subscription_group } =
			getState().subscriptionReducer;
		const { user_all_data } = getState().userReducer;

		let typeSubscription = user_all_data.subscription.split("_");
		let limit = typeSubscription[0] === "abundancia" ? 6 : 2;

		if (subscription_group) {
			limit = limit - subscription_group.length;
		}
		if (subscription_group_add.length > limit) {
			alert(
				"Upsss!!!",
				"Tu grupo de entrenamiento, ha completado el cupo aceptado."
			);
			return;
		}

		let data = {
			group: subscription_group_add,
			cod_group: user_all_data.uid,
			invitation: `${user_all_data.firstname} ${user_all_data.lastname}`,
			subscription: user_all_data.subscription,
			cod_subscription: user_all_data.cod_subscription,
			subscription_name,
		};

		dispatch(subscriptionLoading(true, "Creando grupo..."));
		axios
			.post(`${api_endpoint}/v1/user/group`, data)
			.then((res) => {
				console.log("res");
				console.log(res);
				if (res.status === 201) {
					dispatch(subscriptionLoading(false, null));
					dispatch(subscriptionMyGroup());
					dispatch({
						type: SUBSCRIPTION_GROUP_ADD,
						payload: [],
					});
				}
			})
			.catch((error) => {
				console.log("Upsss!!! error");
				console.log(error.message);
				alert("Upsss!!!", "Hubo un error, vuelve a intentarlo más tarde.", [
					{
						text: "OK",
						onPress: () => {
							dispatch(subscriptionLoading(false, null));
						},
					},
				]);
			});
	};
/**
 * Validate if unsuscribe
 * @param {string} payload
 */
export const subscriptionUnregister = () => (dispatch, getState) => {
	alert("¿Estás seguro?", "Vas a cancelar tu suscripción.", [
		{
			text: "Confirmar",
			onPress: () => {
				dispatch(unsubscription());
			},
		},
		{
			text: "Cancelar",
			onPress: () => false,
		},
	]);
};

/**
 * Unsuscribe
 */
const unsubscription = () => (dispatch, getState) => {
	let { user_all_data } = getState().userReducer;
	let { subscription_my_list } = getState().subscriptionReducer;
	let mySubscription = subscription_my_list.filter(
		(item) => item.cod_plan_subscription === user_all_data.cod_subscription
	);
	if (mySubscription.length > 0) {
		let subscription_name = user_all_data.subscription.split("_").join(" ");
		let data = {
			id: mySubscription[0].id,
			email: user_all_data.email,
			name: user_all_data.firstname,
			cod_user: user_all_data.uid,
			customer_id:
				mode === "production"
					? user_all_data.customer_id
					: user_all_data.test_customer_id,
			cod_subscription: mySubscription[0].cod_subscription,
			subscription_name: subscription_name.toUpperCase(),
		};

		dispatch(subscriptionLoading(true, "Cancelando suscripción..."));

		axios
			.post(`${stripe_url}/v1/customer/unsubscribe`, data)
			.then((res) => {
				if (res.status === 200) {
					dispatch({
						type: USER_TEST_TIME,
						payload: null,
					});

					if (subscription_name.includes("vitalicio")) {
						user_all_data.group = null;
						user_all_data.cod_group = null;
						user_all_data.invitation = null;
						user_all_data.subscription = "free";
						user_all_data.cod_subscription = null;
					} else {
						user_all_data.cancelled = true;
					}
					dispatch(userUpdate(user_all_data));
					dispatch(subscriptionLoading(false, null));
				}
			})
			.catch((error) => {
				alert(
					"Upsss!!!",
					"Hubo un error al cancelar tu suscripción, vuelve a intentarlo más tarde.",
					[
						{
							text: "OK",
							onPress: () => {
								dispatch(subscriptionLoading(false, null));
							},
						},
					]
				);
			});
	} else {
		alert(
			"Upsss!!!",
			"En este momento no podemos procesar tu solictud, intentalo más tarde."
		);
	}
};
