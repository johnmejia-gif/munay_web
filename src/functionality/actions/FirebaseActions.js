import firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "../../settings";

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
} else {
	firebase.app();
}

class FirebaseActions {
	constructor() {
		this.auth = firebase.auth();
		this.db = firebase.firestore();
		this.storage = firebase.storage();
	}

	/**
	 * Default format date
	 */
	getFormatDate = () => {
		let d = new Date();
		let year = d.getFullYear();
		let month = d.getMonth() + 1;
		let day = d.getDate();
		month = month < 10 ? `0${month}` : month;
		day = day < 10 ? `0${day}` : day;
		return `${year}/${month}/${day}`;
	};

	/**
	 * User register
	 */
	signUp = async (data) => {
		let user = null;
		let uid = null;
		let isUser = await this.db
			.collection("users")
			.where("username", "==", data.username)
			.get()
			.then((res) => {
				return res.empty;
			})
			.catch((error) => {
				console.log("Error isUser: ", error);
				return false;
			});
		if (isUser) {
			let response = await this.auth
				.createUserWithEmailAndPassword(data.email, data.password)
				.then((res) => {
					res.user.updateProfile({
						displayName: `${data.username}`,
					});
					return res;
				})
				.then((res) => {
					let user_data = {
						uid: res.user.uid,
						firstname: "",
						lastname: "",
						email: data.email,
						about_me: null,
						birthdate: null,
						marital_status: null,
						religion: null,
						username: data.username,
						picture: null,
						is_active: true,
						is_public: true,
						is_admin: false,
						is_teacher: false,
						subscription: "free",
						cod_group: null,
						invitation: null,
						cod_subscription: null,
						resources: {
							water: 7,
							earth: 7,
							sun: 7,
							oxygen: 7,
						},
						created_on: new Date(),
						start_trial: this.getFormatDate(),
					};
					uid = res.user.uid;
					localStorage.setItem("@Munay:userData", JSON.stringify(user_data));
					return this.db.collection("users").doc(res.user.uid).set(user_data);
				})
				.then(() => {
					if (!uid) {
						return null;
					}
					user = {
						uid,
						displayName: data.username,
						email: data.email,
					};
					return user;
				})
				.catch((err) => {
					console.log("signUp: ", err);
					return null;
				});

			return response;
		} else {
			return "isUser";
		}
	};

	/**
	 * User logout
	 */
	signOut = () => {
		this.auth.signOut();
	};

	/**
	 * Calback to update user
	 */
	onUpdateUserData(cod_user, callback) {
		this.db
			.collection("users")
			.doc(cod_user)
			.onSnapshot((res) => {
				if (res.exists) {
					let update_user = res.data();
					callback(update_user);
				}
			});
	}

	/**
	 * Status current user
	 * @param {function} callback
	 */
	currentUser = (callback) => {
		this.auth.onAuthStateChanged(function (user) {
			if (user) {
				const { uid, email, displayName } = user;
				let userData = {
					uid,
					email,
					displayName,
				};
				callback(userData);
			} else {
				callback(null);
			}
		});
	};

	/**
	 * Login register
	 * @param {string} email
	 * @param {string} password
	 */
	signIn = async ({ email, password }) => {
		let user = null;
		let response = await this.auth
			.signInWithEmailAndPassword(email, password)
			.then((res) => {
				const { uid, email, displayName } = res.user;
				console.log("en singnIn - firebaseActions el res.user es:", res.user);
				user = {
					uid,
					email,
					displayName,
				};
				return user;
			})
			.catch((err) => {
				console.log("Error signIn: ", err);
				return null;
			});

		return response;
	};

	/**
	 * show detail to document
	 * @param {string} collection Name collection
	 * @param {string} doc Id document
	 */
	docDetail = async (collection, doc) => {
		let data = null;
		let response = await this.db
			.collection(collection)
			.doc(doc)
			.get()
			.then((res) => {
				if (!res.exists) {
					return null;
				}
				return (data = res.data());
			})
			.catch((err) => {
				console.log("Error doc detail: ", err);
			});

		return response;
	};

	/**
	 * Get gardens info
	 */
	getGardensData = async () => {
		let response = await this.db
			.collection("gardens")
			.orderBy("order")
			.get()
			.then((res) => {
				if (res.empty) {
					return [];
				}
				let data = [];
				res.forEach((item) => {
					let row = item.data();
					row.id = item.id;
					data.push(row);
				});

				return data;
			});
		return response;
	};

	/**
	 * Get info per subcollection
	 * @param {string} collection Name collection
	 * @param {string} doc Id document
	 * @param {string} subcollection Name subcollection
	 */
	getDataSubcollection = async (collection, doc, subcollection) => {
		let data = [];
		let response = await this.db
			.collection(collection)
			.doc(doc)
			.collection(subcollection)
			.get()
			.then((res) => {
				if (res.empty) {
					return data;
				}
				res.forEach((item) => {
					let row = item.data();
					row.id = item.id;
					data.push(row);
				});
				return data;
			})
			.catch((err) => {
				console.log("Error listSubcollection: ", err);
				return data;
			});

		return response;
	};

