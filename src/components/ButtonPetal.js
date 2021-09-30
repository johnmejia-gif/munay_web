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

	function hagaEsto() {
		console.log("Entra a hacer esto....", propsNavigation.title);
		localStorage.setItem("@MUNAY:propsNavigation.title", name);
		localStorage.setItem("@MUNAY:propsNavigation.codActivity", id);
	}
	const goTo = "/happiness-practices/content/" + name + "/" + id;

	return (
		<Grid item xs={3}>
			<div onClick={hagaEsto}>
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
