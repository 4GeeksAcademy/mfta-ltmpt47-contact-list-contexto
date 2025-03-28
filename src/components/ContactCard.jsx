import { Link } from "react-router-dom";
import avatar from "../assets/img/avatar.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer";

const API_URL = "https://playground.4geeks.com/contact";
const user = "tester25";

function ContactCard({ contact }) {
  const { dispatch } = useGlobalReducer();

  function handleDelete(id) {
    deleteContact(id);
  }

  function deleteContact(id) {
    fetch(`${API_URL}/agendas/${user}/contacts/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          alert("Failed to delete contact");
          throw new Error("Failed to delete contact");
        }
        return;
      })
      .then(() => {
        dispatch({ type: "DELETE_CONTACT", payload: id });
      })
      .catch((error) => console.error("Error deleting contact: ", error));
  }

  return (
    <div
      className="card mb-3 px-3 py-2 shadow-sm rounded-3"
      style={{ width: "min(540px, 90vw)" }}
    >
      <div className="row g-0 d-flex align-items-center">
        <div className="col-md-3">
          <img
            src={avatar}
            className="img-fluid rounded-circle"
            alt="avatar image"
          />
        </div>

        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title fw-semibold">{contact.name}</h5>
            <p className="card-text mb-1">
              <span>
                <i className="fa-solid fa-envelope"></i>
              </span>
              {" " + contact.email}
            </p>
            <p className="card-text mb-1">
              <span>
                <i className="fa-solid fa-phone"></i>
              </span>
              {" " + contact.phone}
            </p>
            <p className="card-text mb-1">
              <span>
                <i className="fa-solid fa-location-dot"></i>
              </span>
              {" " + contact.address}
            </p>
          </div>
        </div>

        <div className="col-md-2">
          <div className="d-flex justify-content-around">
            <Link className="btn btn-primary" to={`/update/${contact.id}`}>
              <i className="fa-solid fa-pen-to-square"></i>
            </Link>

            <button
              type="button"
              className="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>

            {/* Modal */}
            <div
              className="modal fade"
              id="deleteModal"
              tabIndex="-1"
              aria-labelledby="deleteModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to delete this contact?</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(contact.id)}
                      data-bs-dismiss="modal"
                    >
                      Delete Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;
