import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


import "../../styles/new-contact.css";

export const NewContact = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({agenda_slug : store.agendaSlug[0]})

    const updateData = (e) => {
        setData({
            ...data,
            [e.target.id] : e.target.value
        })
    }

    const submitForm = (e, contactStatus) => {
        // e.preventDefault() // prevents the page from reloading and emptying the form
        console.log("Form data before sending", data)
        if (contactStatus === "new"){
            actions.addNewContact(data);
            console.log("Store data after sending", store)
        }else{
            //actions.updateContact(  )
            console.log("CHECKING THE DATA in new-contact State: ", data)
            navigate("/")
        }

    }

    console.log(params.theid)

    async function placeholderObjectFunction(){
        const outputObject = {
            fullName : "Full name",
            email : "Enter email",
            phone : "Enter phone",
            address : "Enter address",
            contactStatus : "new"
        }
        console.log(outputObject)

        if (params.theid != 0){
            console.log("Existing contact!")
            const contactData = await actions.getParticularContact(params.theid);
            console.log("contactData", contactData)
            outputObject.fullName = contactData.full_name;
            outputObject.email = contactData.email;
            outputObject.phone = contactData.phone;
            outputObject.address = contactData.address;
            outputObject.contactStatus = params.theid;
        }else{
            console.log(params.theid)
        }
        console.log(outputObject)
        return outputObject
    }

    // FIX
    const placeholderObject = placeholderObjectFunction().then( () => {console.log("2")})
    console.log("FINAL", placeholderObject);

	return (
        <div className="container mt-5">

            <h1 className="header-one">Add a new contact</h1>

            <form onSubmit={ (e) => submitForm(e, placeholderObject.contactStatus)}>
                <div className="mb-3">
                    <label for="full_name" className="form-label">Full Name</label>
                    <input type="text" onChange={updateData} placeholder={placeholderObject.fullName} className="form-control" id="full_name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" onChange={updateData} placeholder={placeholderObject.email} className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="phone" className="form-label">Phone</label>
                    <input type="number" onChange={updateData} placeholder={placeholderObject.phone} className="form-control" id="phone" />
                </div>
                <div className="mb-3">
                    <label for="address" className="form-label">Address</label>
                    <input type="text" onChange={updateData} placeholder={placeholderObject.address} className="form-control" id="address" />
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
