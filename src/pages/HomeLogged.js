import React from "react";
import "../components/styles/HomeLogged.css";

const HomeLogged = () => {
	const munayIsLogged = localStorage.getItem("@Munay:isLogged");
	console.log("en local is logged?", munayIsLogged);
	// const munayIsLogged = JSON.parse(jsonValue);
	// console.log("en el parse: ", munayIsLogged);
	const userInfo = JSON.parse(localStorage.getItem("@Munay:userData"));
	if (userInfo) {
		console.log("en local @Munay:userData:", userInfo.username);
	}
	return (
		<div className="contenedor01-1">
			<h2>Hola</h2>
			<h3>lo que hay en munayIsLogged es: {munayIsLogged}</h3>
		</div>
	);
};

export default HomeLogged;
