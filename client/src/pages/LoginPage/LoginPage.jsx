import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import './LoginPage.css'
import { Button, TextField } from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../api';
import { useDispatch } from 'react-redux';
import { actionLogIn } from '../../store/actionCreators/auth';

const validationSchema = yup.object({
	email: yup.string()
		.required('Email is required'),
	password: yup.string()
		.required('Password is required'),
});

const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate()

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},

		validationSchema: validationSchema,
		onSubmit: async (values) => {
			dispatch(actionLogIn(values, navigate));
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