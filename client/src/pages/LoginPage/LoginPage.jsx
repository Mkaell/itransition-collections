import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import './LoginPage.css'
import { Button, TextField } from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  email: yup.string()
    .required('Email is required'),
  password: yup.string()
    .required('Password is required'),
});

const LoginPage = () => {

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: validationSchema,
    onSubmit: async (value) => {
      try {

        const { data } = await axios.post("http://localhost:5047/auth/login", value)

        localStorage.setItem(
          "userData",
          JSON.stringify({ token: data.token, userId: data.result._id, isRole: data.result.role, isActive: data.result.active })

        )
        navigate("/");
      } catch (error) {
        alert(error.response.data.message)
      }

    },
  });

  return (
    <div className='login'>
      <form onSubmit={formik.handleSubmit} >
        <h2 className='login-title'>Log in</h2>
        <TextField
          style={{ marginBottom: '30px' }}
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          style={{ marginBottom: '30px' }}
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button size="large" color="primary" variant="contained" fullWidth type="submit">
          Log in
        </Button>
      </form>

    </div>
  )
}

export default LoginPage