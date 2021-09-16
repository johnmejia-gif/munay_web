import React from "react";
import "../components/styles/micamino.css";
import Grid from "@material-ui/core/Grid";
import Navbar from "../components/Navbar";
import logomunay from "../assets/img/logo-munay.png";
import flower from "../assets/img/flower.png";
import calm from "../../src/calm.svg";
import { Link } from "react-router-dom";
// import Icon from "../components/Icon";

const MiCamino = () => {
	return (
		<Grid container>
			<Grid item xs={3} className="menuppal">
				<Link to="/" className="linkinicio">
					<div className="contenedor-icono">
						<img src={flower} alt="Munay" className="logo" />
					</div>
				</Link>
			</Grid>
			<Grid item xs={9}>
				<div className="contenedor">
					<img src={logomunay} className="imgmunay" alt="logo" />
					{/* <img src={calm} className="App-logo" alt="logo" /> */}
					{/* <h2 className="titulo">MUNAY</h2> */}
					<h3 className="parrafo2">
						La felicidad empieza por conocerte, vive esta sección como tu
						espejo, tu diario, tu lugar de encuentro contigo
					</h3>
					<Grid container>
						<Grid item xs={3}>
							<div className="petalos1-1">
								{/* <Icon
									name="flush-now"
									color="#5ADDB8"
									size={iconSize}
									style={styles.icon03}
								/> */}
							</div>
						</Grid>
						<Grid item xs={3}>
							<div className="petalos1-3"></div>
						</Grid>
						<Grid item xs={3}>
							<div className="petalos1-4"></div>
						</Grid>
						<Grid item xs={3}>
							<div className="petalos1-2"></div>
						</Grid>
						{/* <Grid item xs={1} className="petalos1"></Grid>
						<Grid item xs={1} className="petalos1"></Grid> */}
					</Grid>
					{/* <h3 className="parrafo1">La felicidad .....</h3>
					<h3 className="parrafo2">La felicidad .....</h3>
					<h3 className="parrafo3">La felicidad .....</h3>
					<h3 className="parrafo4">La felicidad .....</h3> */}
				</div>
			</Grid>
		</Grid>
	);
};

export default MiCamino;
