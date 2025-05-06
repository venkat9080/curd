import React, { useState } from "react";
import { Modal, InputGroup, FormControl, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

// Component for each row
const UserRow = ({ user, updateUser, deleteUser }) => {
  const [editedName, setEditedName] = useState(user.name);
  const [editedPhone, setEditedPhone] = useState(user.phone);
  const [editedEmail, setEditedEmail] = useState(user.email);

  return (
    <tr>
      <td>{user.id}</td>
      <td>
        <FormControl value={editedName} onChange={(e) => setEditedName(e.target.value)} />
      </td>
      <td>
        <FormControl value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} />
      </td>
      <td>
        <FormControl value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
      </td>
      <td>
        <Button
          variant="primary"
          className="me-2"
          onClick={() =>
            updateUser(user.id, {
              name: editedName,
              phone: editedPhone,
              email: editedEmail,
            })
          }
        >
          Update
        </Button>
        <Button variant="danger" onClick={() => deleteUser(user.id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

function Sample() {
  const [users, setUsers] = useState([]);
  const [newName, setName] = useState("");
  const [newPhone, setPhone] = useState("");
  const [newEmail, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // Add User
  const addUser = () => {
    const name = newName.trim();
    const phone = newPhone.trim();
    const email = newEmail.trim();

    if (name && phone && email) {
      const newUser = {
        id: users.length + 1,
        name,
        phone,
        email,
      };
      setUsers([...users, newUser]);
      setName("");
      setPhone("");
      setEmail("");
      handleClose();
    } else {
      alert("Please fill all fields");
    }
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const updateUser = (id, updatedUser) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user)));
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Product List</h3>
      <table className="table table-bordered" style={{ border: "2px solid black", width: "100%" }}>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Old Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              updateUser={updateUser}
              deleteUser={deleteUser}
            />
          ))}
        </tbody>
      </table>

      <Button variant="outline-success" onClick={handleShow}>
        Add List
      </Button>

      {/* Modal Form */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Enter Product Name"
              value={newName}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Enter Price"
              value={newPhone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Enter Old Price"
              value={newEmail}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={addUser}>
            Save Product
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Sample;
