import {React, useState, useEffect} from 'react';
import {Box, Button} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonOffIcon from '@mui/icons-material/PersonOff';

export const List = ({setIsAuth}) => {
	const [list, setList] = useState([]);
	const [arrIds, setArrIds] = useState([]);

	const authUserId = localStorage.getItem('id');

	const logOut = () => {
		setIsAuth();
		localStorage.removeItem('token');
		localStorage.removeItem('id');
	};

	const getData = async () => {
		const response = await fetch('http://localhost:5000/auth/users');
		const result = await response.json();
		return result;
	};

	const deleteUser = async (id) => {
		if (authUserId === id) {
			logOut();
		}
		const response = await fetch(`http://localhost:5000/auth/users/${id}`, {
			method: 'DELETE',
		});
		const result = await response.json();
		setList((prev) => prev.filter((user) => user._id !== id));
		return result;
	};
	const blockUser = async (id) => {
		if (authUserId === id) {
			logOut();
		}
		const response = await fetch(
			`http://localhost:5000/auth/users/block/${id}`,
			{
				method: 'PATCH',
			}
		);
		const result = await response.json();
		setList(
			list.map((user) =>
				user._id === id ? {...user, status: 'blocked'} : user
			)
		);
		return result;
	};
	const unblockUser = async (id) => {
		const response = await fetch(
			`http://localhost:5000/auth/users/unblock/${id}`,
			{
				method: 'PATCH',
			}
		);
		const result = await response.json();
		setList(
			list.map((user) =>
				user._id === id ? {...user, status: 'registered'} : user
			)
		);
		return result;
	};

	const handleDeleteAll = () => {
		arrIds.forEach((id) => deleteUser(id));
	};
	const handleBlockAll = () => {
		arrIds.forEach((id) => blockUser(id));
	};
	const handleUnblockAll = () => {
		arrIds.forEach((id) => unblockUser(id));
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
					onClick={handleBlockAll}
					sx={{
						padding: '10px 20px 10px',
						color: '#5769B1',
						fontSize: '18px',
						borderColor: '#5769B1',
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
				<PersonAddAlt1Icon
					onClick={handleUnblockAll}
					sx={{color: '#5769B1', cursor: 'pointer'}}
					fontSize="large"
				/>
				<PersonOffIcon
					sx={{cursor: 'pointer'}}
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
					m: '1vh auto',
					fontSize: '18px',
					bgcolor: 'gray',
					color: 'white',
					borderColor: 'white',
					':hover': {
						bgcolor: '#5769B1',
						borderColor: 'white',
						color: '#EFF67C',
					},
				}}
				variant="outlined"
			>
				Log out
			</Button>
		</Box>
	);
};
