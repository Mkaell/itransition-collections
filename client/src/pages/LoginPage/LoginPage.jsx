import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { StyledTextField } from './style';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../api';
import { useDispatch } from 'react-redux';
import { actionLogIn } from '../../store/actionCreators/auth';
import { useIntl } from 'react-intl';

const validationSchema = yup.object({
	email: yup.string()
		.required('Email is required'),
	password: yup.string()
		.required('Password is required'),
});

const LoginPage = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { messages } = useIntl();

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
		<Box sx={{
			width: { xs: '75%', sm: '50%', md: '35%' },
			margin: '0',
			position: 'absolute',
			top: '50%',
			left: '50%',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		}}>
			<form onSubmit={formik.handleSubmit} >
				<Typography variant='h4' mb={3}>{messages['login.login']}</Typography>
				<StyledTextField
					style={{ marginBottom: '30px' }}
					fullWidth
					id="email-login"
					name="email"
					label={messages['form.login-label-email']}
					value={formik.values.email}
					onChange={formik.handleChange}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
				/>
				<StyledTextField
					fullWidth
					style={{ marginBottom: '30px' }}
					id="password-login"
					name="password"
					label={messages['form.login-label-password']}
					type="password"
					value={formik.values.password}
					onChange={formik.handleChange}
					error={formik.touched.password && Boolean(formik.errors.password)}
					helperText={formik.touched.password && formik.errors.password}
				/>
				<Button size="large" color="primary" variant="contained" fullWidth type="submit">
					{messages['login.login']}
				</Button>
			</form>

		</Box>
	)
}

export default LoginPage