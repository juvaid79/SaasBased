import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserSingup() {
  const token = localStorage.getItem("token");
  const decodeToken = jwt_decode(token);
  const organizationid = decodeToken.token._id
  const subscriptionId = decodeToken.token.subscriptionId


  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post('http://localhost:3500/usersingup', {
        name,
        email,
        password,
        organizationId: organizationid,
        subscriptionId:subscriptionId
      });

      if (res) {
        toast.success(res.data.msg,{
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
        navigate('/organizationhome');
      } else {
        toast.error(res.data.msg);
      }
      console.log("response from",res)
    } catch (error) {
      toast.error('Error while submitting the form.');
    }
  };

  return (
    <div>
      <div className='frombody'>
        <h4>User-Signup</h4>
        <form onSubmit={handleSubmit}>
          <div className='text'>
            <label htmlFor='name'> UserName : </label>
            <input
              type='text'
              name='name'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter your Name'
            />
          </div>
          <div className='text'>
            <label htmlFor='email'> ✉️ Email :  </label>
            <input
              type='text'
              name='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
            />
          </div>
          <div>
            <label htmlFor='password'>🔒 Password :  </label>
            <input
              type='text'
              name='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
            />
          </div>
          <button type='submit'>User-Signup</button>
          <div className='already-reg'>
            Have You Already Registered <a href='userlogin'>User-Login!</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserSingup;
