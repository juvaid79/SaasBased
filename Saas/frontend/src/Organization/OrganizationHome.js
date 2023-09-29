import axios from 'axios';
import React, { useEffect, useState } from 'react';
import OrganizationNavbar from './OrganizationNavbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrganizationHome() {

  const [alluser, setAllUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);



  async function getalluser(page) {
    try {
      const res = await axios.get(`http://localhost:3500/getalluser?page=${page}`);
      console.log("get user", res.data.getalluser);
      setAllUser(res.data.getalluser);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getalluser(currentPage);
  }, [currentPage]);


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
      toast.success(res.data.message,{
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
  };


  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <OrganizationNavbar />
      <div>
        <table className="user-table">
          <thead>
            <tr>
              <th>👤 User Name</th>
              <th>✉️ Email</th>
              <th>👤 User Status</th>
              {/* <th>💳 Subscription</th>
              <th>💲 Subscription Price</th> */}
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
                {/* <td>{item.subscriptionId?.name}</td>
                <td>{item.subscriptionId?.price}</td> */}
              </tr>
            ))}
          </tbody>
        </table>

        {/* pagination */}
        <div className="pagination">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={index + 1 === currentPage ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
        {/* pagination end */}

      </div>
    </>
  );
}

export default OrganizationHome;
