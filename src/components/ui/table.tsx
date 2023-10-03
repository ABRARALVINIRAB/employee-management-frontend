import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
    _id: string;
    name: string;
    email: string;
    gender: string;
    phoneNumber: string;
    employeeId: string;
    isApproved: boolean;
    // Add any other user-related fields here
}

export default function UserTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        // Fetch data from API endpoint
        fetch('http://localhost:5000/api/v1/users/get-all-users')
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [users]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleUpdate = async (user: User) => {
        try {
            // Send an API request to update the user's "isApproved" status
            const response = await fetch(`http://localhost:5000/api/v1/users/update-user/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isApproved: !user.isApproved }), // Toggle the value
            });
    
            if (response.ok) {
                // Update the local state to reflect the change
                setUsers((prevUsers) =>
                    prevUsers.map((u) => (u._id === user._id ? { ...u, isApproved: !user.isApproved } : u))
                );
                toast.success('User status updated successfully');
            } else {
                console.error('Failed to update user status');
                toast.error('Failed to update user status');
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Employee ID</TableCell>
                                <TableCell>Is Approved</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((user) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
                                        <TableCell>{user._id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.gender}</TableCell>
                                        <TableCell>{user.phoneNumber}</TableCell>
                                        <TableCell>{user.employeeId}</TableCell>
                                        <TableCell>{user.isApproved ? 'Approved' : 'Pending'}</TableCell>
                                        <TableCell align="center">
                                            <Button variant="outlined" color="primary" onClick={() => handleUpdate(user)}>
                                                Update
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <ToastContainer />
        </>
    );
}
