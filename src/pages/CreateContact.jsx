import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://playground.4geeks.com/contact";
const user = "tester25"


function CreateContact() {
    const navigate = useNavigate();
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    addContact(newContact);
  }

  function handleChange(event) {
    setNewContact({ ...newContact, [event.target.name]: event.target.value });
  }

  function addContact(contact) {
    fetch(`${API_URL}/agendas/${user}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add contact");
        }
        return response.json();
      })
      .then((data) => {
        navigate("/");
      })
      .catch((error) => console.error("Error adding contact: ", error));
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Create Contact</h1>
      <form
        onSubmit={handleSubmit}
        style={{ width: "min(540px, 90vw)", margin: "auto" }}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={newContact.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={newContact.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            value={newContact.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            value={newContact.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Contact
        </button>
      </form>
    </div>
  );
}

export default CreateContact;
