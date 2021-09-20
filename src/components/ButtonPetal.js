import { Grid } from "@material-ui/core";
import React from "react";
import fondoprueba from "../../src/assets/img/bg-default.jpg";
import "./styles/ButtonPetal.css";

const ButtonPetal = (props) => {
	let {
		// userReducer: { user, user_permissions },
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

	return (
		<Grid item xs={3}>
			<div style={divStyle}>
				<div className="buttonPetals1">
					{/* <img src={coverpage} alt="logo-algo" height="200px" /> */}
				</div>
			</div>
			<h2 className="nombre-practica">{name}</h2>
		</Grid>
	);
};

export default ButtonPetal;