	/**
	 * Get items per collection
	 * @param {string} collection Name collection
	 * @param {string} doc Document Id
	 */
	getItemPerCollection = async (collection, doc) => {
		let response = await this.db
			.collection(collection)
			.doc(doc)
			.get()
			.then((res) => {
				if (!res.exists) {
					return {};
				}
				let data = res.data();
				data.id = res.id;
				return data;
			})
			.catch((err) => {
				console.log("Error listSubcollection: ", err);
				// return data;
				return err;
			});

		return response;
	};

	/**
	 * Save and merge data collection
	 * @param {string} collection Name collection
	 * @param {string} cod_collection Document id
	 * @param {object} data
	 */
	saveDataCollectionWithSet = (collection, cod_collection, data) => {
		return this.db
			.collection(collection)
			.doc(cod_collection)
			.set(data, { merge: true });
	};

	/**
	 * Save and create data collection
	 * @param {string} collection Name collection
	 * @param {object} data
	 */
	saveDataCollectionWithAdd = (collection, data) => {
		return this.db.collection(collection).add(data);
	};

	/**
	 * Save and merge data subcollection
	 * @param {string} collection Name collection
	 * @param {string} cod_collection Document id
	 * @param {string} subcollection Name subcollection
	 * @param {string} cod_subcollection Subcollection id
	 * @param {object} data
	 */
	saveDataSubcollectionWithSet = (
		collection,
		cod_collection,
		subcollection,
		cod_subcollection,
		data
	) => {
		return this.db
			.collection(collection)
			.doc(cod_collection)
			.collection(subcollection)
			.doc(cod_subcollection)
			.set(data, { merge: true });
	};

	/**
	 * Save and create data subcollection
	 * @param {string} collection Name collection
	 * @param {string} cod_collection Document id
	 * @param {string} subcollection Name subcollection
	 * @param {object} data
	 */
	saveDataSubcollectionWithAdd = (
		collection,
		cod_collection,
		subcollection,
		data
	) => {
		return this.db
			.collection(collection)
			.doc(cod_collection)
			.collection(subcollection)
			.add(data);
	};

	/**
	 * Upload file to Firebase Storage
	 */
	uploadFile = (file, route, extension) => {
		let imageName = Date.now();
		let pathFile = `${route}/${imageName}.${extension}`;
		var ref = this.storage.ref().child(pathFile);
		return ref.put(file);
	};

	/**
	 * Get my WallNow entries
	 * @param {string} cod_user
	 */
	getEntries = async (cod_user) => {
		let data = [];
		let response = await this.db
			.collection("contents")
			.where("cod_user", "==", cod_user)
			.where("section", "==", "write-now")
			.orderBy("created_on", "desc")
			.get()
			.then((res) => {
				if (res.empty) {
					return data;
				}
				res.forEach((item) => {
					let row = item.data();
					row.id = item.id;
					data.push(row);
				});
				return data;
			})
			.catch((err) => {
				console.log("Error getEntries: ", err);
				return data;
			});

		return response;
	};

	/**
	 * Get my WallNow entries
	 * @param {string} cod_user
	 */
	getPushToken = async (cod_user, token) => {
		let data = [];
		let response = await this.db
			.collection("notification_push_token")
			.where("cod_user", "==", cod_user)
			.where("fcm_token", "==", token)
			.get()
			.then((res) => {
				if (res.empty) {
					return data;
				}
				res.forEach((item) => {
					let row = item.data();
					row.id = item.id;
					data.push(row);
				});
				return data;
			})
			.catch((err) => {
				console.log("Error getPushToken: ", err);
				return data;
			});

		return response;
	};

	/**
	 * Update user password
	 * @param {string} password
	 * @param {string} oldPassword
	 */
	updatePassword = async (password, oldPassword) => {
		let user = this.auth.currentUser;
		let credential = firebase.auth.EmailAuthProvider.credential(
			user.email,
			oldPassword
		);
		user
			.reauthenticateWithCredential(credential)
			.then(function (res) {
				user.updatePassword(password);
			})
			.catch(function (error) {
				console.log("Error updatePassword: ", error);
			});
	};

	/**
	 * Get documents per current user
	 * @param {string} collection
	 * @param {string} cod_user
	 */
	getDocsPerUser = async (collection, cod_user) => {
		let response = [];
		await this.db
			.collection(collection)
			.where("cod_user", "==", cod_user)
			.get()
			.then((res) => {
				if (res.empty) {
					return response;
				}
				res.forEach((item) => {
					let row = item.data();
					row.id = item.id;
					response.push(row);
				});
			})
			.catch((error) => console.log("Error getDocsPerUser: ", error));

		return response;
	};

