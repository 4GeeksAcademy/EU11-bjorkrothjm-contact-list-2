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

    const placeholderObject = {
        full_name : "Full name",
        email : "Enter email",
        phone : "Enter phone",
        address : "Enter address",
        id : "",
        agenda_slug : store.agendaSlug[0]
    }

    let headerValue = "Add a new contact"

    // Updating placeholderObject + headerValue depending on New or Existing (to be edited) contact 
    if (params.theid != 0){
        // headerValue 
        headerValue = "Edit contact"
        

        // placeholderObject
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
        // placeholderObject.full_name = contactData.full_name;
        // placeholderObject.email = contactData.email;
        // placeholderObject.phone = contactData.phone;
        // placeholderObject.address = contactData.address;
        // placeholderObject.contactStatus = params.theid;
        console.log(store.contacts[idIndex])

        placeholderObject.full_name = store.contacts[idIndex].full_name
        placeholderObject.email = store.contacts[idIndex].email
        placeholderObject.phone = store.contacts[idIndex].phone
        placeholderObject.address = store.contacts[idIndex].address
        placeholderObject.id = params.theid
        placeholderObject.agenda_slug = store.agendaSlug[0]
        
    }else{
        console.log(params.theid)
    }
    console.log("placeholderObject", placeholderObject)

    //const [data, setData] = useState({agenda_slug : store.agendaSlug[0]})
    
    // Setting up the data State depending on new or existing user
    const setUpDataState = () => {
        if (params.theid != 0){
            const [data, setData] = useState(placeholderObject)
            return[data, setData]
        }else{
            const [data, setData] = useState({agenda_slug : store.agendaSlug[0]})
            return[data, setData]
        }
    }
    const [data, setData] = setUpDataState()

    //const [data, setData] = useState(placeholderObject)
    // Setting the dataEdited to the placeholderObjects value to be able to edit the form and have it updated in real time 
    //const [dataEdited, setDataEdited] = useState(placeholderObject)

    const updateData = (e) => {
        setData({
            ...data,
            [e.target.id] : e.target.value
        })
        // setDataEdited({
        //     ...dataEdited,
        //     [e.target.id] : e.target.value
        // })


    }

    const submitForm = (e) => {
        //e.preventDefault() // prevents the page from reloading and emptying the form
        if (placeholderObject.id === ""){
            console.log("New contact data to be added: ", data)
            actions.addNewContact(data);
            console.log("Store data after sending", store)
            navigate("/")
        }else{
            console.log("Data to update with: ", data)
            actions.updateContact(data)
            console.log("Store data after updating", store)
            navigate("/")
        }

    }

    // const submitForm = (e) => {
    //     //e.preventDefault()
    //     console.log("Form data before sending", data)
    //     actions.addNewContact(data);
    //     console.log("Store data after sending", store)
    // }






	return (
        <div className="container mt-5">

            <h1 className="header-one">{headerValue}</h1>

            <form onSubmit={ (e) => submitForm(e)}>
                <div className="mb-3">
                    <label htmlFor="full_name" className="form-label">Full Name</label>
                    <input type="text" onChange={updateData} value={data.full_name} placeholder="Enter name" className="form-control" id="full_name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" onChange={updateData} value={data.email} placeholder="Enter email" className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="number" onChange={updateData} value={data.phone} placeholder="Enter phone number" className="form-control" id="phone" />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" onChange={updateData} value={data.address} placeholder="Enter address" className="form-control" id="address" />
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
