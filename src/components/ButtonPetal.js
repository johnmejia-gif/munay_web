import { Grid, Button } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import fondoprueba from "../../src/assets/img/bg-default.jpg";
import "./styles/ButtonPetal.css";

function ButtonPetal(props) {
	let {
		userReducer: { user, user_permissions },
		type,
		coverpage,
		id,
		name,
		to,
		action,
		marginBottom,
		marginHorizontal,
		icon,
		disabled,
		subscriptionModal,
	} = props;

	let propsNavigation = {
		codActivity: id,
		title: name,
	};

	const divStyle = {
		// color: "blue",
		backgroundImage: "url(" + coverpage + ")",
		maxWidth: "100%",
		minHeight: "300px",
		backgroundSize: "cover",
		margin: "20px",
		padding: "0px",
		// height: "100px",
	};

	function petalClick() {
		// console.log("Entra a hacer esto....", propsNavigation.title);
		localStorage.setItem("@MUNAY:propsNavigation.title", name);
		localStorage.setItem("@MUNAY:propsNavigation.codActivity", id);
	}

	to = to && id === "ayunodigital" ? "DigitalFast" : to;
	to = to && id === "ConsciousMusic" ? "MusicPractice" : to;
	to = to && id === "ConsciousReading" ? "ReadPractice" : to;
	to = to && id === "IntermittentFasting" ? "IntermittentFasting" : to;
	marginBottom = marginBottom ? marginBottom : 0;
	marginHorizontal = marginHorizontal ? marginHorizontal : 0;
	if (!user && (id === "ayunodigital" || id === "IntermittentFasting")) {
		to = "Register";
	}
	if (
		user &&
		!user_permissions &&
		(id === "ayunodigital" || id === "IntermittentFasting")
	) {
		to = null;
		action = () => {
			subscriptionModal(true);
		};
	}

	const goTo = "/happiness-practices/content/" + to + "/" + name + "/" + id;

	return (
		<Grid item xs={3}>
			<div onClick={petalClick}>
				{/* <Link to="/happiness-practices/content/:juanito"> */}
				<Link to={goTo}>
					<div style={divStyle}>
						<div className="buttonPetals1">
							{/* <img src={coverpage} alt="logo-algo" height="200px" /> */}
						</div>
					</div>
					<h2 className="nombre-practica">{name}</h2>
					{/* <h2 className="nombre-practica">{id}</h2> */}
					{/* <h2 className="nombre-practica">{type}</h2> */}
				</Link>
			</div>
		</Grid>
	);
}

const mapStateToProps = ({ userReducer }) => {
	return {
		userReducer,
	};
};

export default connect(mapStateToProps, null)(ButtonPetal);
