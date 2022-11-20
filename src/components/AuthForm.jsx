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

		setMessage(result.message);
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
				label="Email"
				variant="standard"
			/>
			<TextField
				onChange={(e) => setPassword(e.target.value)}
				type="password"
				label="Password"
				variant="standard"
			/>
			{message && <Alert sx={{mt: '20px'}}>{message}</Alert>}
			<Button
				onClick={signUsers}
				sx={{width: '150px', margin: '30px auto'}}
				variant="contained"
			>
				Sign in
			</Button>
		</Box>
	);
};
