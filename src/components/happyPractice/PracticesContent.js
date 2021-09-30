import React, { useEffect } from "react";
import * as practiceActions from "../../functionality/actions/practiceActions";
import * as activityActions from "../../functionality/actions/activityActions";
import * as userActions from "../../functionality/actions/userActions";
import { connect } from "react-redux";
import { useParams } from "react-router";

const {
	practiceSelectedActivity,
	practiceChanegeLoading,
	practiceListLikedActivities,
} = practiceActions;

const { activityPercentage } = activityActions;

const { userLikeResource } = userActions;

const PracticesContent = (props) => {
	let { title } = useParams();
	let { codActivity } = useParams();
	console.log(">><<>><<<>>  que tenemos en titulo: ", title);
	// const title = localStorage.getItem("@MUNAY:propsNavigation.title");
	// const codActivity = localStorage.getItem(
	// "@MUNAY:propsNavigation.codActivity"
	// );
	const {
		practiceReducer: {
			pratice_loading,
			practice_activity_selected,
			practice_activities_liked,
		},
		userReducer: { user, user_like_resource, user_permissions },
		activityReducer: { activity_percentage },
		practiceSelectedActivity,
		practiceListLikedActivities,
		practiceChanegeLoading,
		activityPercentage,
		userLikeResource,
	} = props;

	useEffect(() => {
		console.log("+++++ ha ingresado a use effect");
		practiceSelectedActivity(codActivity);
		if (user) {
			activityPercentage(codActivity);
		}
		if (!practice_activities_liked && user) {
			practiceListLikedActivities();
		}
	}, []);
	// let { activities } = practice_activity_selected;
	// const list_activities = activities.filter((item) => item.section !== 1);
	console.log(
		"***que hay en practice_activity_selected:",
		practice_activity_selected
	);
	const resourceName = (resource_prize) => {
		switch (resource_prize) {
			case 2:
				return {
					name: "Óxigeno",
					english_name: "oxygen",
				};
			case 3:
				return {
					name: "Sol",
					english_name: "sun",
				};
			case 4:
				return {
					name: "Agua",
					english_name: "water",
				};
			default:
				return {
					name: "Tierra",
					english_name: "earth",
				};
		}
	};

	// let resource_data = resourceName(practice_activity_selected.resource_prize);
	// let resource_english_name = resource_data.english_name;
	// let points = `1 ${resource_data.name}`;
	// let subtitle = practice_activity_selected.name;
	// let codProgram = practice_activity_selected.id;
	// let section = "happy-practice";
	// let headerTitle = `Práctica - ${subtitle}`;

	// if (!list_activities.length) {
	// 	return <h2>En este momento no hay entrenamientos disponibles.</h2>;
	// }

	let purple = "#A72BFC";
	let white = "#ffffff";

	console.log("**** en propsNavigation.title :", title);

	return (
		<div>
			<h2>aqui va el contenido de cada práctica seleccionada</h2>
			<h3>{title}</h3>
			<h3>{codActivity}</h3>
			{/* <h3>el titulo es {titulo}</h3> */}
		</div>
	);
};

const mapStateToProps = ({ practiceReducer, activityReducer, userReducer }) => {
	return {
		practiceReducer,
		activityReducer,
		userReducer,
	};
};

const mapDispatchToProps = {
	practiceSelectedActivity,
	practiceChanegeLoading,
	practiceListLikedActivities,
	activityPercentage,
};

export default connect(mapStateToProps, mapDispatchToProps)(PracticesContent);
