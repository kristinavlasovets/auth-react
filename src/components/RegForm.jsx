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
	const clearRegForm = () => {
		setUsername('');
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
				onChange={(e) => setUsername(e.target.value)}
				value={username}
				type="text"
				label="Username"
				variant="standard"
				color="action"
			/>
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
			{error &&
				error.errors?.map((item, i) => (
					<Alert key={i} sx={{mt: '20px'}} severity="info">
						{item.msg}
					</Alert>
				))}
			<Button
				onClick={() => {
					postUsers();
					clearRegForm();
				}}
				sx={{
					width: '110px',
					margin: '30px auto',
					backgroundColor: '#5769B1',
					color: '#EFF67C',
					fontSize: '18px',
					':hover': {
						bgcolor: 'gray',
						color: 'white',
						borderColor: 'white',
					},
				}}
				variant="contained"
			>
				Enlist
			</Button>
		</Box>
	);
};
