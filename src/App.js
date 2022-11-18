import {React, useState} from 'react';
import {Box, Divider} from '@mui/material';
import {RegForm} from './components/RegForm';
import {AuthForm} from './components/AuthForm';
import {List} from './components/List';

export const App = () => {
	const [isAuth, setIsAuth] = useState({});

	return isAuth ? (
		<List />
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
			<Divider sx={{color: 'gray'}}> or </Divider>
			<AuthForm setIsAuth={setIsAuth} />
		</Box>
	);
};
