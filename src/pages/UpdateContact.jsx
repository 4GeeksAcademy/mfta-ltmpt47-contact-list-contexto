import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://playground.4geeks.com/contact";
const user = "tester25";

const UpdateContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { store } = useGlobalReducer();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    // Cargar los datos del contacto al montar el componente
    const contactToUpdate = store.contactList.find(
      (contact) => contact.id === Number(id)
    );
    if (contactToUpdate) {
      setContact(contactToUpdate);
    } else {
      alert("Contacto no encontrado");
      navigate("/");
    }
  }, [id, store.contactList, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateContact(contact);
  }

  function updateContact(contact) {
    fetch(`${API_URL}/agendas/${user}/contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update contact");
        }
        return response.json();
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error("Error updating contact: ", error));
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Actualizar Contacto</h2>
      <form 
        onSubmit={handleSubmit} 
        className="needs-validation" 
        noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={contact.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo Electrónico:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={contact.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Teléfono:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="form-control"
            value={contact.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Dirección:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            value={contact.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default UpdateContact;
