import {React, useState} from 'react';
import {TextField, Button, Box} from '@mui/material';

export const AuthForm = ({setIsAuth}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signUsers = async () => {
		const response = await fetch('http://localhost:5000/auth/authentication', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({email, password}),
		});
		const result = await response.json();
		setIsAuth(result);
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
				label="Password"
				variant="standard"
			/>
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
