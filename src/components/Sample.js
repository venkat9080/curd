import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = "http://localhost:3001/products";

const Sample = () => {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newOldPrice, setNewOldPrice] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

 
  const addUser = async () => {
    const name = newName.trim();
    const price = newPrice.trim();
    const oldPrice = newOldPrice.trim();

    if (name && price && oldPrice) {
      const newUser = { name, price, oldPrice };
      try {
        const response = await axios.post(API_URL, newUser);
        setUsers([...users, response.data]);
        setNewName("");
        setNewPrice("");
        setNewOldPrice("");
        setShowAddModal(false);
      } catch (error) {
        console.error("Error adding product:", error);
      }
    } else {
      alert("Please fill all fields");
    }
  };

  const handleEditClick = (user) => {
    setCurrentUser({ ...user });
    setShowEditModal(true);
  };

  const updateUser = async () => {
    try {
      await axios.put(`${API_URL}/${currentUser.id}`, currentUser);
      setUsers(
        users.map((user) =>
          user.id === currentUser.id ? currentUser : user
        )
      );
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };


  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
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
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.price}</td>
              <td>{user.oldPrice}</td>
              <td>
                <Button variant="primary" className="me-2" onClick={() => handleEditClick(user)}>Edit</Button>
                <Button variant="danger" onClick={() => deleteUser(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button variant="outline-success" onClick={() => setShowAddModal(true)}>
        Add Product
      </Button>

      {/* Add Product Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Enter Product Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Enter Price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Enter Old Price"
              value={newOldPrice}
              onChange={(e) => setNewOldPrice(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={addUser}>
            Save Product
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentUser && (
            <>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Enter Product Name"
                  value={currentUser.name}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, name: e.target.value })
                  }
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Enter Price"
                  value={currentUser.price}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, price: e.target.value })
                  }
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Enter Old Price"
                  value={currentUser.oldPrice}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, oldPrice: e.target.value })
                  }
                />
              </InputGroup>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={updateUser}>
            Update Product
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Sample;