	/**
	 * Get my historial to digital fasting
	 * @param {string} cod_user
	 */
	getHistorialDigitalFasting = async (cod_user) => {
		let response = [];
		await this.db
			.collection("digital_fasting")
			.where("cod_user", "==", cod_user)
			.where("is_active", "==", false)
			.get()
			.then((res) => {
				if (res.empty) {
					return response;
				}
				res.forEach((item) => {
					let row = item.data();
					row.id = item.id;
					response.push(row);
				});
			})
			.catch((error) =>
				console.log("Error getHistorialDigitalFasting: ", error)
			);

		return response;
	};

	/**
	 * Get my historial to intermittent fasting
	 * @param {string} cod_user
	 */
	getHistorialIntermittentFasting = async (cod_user) => {
		let response = [];
		await this.db
			.collection("intermittent_fasting")
			.where("cod_user", "==", cod_user)
			.where("is_active", "==", false)
			.get()
			.then((res) => {
				if (res.empty) {
					return response;
				}
				res.forEach((item) => {
					let row = item.data();
					row.id = item.id;
					response.push(row);
				});
			})
			.catch((error) =>
				console.log("Error getHistorialIntermittentFasting: ", error)
			);

		return response;
	};

	/**
	 * Get my list inscribed global training
	 * @param {string} cod_user
	 */
	async getGlobalTrainingInscribed(cod_user) {
		let response = await this.db
			.collectionGroup("inscribed")
			.where("cod_user", "==", cod_user)
			.where("status", "==", true)
			.get()
			.then((res) => {
				if (res.empty) {
					return [];
				}
				let data = [];
				res.forEach((item) => {
					data.push(item.data());
				});
				return data;
			})
			.catch((error) => {
				console.log("Error getGlobalTrainingInscribed: ", error);
				return [];
			});

		return response;
	}

	/**
	 * Get bubscription plans
	 * @param {string} cod_user
	 */
	async getSubscriptionPlans() {
		let response = await this.db
			.collection("subscription_plans")
			.orderBy("order", "asc")
			.get()
			.then((res) => {
				if (res.empty) {
					return [];
				}
				let data = [];
				res.forEach((item) => {
					data.push(item.data());
				});
				return data;
			})
			.catch((error) => {
				console.log("Error getSubscriptionPlans: ", error);
				return [];
			});

		return response;
	}

	/**
	 * Get my subcriptions list
	 * @param {string} collection
	 * @param {string} cod_user
	 */
	getMySubscriptions = async (collection, cod_user) => {
		let response = [];
		await this.db
			.collection(collection)
			.where("cod_user", "==", cod_user)
			.where("subscription_status", "==", "active")
			.get()
			.then((res) => {
				if (res.empty) {
					return response;
				}
				res.forEach((item) => {
					let row = item.data();
					row.id = item.id;
					response.push(row);
				});
			})
			.catch((error) => console.log("Error getMySubscriptions: ", error));

		return response;
	};

	/**
	 * Get my resources list
	 * @param {string} cod_user
	 */
	async getMyResources(cod_user) {
		let response = {
			to_receive: 0,
			give: 0,
		};
		await this.db
			.collection("give_resources")
			.where("cod_user", "==", cod_user)
			.get()
			.then((res) => {
				if (!res.empty) {
					let total = 0;
					res.forEach((item) => {
						let data = item.data();
						total = total + data.quantity;
					});
					response.give = total;
				}
				return this.db
					.collection("give_resources")
					.where("cod_user_give", "==", cod_user)
					.get();
			})
			.then((res) => {
				if (!res.empty) {
					let total = 0;
					res.forEach((item) => {
						let data = item.data();
						total = total + data.quantity;
					});
					response.to_receive = total;
				}
				return;
			})
			.catch((error) => console.log("Error getMyResources: ", error));

		return response;
	}

	/**
	 * Get users active
	 * @param {function} callback
	 */
	getUsersActive(callback) {
		this.db
			.collection("users")
			.where("is_active", "==", true)
			.onSnapshot((res) => {
				if (res.empty) {
					callback([]);
				}
				let data = [];
				res.forEach((item) => {
					let row = item.data();
					let userInfo = {
						name: `${row.firstname} ${row.lastname}`,
						picture: row.picture,
						uid: item.id,
						username: row.username,
						is_public: row.is_public,
						resources: row.resources,
						push_token: row.push_token,
					};
					data.push(userInfo);
				});
				callback(data);
			});
	}

	/**
	 * Get my networking info
	 * @param {object} author
	 */
	getDataNetworking = async (author) => {
		let data = [];
		let response = await this.db
			.collection("networking")
			.where("author", "==", author.uid)
			.where("is_deleted", "==", false)
			.orderBy("created_on", "desc")
			.get()
			.then((res) => {
				if (res.empty) {
					return data;
				}
				res.forEach((item) => {
					let row = item.data();
					row.id = item.id;
					row.author = author;
					data.push(row);
				});
				return data;
			})
			.catch((err) => {
				console.log("Error getDataNetworking: ", err);
				return data;
			});

		return response;
	};
}

export default new FirebaseActions();
