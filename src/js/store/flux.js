const getState = ({ getStore, getActions, setStore }) => {

	const baseUrl = "https://assets.breatheco.de/apis/fake/contact/"

	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			agendaSlug: [
				"joshi_secret_agenda_2023"
			],
			contacts: [
				{
					full_name : "Dave Bradley",
					email : "dave@gmail.com",
					agenda_slug : "my_super_agenda",
					address :"47568 NW 34ST, 33434 FL, USA",
					phone :"7864445566"
				},
				{
					full_name : "Dave Bradley",
					email : "dave@gmail.com",
					agenda_slug : "my_super_agenda",
					address :"47568 NW 34ST, 33434 FL, USA",
					phone :"7864445566"
				}
			]
		},
		actions: {

			getContacts: async () => {
				const store = getStore();
				const getContactsUrl = baseUrl+"/agenda/"+store.agendaSlug[0] // UPDATE
				
				try{
					const response = await fetch(getContactsUrl);
					if (!response.ok){
						console.log(response.ok)
					}else{
						const agendaData = await response.json();
						console.log(agendaData)
						setStore({...store, contacts: agendaData });
					}
				}catch(error){
					console.log(error);
				}

			},

			addNewContact: async (contactData) => {
				const store = getStore();

				try{
					const response = await fetch(baseUrl, {
						method: "POST",
                    	body: JSON.stringify(contactData), // convert data to a string to send it over HTTP !!! initalize contactData
                    	headers: {
                        	"Content-Type": "application/json"
                        }
					})
					if (!response.ok){
						console.log(response.ok)
					}else{
						const jsonData = await response.json();
						console.log("jsonData: ", jsonData)
						const newContactsArray = [...store.contacts, jsonData ]
						setStore({...store, contacts: newContactsArray});
					}

				}catch(error){
					console.log(error);
				}				
			},

			deleteContact: (event) => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
				console.log(event.key)
			},

			updateContact: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},



			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
