import React, { useEffect } from "react";
import * as practiceActions from "../../functionality/actions/practiceActions";
import * as activityActions from "../../functionality/actions/activityActions";
import * as userActions from "../../functionality/actions/userActions";
import { connect } from "react-redux";
import { useParams } from "react-router";
import PracticeContent from "./PracticeContent";
import Loader from "../Loader";
import ReactPlayer from "react-player";
import "../styles/PracticeScreen.css";
import Modal from "../../components/Modal";
import { useModal } from "../hooks/useModal";
import defecto from "../../../src/assets/img/bg-default.jpg";
import ActivityProgress from "../ActivityProgress";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const {
	practiceSelectedActivity,
	practiceChanegeLoading,
	practiceListLikedActivities,
} = practiceActions;

const { activityPercentage } = activityActions;

const { userLikeResource } = userActions;

const PracticeScreen = (props) => {
	const valorPorcentaje = 0;
	let { title } = useParams();
	let { codActivity } = useParams();
	// console.log(">><<>><<<>>  que tenemos en titulo: ", title);
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
		// console.log("+++++ ha ingresado a use effect con user:", user);
		practiceSelectedActivity(codActivity);
		if (user) {
			activityPercentage(codActivity);
		}
		if (!practice_activities_liked && user) {
			practiceListLikedActivities();
		}
		return () => {
			practiceChanegeLoading(true);
		};
	}, []);

	// let { activities } = practice_activity_selected;
	// const list_activities = activities.filter((item) => item.section !== 1);
	// console.log(
	// 	"***que hay en practice_activity_selected:",
	// 	practice_activity_selected
	// );
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

	// console.log("**** en propsNavigation.title :", title);
	const videoPrueba =
		"https://firebasestorage.googleapis.com/v0/b/munay-db.appspot.com/o/resources%2Fvideo%2Ftrim.C2E97F89-0B0C-4B6F-ABAA-81F6C4A8D914.MOV?alt=media&token=0a016196-ab58-4535-b84b-aabd4c5137c2";
	const videoPrueba2 =
		"https://firebasestorage.googleapis.com/v0/b/munay-db.appspot.com/o/resources%2Fvideo%2Fvalor%20propio%20-%20baile.mp4?alt=media&token=1b9dbc60-2e3e-4755-b79f-fe700600050d";

	const fotoPrueba1 =
		"https://firebasestorage.googleapis.com/v0/b/munay-db.appspot.com/o/resources%2Fcoverpage%2FCopia%20de%20Amarillo%20Negro%20Youtube%20Canal%20Arte.png?alt=media&token=c168831c-0403-47ad-b8dc-541536e2acd8";
	const fotoPrueba2 =
		"https://firebasestorage.googleapis.com/v0/b/munay-db.appspot.com/o/resources%2Fcoverpage%2FCopia%20de%20Amarillo%20Negro%20Youtube%20Canal%20Arte%20(9).jpg?alt=media&token=d93e6cec-3a2f-4e3f-8acc-9cb555f87889";

	const [isOpenModal1, openModal1, closeModal1] = useModal(false); //uno para cada modal que se utilice

	const clickCrear = () => {
		openModal1();
	};

	function renderGoIntro(loading) {
		let intro = null;
		let intro2 = null;
		// let intro1 = "url(../../../src/assets/img/bg-default.jpg)";
		let intro1 = null;
		let codActivity = null;
		let codProgram = null;
		if (!loading) {
			intro = practice_activity_selected.activities.filter(
				(item) => item.section === 1
			);
			codActivity = intro.length > 0 ? intro[0].id : null;
			codProgram = intro.length > 0 ? intro[0].cod_activity : null;
			intro2 = intro.length > 0 ? intro[0].resource.resource : null;
			intro1 = intro.length > 0 ? intro[0].resource.coverpage : null;
			// console.log("En intro1 hay:", intro1);
			// intro1 = intro.length > 0 ? intro[0].resource.coverpage : null;
		}

		const divStyle = {
			// color: "blue",
			// backgroundImage: "url(" + intro1 + ")",
			// backgroundImage:
			// 	"url(https://firebasestorage.googleapis.com/v0/b/munay-db.appspot.com/o/resources%2Fcoverpage%2FCopia%20de%20Amarillo%20Negro%20Youtube%20Canal%20Arte%20(9).jpg?alt=media&token=d93e6cec-3a2f-4e3f-8acc-9cb555f87889 )",
			maxWidth: "100%",
			minHeight: "300px",
			// backgroundSize: "cover",
			margin: "0px",
			padding: "0px",
			height: "100px",
			backgroundColor: "red",
			width: "300px",
			// textAlign: "center",
		};
		const endActivity = (closeModal1) => {
			console.log("#### TERMINÓ LA ACTIVIDAD #######");
			closeModal1();
		};
		const pauseActivity = () => {
			console.log("Video pausado");
		};

		return (
			// <div style={divStyle}>
			<div className="introduction">
				{/* <img src="../../src/assets/img/bg-default.jpg" alt="" /> */}
				{/* <h2>Hooo lllaaa</h2> */}
				{/* <h3>{intro}</h3>
				<h3>{videoPrueba}</h3> */}
				{intro2 && (
					<div>
						{/* <img src={intro1} alt="tonto" onClick={clickCrear}></img> */}
						<button onClick={clickCrear} className="botonintro">
							<img src={intro1} alt="Introduction"></img>
							<h2>Correr Introducción</h2>
						</button>
						<Modal isOpen={isOpenModal1} closeModal={closeModal1}>
							{isOpenModal1 && (
								<ReactPlayer
									url={intro2}
									width="900px"
									height="auto"
									controls
									volume="0.3"
									playing="true"
									onEnded={() => endActivity(closeModal1)}
									onPause={() => pauseActivity()}
									// light
								/>
							)}
						</Modal>
					</div>
				)}
			</div>
		);
	}
	const showPercentage = activity_percentage;
	return (
		<div className="contenedor-practices">
			<h2 className="title-practices">{title}</h2>
			{pratice_loading || !practice_activity_selected ? (
				<Loader />
			) : (
				<h3 className="description-practices">
					{practice_activity_selected.description}
				</h3>
			)}
			{/* {practice_activities_liked && (
				<h3>{practice_activity_selected.description}</h3>
			)} */}
			{/* <h3>{codActivity}</h3> */}
			{pratice_loading || !practice_activity_selected ? (
				<Loader />
			) : (
				console.log(
					"<<>> que hay en practice_activity_selected.activities",
					practice_activity_selected.activities
				)
			)}

			<div>{renderGoIntro(pratice_loading)}</div>
			<br />

			<br />
			{user && (
				<div>
					<h2 className="description-practices">
						El avance de actividades es: {activity_percentage} %
					</h2>

					{/* <Box sx={{ width: 700 }}>
						<Slider
							disabled
							aria-label="Restricted values"
							value={activity_percentage}
							// valueLabelFormat={valueLabelFormat}
							// getAriaValueText={valuetext}
							// step={null}
							valueLabelDisplay="on"
						/>
						<p>El valro de avance es: {activity_percentage}</p>
					</Box> */}

					<ActivityProgress percentage={showPercentage} />
				</div>
			)}
			<hr></hr>
			{pratice_loading || !practice_activity_selected ? (
				<Loader />
			) : practice_activity_selected !== "error" ? (
				<div>
					{/* {user && <ActivityProgress percentage={activity_percentage} />} */}
					<PracticeContent />
				</div>
			) : (
				<h2>
					Lo sentimos hubo un error, en este momento no podemos mostrate el
					entrenamiento.
				</h2>
			)}
			{/* <h3>{pratice_loading}</h3> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(PracticeScreen);
