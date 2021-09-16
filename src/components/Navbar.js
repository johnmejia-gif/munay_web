import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import "../components/styles/Navbar.css";
// import logo from "../assets/logoelautopartista.png";
// import { CallMissedSharp, ShoppingCart } from "@material-ui/icons";
// import { classImplements } from "@babel/types";
// import { Badge } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
// import { useStateValue } from "../StateProvider";
// import { auth } from "../firebase";
// import { actionTypes } from "../reducer";
import flower from "../assets/img/flower.png";
import * as userActions from "../functionality/actions/userActions";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginBottom: "70px",
	},

	appBar: {
		backgroundColor: "#82b5d2",
		boxShadow: "none",
		height: "70px",
	},
	grow: {
		flexGrow: 1,
	},
	button: {
		marginLeft: theme.spacing(2),
	},
	menuButton: {
		height: "70px",
	},
	image: {
		padding: "10px",
		// marginRight: "10px",
		height: "70px",
	},
	usuario: {
		color: "#FFE4C4",
		fontSize: "12px",
	},
	sesion: {
		color: "white",
		fontSize: "15px",
	},
	iconshop: {
		color: "#fff8dc",
	},
	linksesion: {
		textDecoration: "none",
	},
}));

const { userSignOut } = userActions;

function Navbar(props) {
	console.log("empezó a ejecutar el Navbar");

	const {
		userSignOut,
		userReducer: { user, user_all_data },
	} = props;

	console.log("que hay en user en el navbar? : ", user);
	// const userInfo = localStorage.getItem("@Munay:userData");

	let nicName = null;

	if (user) {
		if (user_all_data) {
			nicName = user_all_data.username;
		} else {
			nicName = user.email;
		}
	}

	console.log("en el nicname hay:", nicName);

	const classes = useStyles();
	const history = useHistory();

	const goOut = async () => {
		if (user) {
			console.log("entó a borrar el usuario");
			await userSignOut();
			// console.log(response);
			history.push("/");
		}
	};

	return (
		<div position="fixed" className={classes.root}>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					{user ? (
						<div className="root2">
							<Link to="/home-logged">
								<IconButton
									edge="start"
									className={classes.menuButton}
									color="inherit"
									aria-label="menu"
								>
									<img src={flower} className={classes.image} />
								</IconButton>
							</Link>
							<div className={classes.button}>
								<Link to="/happiness-program" className={classes.linksesion}>
									<Button className={classes.sesion}>
										<strong>Programa de felicidad</strong>
									</Button>
								</Link>
							</div>
							<div className={classes.button}>
								<Link to="/happiness-moment" className={classes.linksesion}>
									<Button className={classes.sesion}>
										<strong>Momento Feliz</strong>
									</Button>
								</Link>
							</div>
							<div className={classes.button}>
								<Link to="/happiness-practices" className={classes.linksesion}>
									<Button className={classes.sesion}>
										<strong>Prácticas de Felicidad</strong>
									</Button>
								</Link>
							</div>
						</div>
					) : (
						<Link to="/">
							<IconButton
								edge="start"
								className={classes.menuButton}
								color="inherit"
								aria-label="menu"
							>
								<img src={flower} className={classes.image} />
							</IconButton>
						</Link>
					)}

					<div className={classes.grow} />
					<Typography variant="h6" className={classes.usuario} component="p">
						{/* {user ? user.email : "invitado"} */}
						{nicName ? nicName : "Invitado"}
					</Typography>

					<div className={classes.button}>
						<Link to="singin" className={classes.linksesion}>
							<Button
								varitant="outlined"
								onClick={goOut}
								className={classes.sesion}
							>
								<strong>{user ? "Cerrar sesión" : "Iniciar Sesión"}</strong>
							</Button>
						</Link>
						{/* <Link to="checkout-page">
							<IconButton aria-label="show cart items">
								<Badge badgeContent={basket?.length} color="primary">
									<ShoppingCart fontSize="large" className={classes.iconshop} />
								</Badge>
								</IconButton>
							</Link> */}
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}

const mapStateToProps = ({ userReducer }) => {
	return { userReducer };
};

const mapDispatchToProps = { userSignOut };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
