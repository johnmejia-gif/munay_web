import React from "react";
import { connect } from "react-redux";
import * as globalActions from "../functionality/actions/globalActions";
import defaultImage from "../assets/img/bg-default.jpg";
import "./styles/ButtonList.css";
import { Grid } from "@mui/material";
// import CacheImage from "./CacheImage";
// import Icon from "./Icon";

const { openCloseTooltip } = globalActions;

function ButtonList(props) {
	let {
		// action,
		giveLike,
		changeLike,
		resource,
		colorIcon,
		isLiked,
		// icon,
		codLiked,
		typeResource,
		disabled,
		openCloseTooltip,
	} = props;
	codLiked = codLiked ? codLiked : resource.id;

	return (
		<Grid item xs={12}>
			<div className="cont_buttonList">
				<div
					className="cont_pr_list"
					onClick={() => {
						if (!disabled) {
							console.log("ejecuta la acción");
							// action();
						} else {
							openCloseTooltip({
								status: true,
								title: "",
								message:
									"La membresía free tiene acceso parcial a Munay. Ayúdamos a llegar a más personas y a darte la mejor experiencia con la suscripción Munay Premuim.",
								subscription: true,
							});
						}
					}}
					// activeOpacity={0.85}
				>
					<div className="cont_im_pr">
						{resource.coverpage ? (
							// <CacheImage uri={resource.coverpage} styles={styles.imagePrev} />

							<img
								src={resource.coverpage}
								alt="Introduction"
								height="50px"
							></img>
						) : (
							// <h3>Aqui va la imagen de enlace de lo que va a ver</h3>
							<img src={defaultImage} />
						)}
					</div>
					<div className="text_pr">
						<h3>{resource.title}</h3>
						{/* {resource.time && resource.time > 0 &&
            <Text style={styles.time} allowFontScaling={false}>
              {Math.round(resource.time / 60)} min
            </Text>
          } */}
					</div>
				</div>
				<div>
					<div
					// onPress={action}
					// style={styles.buttonOptions}
					// disabled={disabled}
					>
						{!disabled ? (
							// <Icon name={icon} size={20} color={colorIcon} />
							<h2 className="description-practices">Habilitado</h2>
						) : (
							// <Icon name="lock" size={20} color={colorIcon} />
							<h2 className="description-practices">Bloqueado</h2>
						)}
					</div>
					{/* {giveLike && (
					<div
						style={styles.buttonOptions}
						onClick={() => changeLike(codLiked, typeResource)}
					>
						{isLiked ? (
							<Icon name="like-select" size={20} color={colorIcon} />
						) : (
							<Icon name="like" size={20} color={colorIcon} />
						)}
					</div>
				)} */}
				</div>
			</div>
		</Grid>
	);
}

ButtonList.defaultProps = {
	icon: "play",
	colorIcon: "#AA0F81",
};

const mapDispatchToProps = {
	openCloseTooltip,
};

export default connect(null, mapDispatchToProps)(ButtonList);
