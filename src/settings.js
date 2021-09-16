import firebase from "firebase";

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

export { auth, firebaseConfig };
