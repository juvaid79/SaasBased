import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

function AdminHome() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [subscriptions, setSubscriptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [subscriptionsPerPage] = useState(2);
  const [alluser, setAllUser] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, price };
    try {
      const response = await axios.post('http://localhost:3500/addsubscription', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        toast.success('Subscription Added Successfully', {
          style: {
            background: 'lightblue',
            color: 'white',
          },
          progressStyle: {
            background: 'white',
          },
          icon: '🎉',
          iconTheme: {
            primary: 'white',
          },
        });
        GetSubScription();
        setName('')
        setPrice('')
      } else {
        toast.error('Internal Server Error');
      }
    } catch (error) {
      toast.error('Network Error:', error);
    }
  }
  //subscription start
  async function GetSubScription() {
    try {
      const response = await axios.get('http://localhost:3500/getsubscription');
      if (response.status === 200) {
        setSubscriptions(response.data.GetSubscription);
      } else {
        toast.error('Failed to fetch subscriptions');
      }
    } catch (error) {
      toast.error('Network Error:', error);
    }
  }

  useEffect(() => {
    GetSubScription();
  }, []);

  //subscription end 

  //delete start
  const deleteSub = async (item) => {
    try {
      const response = await axios.delete(`http://localhost:3500/deletesubscription/${item}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success('Subscription Deleted Successfully', {
          style: {
            background: 'lightblue',
            color: 'white',
          },
          progressStyle: {
            background: 'white',
          },
          icon: '🎉',
          iconTheme: {
            primary: 'white',
          },
        });
        const updatedSubscriptions = subscriptions.filter(sub => sub !== item);
        setSubscriptions(updatedSubscriptions);
        GetSubScription();

      } else {
        toast.error('Internal Server Error');
      }
    } catch (error) {
      toast.error('Network Error:', error);
    }
  }

  //delete end

  //getalluse start
  async function getalluser() {
    try {
      const res = await axios.get('http://localhost:3500/getalluser');
      setAllUser(res.data.getalluser);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getalluser();
  }, []);
  //getalluser end 

  //updatestatus start
  const toggleUserStatus = async (_id, isActive) => {
    try {
      const res = await axios.patch(`http://localhost:3500/updatestatus/${_id}`, { isActive });
      setAllUser((prevUsers) =>
        prevUsers.map((user) => {
          if (user._id === _id) {
            return { ...user, isActive };
          }
          return user;
        })
      );
      toast.success(res.data.message, {
        style: {
          background: 'lightblue',
          color: 'white',
        },
        progressStyle: {
          background: 'white',
        },
        icon: '🎉',
        iconTheme: {
          primary: 'white',
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
  //getstatus end 

  // Calculate the indexes for the current page's subscriptions
  const indexOfLastSubscription = currentPage * subscriptionsPerPage;
  const indexOfFirstSubscription = indexOfLastSubscription - subscriptionsPerPage;
  const currentSubscriptions = subscriptions.slice(indexOfFirstSubscription, indexOfLastSubscription);

  // Function to handle pagination page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  // Generate page buttons
  const pageButtons = [];
  for (let i = 1; i <= Math.ceil(subscriptions.length / subscriptionsPerPage); i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => paginate(i)}
        className={i === currentPage ? 'active' : ''}
      >
        {i}
      </button>
    );
  }

  const handleEditSubmit = async () => {
    try {
      const response = await axios.patch(`http://localhost:3500/updatesubscription/${selectedSubscription._id}`, {
        price: price,
        name: name,
      });
      console.log("response", response)
      if (response.data.success) {
        toast.success('Subscription Updated Successfully', {
          style: {
            background: 'lightblue',
            color: 'white',
          },
          progressStyle: {
            background: 'white',
          },
          icon: '🎉',
          iconTheme: {
            primary: 'white',
          },
        });
        closeEditModal();
        GetSubScription();
        setName('');
        setPrice('');
      } else {
        toast.error('Update Failed');
      }
    } catch (error) {
      toast.error('Network Error:', error);
    }
  };

  //open edit model

  const openEditModal = (subscription) => {
    setSelectedSubscription(subscription);
    setIsEditModalOpen(true);
    setName(subscription.name); // Populate the name input
    setPrice(subscription.price); // Populate the price input
  };

  const closeEditModal = () => {
    setSelectedSubscription(null);
    setIsEditModalOpen(false);
    setName(''); // Clear the name input
    setPrice(''); // Clear the price input
  };

  // close edit model 
  return (
    <>
      <div>
        <AdminNavbar />
        <h2>Add Subscription</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Subscription Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                placeholder="Enter Subscription Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <button type="submit">Add Subscription</button>
          </form>
        </div>
        <div>
          <div>
            <h4>* These Subscriptions Available for Users *</h4>
            <table className="user-table">
              <thead>
                <tr>
                  <th>⭐ Subscription Name</th>
                  <th>💲 Price</th>
                  <th>💾 Update</th>
                  <th>🗑️ Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentSubscriptions.length > 0 && currentSubscriptions.map(function (item) {
                  return (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>
                        <button onClick={() => openEditModal(item)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </td>
                      <td><button onClick={() => deleteSub(item._id)}><FontAwesomeIcon icon={faTrash} /></button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Edit Subscription Modal */}
          <Modal
            isOpen={isEditModalOpen}
            onRequestClose={closeEditModal}
            contentLabel="Edit Subscription"
            ariaHideApp={false} // This line is needed to prevent a11y warnings
          >
            <div className="modal-content">
              <h2>Edit Subscription</h2>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Subscription Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                placeholder="Enter Subscription Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <button onClick={handleEditSubmit}>Save</button>
              <button onClick={closeEditModal}>Cancel</button>
            </div>
          </Modal>

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {pageButtons}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastSubscription >= subscriptions.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Registered user */}
      <h4>Registered user's</h4>
      <div>
        <table className="user-table">
          <thead>
            <tr>
              <th>👤 User Name</th>
              <th>✉️ Email</th>
              <th>👤 User Status</th>
            </tr>
          </thead>
          <tbody>
            {alluser.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <select
                    value={item.isActive ? 'Active' : 'Inactive'}
                    onChange={(e) => {
                      const isActive = e.target.value === 'Active';
                      toggleUserStatus(item._id, isActive);
                    }}
                    className={item.isActive ? 'active' : 'inactive'}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
      {/* end Registered user */}
    </>
  );
}

export default AdminHome;
