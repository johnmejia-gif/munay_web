import firebase from "firebase";

const api_endpoint = "https://us-central1-munay-db.cloudfunctions.net/api";
const stripe_endpoint =
	"https://us-central1-munay-db.cloudfunctions.net/stripe";
const stripe_test_endpoint =
	"https://us-central1-munay-db.cloudfunctions.net/stripe/development";

const firebaseConfig = {
	apiKey: "AIzaSyC3Se1SLe08KWnOcpP1o61gjMQo6jROyDQ",
	authDomain: "munay-db.firebaseapp.com",
	databaseURL: "https://munay-db.firebaseio.com",
	projectId: "munay-db",
	storageBucket: "munay-db.appspot.com",
	messagingSenderId: "514959206136",
	appId: "1:514959206136:web:2d5c16e3d78e7499de7d0d",
	measurementId: "G-33RL09WWDP",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export {
	auth,
	firebaseConfig,
	api_endpoint,
	stripe_endpoint,
	stripe_test_endpoint,
};
