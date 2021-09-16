import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import "../components/styles/LoginScreen.css";
import TextField from "@material-ui/core/TextField";
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
import { auth } from "../settings";
import * as userActions from "../functionality/actions/userActions";
import { connect } from "react-redux";
import Loader from "./Loader";
import Loading from "./Loading";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(2),
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
		marginTop: theme.spacing(2),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		// background: "#Ffba24",
	},
}));

const { userChangeEmail, userChangePassword, userAuth, userClear } =
	userActions;

function LoginScreen(props) {
	const {
		userChangeEmail,
		userChangePassword,
		userAuth,
		userReducer: {
			user_email,
			user_password,
			user_error,
			user_loading,
			user_modal_message,
		},
	} = props;

	const classes = useStyles();
	const history = useHistory();

	// useEffect(() => {
	// 	userClear();
	// }, []);

	const signin = async (e) => {
		e.preventDefault();
		const response = await userAuth();
		const res = localStorage.getItem("@Munay:isLogged");
		// const { user_error } = getState().userReducer;
		console.log("la respuesta response es:", response);
		console.log("el user_error es:", user_error);
		if (res === "is_logged") {
			history.push("/home-logged");
		}
	};

	return (
		<div className="contenedor02">
			<Container component="main" maxWidth="xs">
				{user_loading ? (
					<Loader />
				) : (
					<div className="fondo">
						<CssBaseline />
						<div className={classes.paper}>
							<Avatar className={classes.avatar}>
								<LockOutlinedIcon />
							</Avatar>
							<Typography component="h1" variant="h5">
								Iniciar Sesión
							</Typography>
							<form className={classes.form} noValidate>
								<TextField
									className="campotexto"
									value={user_email}
									onChange={(e) => userChangeEmail(e.target.value)}
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="email"
									label="Correo Electrónico"
									name="email"
									autoComplete="email"
									autoFocus
								/>
								<TextField
									className="campotexto"
									value={user_password}
									onChange={(e) => userChangePassword(e.target.value)}
									variant="outlined"
									margin="normal"
									required
									fullWidth
									name="password"
									label="Contraseña"
									type="password"
									id="password"
									autoComplete="current-password"
								/>
								{/* <FormControlLabel
									control={<Checkbox value="remember" color="secondary" />}
									label="Recordarme"
								/> */}
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="secondary"
									className={classes.submit}
									onClick={signin}
								>
									Iniciar Sesión
								</Button>
								<Grid container>
									<Grid item xs>
										<Link href="#" variant="body2">
											olvidó su contraseña?
										</Link>
									</Grid>
									<Grid item>
										<RouteLink to="signup">
											{"No tiene cuenta? Registrarse"}
										</RouteLink>
									</Grid>
								</Grid>
							</form>
						</div>
						<Box mt={8}>
							<Copyright />
						</Box>
					</div>
				)}
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
	userAuth,
	userClear,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
