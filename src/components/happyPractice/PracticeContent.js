import React from "react";
import { connect } from "react-redux";
import * as userActions from "../../functionality/actions/userActions";
import ButtonList from "../ButtonList";
// import actionToResource from "../actionToResource";

const { userLikeResource } = userActions;

function PracticeContent(props) {
	const {
		practiceReducer: { practice_activity_selected, practice_activities_liked },
		userReducer: { user, user_like_resource, user_permissions },
		userLikeResource,
	} = props;
	console.log("**** en user_permisions hay:", user_permissions);

	let { activities } = practice_activity_selected;

	const list_activities = activities.filter((item) => item.section !== 1);

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

	let resource_data = resourceName(practice_activity_selected.resource_prize);
	let resource_english_name = resource_data.english_name;
	let points = `1 ${resource_data.name}`;
	let subtitle = practice_activity_selected.name;
	let codProgram = practice_activity_selected.id;
	let section = "happy-practice";
	let headerTitle = `Práctica - ${subtitle}`;

	if (!list_activities.length) {
		return <h3>En este momento no hay entrenamientos disponibles.</h3>;
	}
	let purple = "#A72BFC";
	let white = "#ffffff";

	return (
		<>
			{list_activities.map((activity, index) => {
				let defaultProps = {
					subtitle,
					points,
					codActivity: activity.id,
					codProgram,
					resource: resource_english_name,
					time: activity.resource.time,
					section,
					background: purple,
					backgroundButton: white,
					colorButton: purple,
					backgroundPetal: "purple",
					colorIcon: white,
					colorIconModal: purple,
					colorButtonModal: purple,
					colorTitle: white,
					shadow: true,
					percentage: true,
				};
				// let action = actionToResource(
				// 	activity,
				// 	headerTitle,
				// 	section,
				// 	"Práctica de Felicidad",
				// 	"Práctica",
				// 	defaultProps,
				// 	white,
				// 	white,
				// 	white,
				// 	purple,
				// 	purple,
				// 	white,
				// 	user_permissions
				// );

				let isLiked = [];
				if (user_like_resource) {
					isLiked = user_like_resource.filter(
						(like) => like.cod_resource === activity.resource.id
					);
				}

				let itIsVisible = false;
				if (user_permissions || parseInt(activity.resource.is_private) === 1) {
					itIsVisible = true;
				}
				if (activity.type_resource === 3) {
					itIsVisible = true;
				}

				// if (!user) {
				// 	action.action = () => navigation.navigate("Register");
				// }

				return (
					<div>
						<br />
						<ButtonList
							key={index}
							// action={action.action}
							resource={activity.resource}
							isLiked={isLiked.length > 0 && isLiked[0].status}
							giveLike={user && practice_activities_liked}
							changeLike={userLikeResource}
							colorIcon={purple}
							// icon={action.icon}
							typeResource={activity.type_resource}
							disabled={!itIsVisible}
						/>
					</div>
				);
			})}
		</>
	);
}

const mapStateToProps = ({ userReducer, practiceReducer }) => {
	return {
		userReducer,
		practiceReducer,
	};
};

const mapDispatchToProps = {
	userLikeResource,
};

export default connect(mapStateToProps, mapDispatchToProps)(PracticeContent);
