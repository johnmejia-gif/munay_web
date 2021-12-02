import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import "../components/styles/RegisterScreen.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouteLink, useHistory } from "react-router-dom";
import * as userActions from "../functionality/actions/userActions";
import * as globalActions from "../functionality/actions/globalActions";
import { connect } from "react-redux";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://codigom.com.co/">
				codigom.com.co
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const {
	userChangeEmail,
	userChangePassword,
	userChangeUsername,
	userRegister,
	userClear,
} = userActions;

const { globalTermsConditions, globalPrivacyPolicies } = globalActions;

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		borderRadius: "20px",
	},
}));

function RegisterScreen(props) {
	const {
		userChangeEmail,
		userChangePassword,
		userChangeUsername,
		userRegister,
		userClear,
		globalTermsConditions,
		globalPrivacyPolicies,
		userReducer: {
			user_username,
			user_email,
			user_password,
			user_loading,
			user_error,
			user_modal_message,
		},
	} = props;

	const classes = useStyles();
	const history = useHistory();

	const signup = async (e) => {
		e.preventDefault();
		await userRegister();
		const res = localStorage.getItem("@Munay:isLogged");
		if (res === "is_logged") {
			history.push("/home-logged");
		}
	};

	return (
		<div className="contenedor03">
			<Container component="main" maxWidth="xs">
				<div className="fondo">
					<CssBaseline />
					<div className={classes.paper}>
						{/* <Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar> */}
						<Typography component="h1" variant="h5">
							Registro
						</Typography>
						<h3>
							{`Regístrate y accede a una semana de prueba de Munay Premium`}
						</h3>
						<h3>
							{`(Si, solo tus datos, de verdad es gratis, solo pagas hasta que tú lo decides)`}
						</h3>
						<form className={classes.form} noValidate>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={12}>
									<input
										type="text"
										className="campotextoRegister"
										value={user_username}
										onChange={(e) => userChangeUsername(e.target.value)}
										autoComplete="username"
										name="username"
										// variant="outlined"
										required
										fullWidth
										id="username"
										placeholder="Nombre de Usuario"
										autoFocus
									/>
								</Grid>
								<Grid item xs={12}>
									<input
										className="campotextoRegister"
										value={user_email}
										onChange={(e) => userChangeEmail(e.target.value)}
										required
										fullWidth
										id="email"
										placeholder="Correo Electrónico"
										name="email"
										autoComplete="email"
									/>
								</Grid>

								<Grid item xs={12}>
									<input
										className="campotextoRegister"
										value={user_password}
										onChange={(e) => userChangePassword(e.target.value)}
										variant="outlined"
										required
										fullWidth
										name="password"
										placeholder="Contraseña"
										type="password"
										id="password"
										autoComplete="current-password"
									/>
								</Grid>
								{/* <Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox value="allowExtraEmails" color="secondary" />
								}
								label="Quiero recibir información, promociones y actualizaciones por correo electrónico"
							/>
						</Grid> */}
							</Grid>
							<button
								className="buttonRegister"
								onClick={signup}
								type="submit"
								fullWidth
								variant="contained"
								// color="secondary"
								// className={classes.submit}
							>
								REGISTRARME
							</button>

							<Grid container justifyContent="flex-end">
								<Grid item>
									<RouteLink to="singin" className="linkRegister">
										Ya tengo una cuenta, Iniciar Sesión
									</RouteLink>
								</Grid>
							</Grid>
						</form>
					</div>
					<Box mt={5}>
						<Copyright />
					</Box>
				</div>
			</Container>
		</div>
	);
}

const mapStateToProps = ({ userReducer }) => {
	return {
		userReducer,
	};
};

const mapDispatchToProps = {
	userChangeEmail,
	userChangePassword,
	userChangeUsername,
	userRegister,
	userClear,
	globalTermsConditions,
	globalPrivacyPolicies,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
