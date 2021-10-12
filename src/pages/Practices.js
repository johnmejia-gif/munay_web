import { Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import ButtonPetal from "../components/ButtonPetal";
import "../components/styles/Practices.css";

const Practices = (props) => {
	const {
		contentReducer: { content_loading, practices },
	} = props;
	// console.log(">>>>>>  Que hay en practices:...");
	// console.log(practices);
	// console.log("valor de Content_loading:...");
	// console.log(content_loading);
	return (
		<div className="contenedor-practices">
			<h2 className="title-practices">Prácticas de Felicidad</h2>
			<h3 className="description-practices">
				Si quieres entrenar solo tu cuerpo, mente, emociones o energía, o
				entrenar una práctica de felicidad en particular este es el lugar.
			</h3>

			<Grid container>
				{practices.map(
					(practice, index) => {
						return <ButtonPetal {...practice} key={index} to="HappyPractice" />;
					}
					// <p>hola, hola , hola</p>
					// <h3>{practice.name}</h3>
					// <Grid item xs={3}>
					// 	<div className="petalos1-3">{/* <p>{practice.name}</p> */}</div>
					// </Grid>
					// <ButtonPetal />
				)}
			</Grid>
		</div>
	);
};

const mapStateToProps = ({ contentReducer }) => {
	return {
		contentReducer,
	};
};

export default connect(mapStateToProps, null)(Practices);
