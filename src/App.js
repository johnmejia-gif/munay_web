import logo from "./logo.svg";
import calm from "./calm.svg";
import "./App.css";
import homevideo from "./home-video.mp4";
import MiCamino from "./pages/MiCamino";
import Loader from "./components/Loader";
import Loading from "./components/Loading";
import { applyMiddleware, createStore } from "redux";
import reducers from "../src/functionality/reducers";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Navbar from "./components/Navbar";
import LoginScreen from "./components/LoginScreen";
import thunk from "redux-thunk";
import HomeLogged from "./pages/HomeLogged";
import Program from "./pages/Program";
import Moment from "./pages/Moment";
import Practices from "./pages/Practices";
import PracticeScreen from "./components/happyPractice/PracticeScreen";
import RegisterScreen from "./components/RegisterScreen";
// import { syncHistoryWithStore } from "react-router-redux";
// import browserHistory from "history/createBrowserHistroy";
// import { createBrowserHistory } from "history";
// import MiCamino from "./pages/MiCamino";

const store = createStore(reducers, applyMiddleware(thunk));

// const history = syncHistoryWithStore(createBrowserHistory, store);

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/home-logged" component={HomeLogged} />
					<Route exact path="/singin" component={LoginScreen} />
					<Route exact path="/signup" component={RegisterScreen} />
					<Route exact path="/happiness-program" component={Program} />
					<Route exact path="/happiness-moment" component={Moment} />
					<Route exact path="/happiness-practices" component={Practices} />
					<Route
						exact
						path="/happiness-practices/content/HappyPractice/:title/:codActivity"
						component={PracticeScreen}
					/>
					<Route exact path="/mypath" component={MiCamino} height="20px" />
					<Route path="*" component={Error404} />
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
