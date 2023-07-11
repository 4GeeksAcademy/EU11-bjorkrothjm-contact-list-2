import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/new-contact.css";

export const NewContact = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

    const [data, setData] = useState({agenda_slug : store.agendaSlug[0]})

    const updateData = (e) => {
        setData({
            ...data,
            [e.target.id] : e.target.value
        })
    }

    const submitForm = (e) => {
        e.preventDefault()
        console.log("Form data before sending", data)
        actions.addNewContact(data);
        console.log("Store data after sending", store)
    }

	return (
        <div className="container">

            <h1 className="header-one">Add a new contact</h1>

            <form onSubmit={submitForm}>
                <div className="mb-3">
                    <label for="full_name" className="form-label">Full Name</label>
                    <input type="text" onChange={updateData} placeholder="Full name" className="form-control" id="full_name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" onChange={updateData} placeholder="Enter email" className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="phone" className="form-label">Phone</label>
                    <input type="number" onChange={updateData} placeholder="Enter phone" className="form-control" id="phone" />
                </div>
                <div className="mb-3">
                    <label for="address" className="form-label">Address</label>
                    <input type="text" onChange={updateData} placeholder="Enter address" className="form-control" id="address" />
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
