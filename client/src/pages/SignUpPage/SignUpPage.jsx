import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import axios from 'axios'

import './SignUpPage.css'
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const SignUpPage = () => {

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },

        validationSchema: validationSchema,
        onSubmit: async (data) => {
            await axios.post("http://localhost:5047/auth/signup", data)
                .then((res) => {
                    navigate("/login");
                }).catch(error => alert(error.response.data.message))
        },
    });
    return (
        <div className='sign-up'>
            <form onSubmit={formik.handleSubmit} >
                <h2 className='sign-up-title'>Sign Up</h2>
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
                    Sign Up
                </Button>
            </form>

        </div>
    )
}

export default SignUpPage