import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/new-contact.css";

export const NewContact = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	return (
        <div className="container">

            <h1 className="header-one">Add a new contact</h1>

            <form>
                <div className="mb-3">
                    <label for="inputFullName" class="form-label">Full Name</label>
                    <input type="text" placeholder="Full name" className="form-control" id="inputFullName" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="inputEmail" class="form-label">Email</label>
                    <input type="email" placeholder="Enter email" className="form-control" id="inputEmail" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="inputPhone" className="form-label">Phone</label>
                    <input type="number" placeholder="Enter phone" className="form-control" id="inputPhone" />
                </div>
                <div className="mb-3">
                    <label for="inputAddress" className="form-label">Address</label>
                    <input type="text" placeholder="Enter address" className="form-control" id="inputAddress" />
                </div>
                <div className="save-btn-container">
                    <button type="submit" className="btn btn-primary" style={{width:"100%"}}>Save</button>
                </div>

            </form>

            <Link to="/">
				<span className="">Back to contacts</span>
			</Link>

        </div>
	);
};

NewContact.propTypes = {
	match: PropTypes.object
};
