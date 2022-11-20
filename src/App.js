import {React, useEffect, useState} from 'react';
import {Box, Divider} from '@mui/material';
import {RegForm} from './components/RegForm';
import {AuthForm} from './components/AuthForm';
import {List} from './components/List';

export const App = () => {
	const [isAuth, setIsAuth] = useState(false);

	const handleAuth = () => {
		setIsAuth((prev) => !prev);
	};

	useEffect(() => {
		if (localStorage.getItem('token')) {
			setIsAuth(true);
		} else {
			setIsAuth(false);
		}
	}, []);

	return isAuth ? (
		<List setIsAuth={handleAuth} />
	) : (
		<Box
			sx={{
				m: '15vh auto',
				width: '350px',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<RegForm />
			<Divider sx={{color: 'gray'}}>Already have an account?</Divider>
			<AuthForm setIsAuth={handleAuth} />
		</Box>
	);
};
