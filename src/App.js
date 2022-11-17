import {React, useState} from 'react';
import {TextField, Button, Box, Divider} from '@mui/material';

export const App = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const postUsers = async () => {
		const response = await fetch('http://localhost:5000/auth/registration', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({username, email, password}),
		});
		const result = await response.json();
		console.log(result);
		return result;
	};

	return (
		<Box
			sx={{
				margin: '15vh auto',
				width: '350px',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
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
				<Button
					onClick={postUsers}
					sx={{width: '150px', margin: '30px auto'}}
					variant="contained"
				>
					Enlist
				</Button>
			</Box>
			<Divider>OR</Divider>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '350px',
				}}
			>
				<TextField id="standard-basic" label="Email" variant="standard" />
				<TextField id="standard-basic" label="Password" variant="standard" />
				<Button sx={{width: '150px', margin: '30px auto'}} variant="contained">
					Sign in
				</Button>
			</Box>
		</Box>
	);
};
