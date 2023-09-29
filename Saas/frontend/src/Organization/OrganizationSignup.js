import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrganizationSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');
  const [subscriptions, setSubscriptions] = useState([]);
  const navigate = useNavigate();


  async function getSubscription() {
    try {
      const res = await axios.get('http://localhost:3500/getsubscription');
      setSubscriptions(res.data.GetSubscription);
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    getSubscription();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3500/singuporganization', {
        name,
        email,
        password,
        subscriptionId,
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
        navigate('/organizationlogin');
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      toast.error('Error while submitting the form.');
    }
  };

  return (
    <div>
      <div className='frombody'>
        <h4>Organization Signup</h4>
        <form onSubmit={handleSubmit}>
          <div className='text'>
            <label htmlFor='name'>👥Organization Name : </label>
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
            <label htmlFor='email'> ✉️ Email : </label>
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
            <label htmlFor='password'>🔒 Password : </label>
            <input
              type='text'
              name='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
            />
          </div>
          <div>
            <select
              name='subscriptionId'
              value={subscriptionId}
              onChange={(e) => setSubscriptionId(e.target.value)}
            >
              <option value='' disabled>Select a subscription</option>
              {subscriptions.length > 0 &&
                subscriptions.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <button type='submit'>Organization-Signup</button>
          <div className='already-reg'>
            Have You Already Registered <a href='organizationlogin'>Login!</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrganizationSignup;
