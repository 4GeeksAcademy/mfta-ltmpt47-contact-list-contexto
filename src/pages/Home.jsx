import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

import ContactCard from "../components/ContactCard.jsx";
import { useEffect } from "react";

const API_URL = "https://playground.4geeks.com/contact";
const user = "tester25";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch(`${API_URL}/agendas/${user}`);
        if (!response.ok) {
          if (response.status === 404) {
            const createUserResponse = await fetch(`${API_URL}/agendas/${user}`, {
              method: "POST",
            });
            if (!createUserResponse.ok) {
              throw new Error("Failed to create contact list");
            }
            console.log("User created successfully");
            return; // Exit early since there are no contacts yet
          } else {
            throw new Error("Failed to fetch contacts");
          }  
        }
        const data = await response.json();
        const action = { type: "SET_CONTACT_LIST", payload: data.contacts };
        dispatch(action);
      }
      catch (error) {
        console.error("Error fetching or creating user: ", error);
      }
    }

    fetchContacts();

  }, [dispatch]);


  return (
    <div>
      <h1 className="text-center my-4">Contact List</h1>
      <div className="d-flex flex-column align-items-center">
        {store.contactList.length > 0 &&
          store.contactList.map((contact, index) => (
            <ContactCard key={index} contact={contact} />
          ))}
      </div>
    </div>
  );
};
