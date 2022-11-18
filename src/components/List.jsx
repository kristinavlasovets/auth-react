import React from 'react';
import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';

export const List = () => {
	const columns = [
		{
			field: 'id',
			headerName: 'ID',
			width: 50,
			headerAlign: 'center',
			align: 'center',
		},
		{
			field: 'name',
			headerName: 'Name',
			width: 100,
			headerAlign: 'center',
		},
		{
			field: 'email',
			headerName: 'Email',
			width: 170,
			headerAlign: 'center',
		},
		{
			field: 'regDate',
			headerName: 'Registration Date',
			width: 150,
			headerAlign: 'center',
			align: 'center',
		},
		{
			field: 'authDate',
			headerName: 'Authentication Date',
			width: 150,
			headerAlign: 'center',
			align: 'center',
		},
		{
			field: 'status',
			headerName: 'Status',
			width: 150,
			headerAlign: 'center',
			align: 'center',
		},
	];

	const rows = [
		{
			id: 1,
			name: 'Snow',
			email: 'Jon@gmail.com',
			regDate: 35,
			authDate: 2022,
			status: 'registered',
		},
		{
			id: 2,
			name: 'Lannister',
			email: 'Cersei@gmail.com',
			regDate: 42,
			authDate: 2022,
			status: 'registered',
		},
		{
			id: 3,
			name: 'Lannister',
			email: 'Jaime@gmail.com',
			regDate: 45,
			authDate: 2022,
			status: 'registered',
		},
		{
			id: 4,
			name: 'Stark',
			email: 'Arya@gmail.com',
			regDate: 16,
			authDate: 2022,
			status: 'registered',
		},
	];
	return (
		<Box sx={{m: '15vh auto', height: 400, width: 825}}>
			<DataGrid rows={rows} columns={columns} checkboxSelection />
		</Box>
	);
};
