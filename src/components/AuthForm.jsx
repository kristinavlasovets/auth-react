import {React, useState} from 'react';
import {TextField, Button, Box, Alert} from '@mui/material';

export const AuthForm = ({setIsAuth}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');

	const signUsers = async () => {
		const response = await fetch('http://localhost:5000/auth/authentication', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({email, password}),
		});
		const result = await response.json();
		if (result.token) {
			setIsAuth((prev) => (prev = true));
			localStorage.setItem('token', result.token);
		}
		localStorage.setItem('id', result.id);
		setMessage(result.message);
	};
	const clearRegForm = () => {
		setEmail('');
		setPassword('');
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '350px',
			}}
		>
			<TextField
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				type="email"
				label="Email"
				variant="standard"
				color="action"
			/>
			<TextField
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				type="password"
				label="Password"
				variant="standard"
				color="action"
			/>
			{message && <Alert sx={{mt: '20px'}}>{message}</Alert>}
			<Button
				onClick={() => {
					signUsers();
					clearRegForm();
				}}
				sx={{
					width: '115px',
					margin: '30px auto',
					backgroundColor: '#EFF67C',
					color: '#5769B1',
					fontSize: '18px',
					':hover': {
						bgcolor: 'gray',
						color: 'white',
						borderColor: 'white',
					},
				}}
				variant="contained"
			>
				Sign in
			</Button>
		</Box>
	);
};
