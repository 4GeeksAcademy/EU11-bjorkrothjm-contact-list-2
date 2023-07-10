import React from "react";
import { Link } from "react-router-dom";

import "../../styles/navbar.css";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light d-flex- justify-content-around" style={{margin: "auto",width: "85%"}}>
				<Link to="/demo">
					<button className="btn btn-success">Demo</button>
				</Link>
				<Link className="navbar-btn-right" to="/single" style={{margin: "10px 0px"}}>
					<button className="btn btn-success">Check the Context in action</button>
				</Link>
		</nav>
	);
};
