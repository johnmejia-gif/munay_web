import React from "react";
import { Redirect } from "react-router";
import * as userActions from "../functionality/actions/userActions";
import "../components/styles/Home.css";
import { connect } from "react-redux";

const { userRemember } = userActions;

function Home(props) {
	const { userRemember } = props;
	const munayIsLogged = localStorage.getItem("@Munay:isLogged");
	// console.log("en local is logged?", munayIsLogged);
	// const munayIsLogged = JSON.parse(jsonValue);
	// console.log("en el parse: ", munayIsLogged);
	const userInfo = JSON.parse(localStorage.getItem("@Munay:userData"));
	const userIsRemember = localStorage.getItem("@Munay:responseSignIn");
	// console.log("en userIsRemembrer: ", userIsRemember);
	if (userIsRemember) {
		if (userInfo) {
			console.log(
				"1-- para empezar en local @Munay:userData:",
				userInfo.username
			);
		}
		userRemember();
	}
	return (
		<div>
			{userIsRemember ? (
				<Redirect to="/home-logged" />
			) : (
				<div className="contenedor01">
					<h2>Hola</h2>
					<p>No hay @Munay:userData</p>
				</div>
			)}
		</div>
	);
}

const mapDispatchToProps = {
	userRemember,
};

export default connect(null, mapDispatchToProps)(Home);
