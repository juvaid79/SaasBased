import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function ForgetPass() {
  const navigate = useNavigate();
  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post('http://localhost:3500/forgetpassword', values);
      toast.success('Password reset email sent successfully check your mailbox',{
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
      resetForm();
      navigate('/userlogin');
    } catch (error) {
      toast.error('Email does not exits use use another Email or singup');
    }
    setSubmitting(false);
  };


  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <div className='frombody'>
        <h4>Forget Password ! </h4>
        <Form>
          <div>
            <label htmlFor="email">Email:</label>
            <Field type="text" id="email" name="email" Placeholder="Enter Your Email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <button type="submit">Reset Password</button>
        </Form>
      </div>
    </Formik>
  );
}

export default ForgetPass

















