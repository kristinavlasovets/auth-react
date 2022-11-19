import {React, useState, useEffect} from 'react';
import {Box, Button, Checkbox} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonOffIcon from '@mui/icons-material/PersonOff';

export const List = ({setIsAuth}) => {
	const [list, setList] = useState([]);
	const [arrIds, setArrIds] = useState([]);

	const logOut = () => {
		setIsAuth();
		localStorage.removeItem('token');
	};

	const getData = async () => {
		const response = await fetch('http://localhost:5000/auth/users');
		const result = await response.json();
		return result;
	};

	const deleteUser = async (id) => {
		const response = await fetch(`http://localhost:5000/auth/users/${id}`, {
			method: 'DELETE',
		});
		const result = await response.json();
		return result;
	};

	const handleDeleteAll = () => {
		arrIds.forEach((id) => deleteUser(id));
	};

	useEffect(() => {
		const getList = async () => {
			const data = await getData();
			setList(data);
		};
		getList();
		setList(getData);
	}, []);

	const columns = [
		{
			field: '_id',
			headerName: 'ID',
			width: 50,
			headerAlign: 'center',
			align: 'center',
		},
		{
			field: 'username',
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
	return (
		<Box sx={{m: '15vh auto', height: 400, width: 825}}>
			<Box
				sx={{
					mb: '20px',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					height: 50,
					width: 250,
				}}
			>
				<Button
					sx={{
						padding: '10px 20px 10px',
						color: 'pink',
						fontSize: '18px',
						borderColor: 'pink',
						':hover': {
							bgcolor: 'gray',
							color: 'white',
							borderColor: 'white',
						},
					}}
					variant="outlined"
					size="large"
					startIcon={<PersonRemoveIcon color="action" />}
				>
					Block
				</Button>
				<PersonAddAlt1Icon sx={{color: 'pink'}} fontSize="large" />
				<PersonOffIcon
					onClick={handleDeleteAll}
					color="action"
					fontSize="large"
				/>
			</Box>
			<DataGrid
				getRowId={(row) => row._id}
				pageSize={5}
				rowsPerPageOptions={[5, 10, 20, 50]}
				rows={list}
				columns={columns}
				checkboxSelection
				disableSelectionOnClick
				onSelectionModelChange={(ids) => {
					setArrIds(ids);
				}}
			/>
			<Button
				onClick={logOut}
				sx={{
					m: '5vh auto',
					color: 'pink',
					fontSize: '18px',
					borderColor: 'pink',
					':hover': {
						bgcolor: 'gray',
						color: 'white',
						borderColor: 'white',
					},
				}}
				variant="outlined"
			>
				Log out
			</Button>
		</Box>
	);
};
