import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
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
      const res = await axios.post('http://localhost:3500/adminlogin', {
        email: values.email,
        password: values.password,
      });


      if (res.data.success === true) {
        localStorage.setItem('loggedin', true);
        localStorage.setItem('token', res.data.token);
        navigate('/adminhome');
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
      toast.error('An error occurred during login.');
    }
  };


  return (
    <div className='frombody'>
      <h4>Admin Please Login</h4>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div>
            <label htmlFor="email"> ✉️ Email : </label>
            <Field type="text" name="email" id="email" placeholder='Enter your email' />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="password"> 🔒 Password : </label>
            <Field type="text" name="password" id="password" placeholder='Enter your password' />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <button type="submit">Login</button>
          <div className='loginbeforeregister'>
            Please Signup <a href='adminsingup'>Signup!</a>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;

















































































