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
    const [dataEdited, setDataEdited] = useState(placeholderObject)

    const updateData = (e) => {
        setData({
            ...data,
            [e.target.id] : e.target.value
        })
    }

    const submitForm = (e) => {
        e.preventDefault() // prevents the page from reloading and emptying the form
        console.log("Form data before sending", data)
        if (placeholderObject.id === 0){
            actions.addNewContact(data);
            console.log("Store data after sending", store)
        }else{
            console.log("Data to update with: ", dataEdited)
            //actions.updateContact(placeholderObject)
            navigate("/")
        }

    }

    // const submitForm = (e) => {
    //     //e.preventDefault()
    //     console.log("Form data before sending", data)
    //     actions.addNewContact(data);
    //     console.log("Store data after sending", store)
    // }
    
    const placeholderObject = {
        fullName : "Full name",
        email : "Enter email",
        phone : "Enter phone",
        address : "Enter address",
        id : 0,
    }


    if (params.theid != 0){
        let idIndex = 0
        for (let i = 0; i<store.contacts.length; i++){
            if (store.contacts[i].id === params.theid){
                idIndex = i;
            }
        }
        console.log("idIndex", idIndex)

        // MORE ELEGANT SOLUTION USING API - BUT CANNOT GET AWAIT TO FUNCITON
        // const contactData = actions.getParticularContact(params.theid);
        //console.log("contactData", contactData)
        // placeholderObject.fullName = contactData.full_name;
        // placeholderObject.email = contactData.email;
        // placeholderObject.phone = contactData.phone;
        // placeholderObject.address = contactData.address;
        // placeholderObject.contactStatus = params.theid;
        console.log(store.contacts[idIndex])

        placeholderObject.fullName = store.contacts[idIndex].full_name
        placeholderObject.email = store.contacts[idIndex].email
        placeholderObject.phone = store.contacts[idIndex].phone
        placeholderObject.address = store.contacts[idIndex].address
        placeholderObject.id = params.theid
        
    }else{
        console.log(params.theid)
    }
    console.log("placeholderObject", placeholderObject)


	return (
        <div className="container mt-5">

            <h1 className="header-one">Add a new contact</h1>

            <form onSubmit={ (e) => submitForm(e)}>
                <div className="mb-3">
                    <label htmlFor="full_name" className="form-label">Full Name</label>
                    <input type="text" onChange={updateData} placeholder={placeholderObject.fullName} className="form-control" id="full_name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" onChange={updateData} placeholder={placeholderObject.email} className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="number" onChange={updateData} placeholder={placeholderObject.phone} className="form-control" id="phone" />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
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
