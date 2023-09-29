import React from 'react';
import { Link } from 'react-router-dom';

function MainHome() {
  return (
    <>
      <div>
        <nav>
          <div className="logo">
            <img src="/logo.png" alt="Logo" />
          </div>
          <ul>
            <li>
              <Link to="/adminlogin">Admin</Link>
            </li>
            <li>
              <Link to="/userlogin">User Login</Link>
            </li>
            <li>
              <Link to="/organizationlogin">Organization</Link>
            </li>
          </ul>
        </nav>
        <div className='mainphoto'>
    <img src="/main.jpg" alt="Logo" />
    </div>

      </div>

    </>


  );
}

export default MainHome;
