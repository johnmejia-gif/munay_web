import React, { useEffect } from "react";
import { connect } from "react-redux";
import "../components/styles/HomeLogged.css";
import * as contentActions from "../functionality/actions/contentActions";
import * as userActions from "../functionality/actions/userActions";

const { allContents } = contentActions;
const { userData } = userActions;

function HomeLogged(props) {
	const {
		allContents,
		userData,
		contentReducer: { content_loading },
		userReducer: { user },
	} = props;

	useEffect(() => {
		if (user) {
			userData();
		}
		allContents();
		// if (content_loading) {
		// 	allContents();
		// }
	}, []);

	const munayIsLogged = localStorage.getItem("@Munay:isLogged");
	// console.log("en local is logged?", munayIsLogged);
	// const munayIsLogged = JSON.parse(jsonValue);
	// console.log("en el parse: ", munayIsLogged);

	const userInfo = JSON.parse(localStorage.getItem("@Munay:userData"));
	// if (userInfo) {
	// 	console.log("en local @Munay:userData:", userInfo.username);
	// }
	return (
		<div className="contenedor01-1">
			{user && <h2>Hola {user.displayName}</h2>}
			<h3>lo que hay en munayIsLogged es: {munayIsLogged}</h3>
		</div>
	);
}

const mapStateToProps = ({
	// globalReducer,
	userReducer,
	contentReducer,
	// accompanyReducer,
}) => {
	return {
		// globalReducer,
		userReducer,
		contentReducer,
		// accompanyReducer,
	};
};

const mapDispatchToProps = {
	// newMessages,
	userData,
	allContents,
	// getUsersActive,
	// accompanyRequestAccompanying,
	// changeContent,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeLogged);
