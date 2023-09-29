import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserLogin() {
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = async (values) => {
    try {
      const res = await axios.post('http://localhost:3500/userlogin', {
        email: values.email,
        password: values.password,
      });

      if (res.data.success === true) {
        localStorage.setItem('loggedin', true);
        localStorage.setItem('token', res.data.token);
        navigate('/userhome');
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
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {

      console.error('Error during login:', error);
      toast.error('An error occurred during login.');
    }
  };

  return (
    <>

      <div className='frombody'>
        <h4>User Please Login</h4>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form>
            <div>
              <label htmlFor="email">✉️ Email : </label>
              <Field type="text" name="email" id="email" placeholder='Enter your email' />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="password">🔒 Password :  </label>
              <Field type="text" name="password" id="password" placeholder='Enter your password' />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div className='forget'><a href='userforget'>Forget Password ?</a>
            </div>
            <button type="submit">Login</button>
            <div className='loginbeforeregister'>
              Please Signup <a href='usersingup'>Signup!</a>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default UserLogin;