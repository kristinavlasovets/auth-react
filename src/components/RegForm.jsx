import {React, useState} from 'react';
import {TextField, Button, Box, Alert} from '@mui/material';

export const RegForm = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState({});
	const [message, setMessage] = useState('');

	const postUsers = async () => {
		const response = await fetch('http://localhost:5000/auth/registration', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({username, email, password}),
		});
		const result = await response.json();
		setMessage(result.message);
		if (result.ok) {
			return result;
		} else {
			setError(result.errors);
			return result.errors;
		}
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
				onChange={(e) => setUsername(e.target.value)}
				type="text"
				label="Username"
				variant="standard"
			/>
			<TextField
				type="email"
				onChange={(e) => setEmail(e.target.value)}
				label="Email"
				variant="standard"
			/>
			<TextField
				type="password"
				onChange={(e) => setPassword(e.target.value)}
				label="Password"
				variant="standard"
			/>
			{message && <Alert sx={{mt: '20px'}}>{message}</Alert>}
			{error &&
				error.errors?.map((item, i) => (
					<Alert key={i} sx={{mt: '20px'}} severity="info">
						{item.msg}
					</Alert>
				))}
			<Button
				onClick={postUsers}
				sx={{width: '150px', margin: '30px auto', backgroundColor: '#12243F'}}
				variant="contained"
			>
				Enlist
			</Button>
		</Box>
	);
};
