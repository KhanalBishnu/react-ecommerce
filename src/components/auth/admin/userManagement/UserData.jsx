import React, { useEffect, useState, useCallback } from 'react';
import { getData, postData } from '../../../../constant/axios';
import API_URLS from '../../../../constant/Constant';
import { SwalMessage } from '../../../swal/SwalMessage';
import Spinner from '../../../spinner/Spinner';
import ModalComponent from '../../../modal/ModalComponent';
import UserManagementForm from './UserManagementForm';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, FormControl, InputLabel, MenuItem, Pagination, Select, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableRow, StyledTableCell } from '../../../table/MUITable';
import MUIModal from '../../../modal/MUIModal';
import CustomPagination from '../../../pagination/CustomPagination';

const UserData = () => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [updatedData, setUpdatedData] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedValue, setPaginatedValue] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const handleCloseModal = useCallback(() => {
        setIsUpdate(false);
        setShowModal(false);
        setIsDelete(false);
    }, []);

    const handleEditUser = useCallback((user) => {
        setIsUpdate(true);
        setUpdatedData(user);
        setShowModal(true);
    }, []);

    const handleAddUser = useCallback(() => {
        setIsUpdate(false);
        setShowModal(true);
    }, []);

    const handleDelete = useCallback((userId) => {
        setShowModal(true);
        setIsDelete(true);
        setUpdatedData(userId);
    }, []);

    const handlePageChange = useCallback((event, value) => {
        setCurrentPage(value);
        getUserManagementList(value, paginatedValue);
    }, [paginatedValue]);

    const handleItemsPerPageChange = useCallback((event) => {
        const value = event.target.value;
        setPaginatedValue(value);
        setCurrentPage(1);
        getUserManagementList(1, value);
    }, []);

    const getUserManagementList = useCallback(async (page = 1, paginatedValue = 10) => {
        try {
            setLoading(true);
            const response = await postData(API_URLS.getUserManagementData, { page, paginatedValue });
            if (response.response) {
                setUserData(response.data.users);
                setTotalPages(Math.ceil(response.data.total / paginatedValue));
            } else {
                SwalMessage('Error', response.message || 'Something went Wrong!', 'error');
            }
            setLoading(false);
        } catch (error) {
            SwalMessage('Error', error.message || 'Something went Wrong!', 'error');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getUserManagementList(currentPage, paginatedValue);
    }, [currentPage, paginatedValue, getUserManagementList]);

    return (
        <div className="container-fluid">
            {loading ? <Spinner content="Loading..." /> : (
                <>
                    <div className="row">
                        <div className="col-md-12 d-flex justify-content-end">
                            <Button onClick={handleAddUser} sx={{ marginBottom: '3px ' }} variant="outlined" color="primary" startIcon={<AddIcon />}>
                                Add
                            </Button>
                        </div>
                    </div>
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>SN</StyledTableCell>
                                    <StyledTableCell align="right">Name</StyledTableCell>
                                    <StyledTableCell align="right">Email</StyledTableCell>
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userData.map((user, i) => (
                                    <StyledTableRow key={user.id}>
                                        <StyledTableCell component="th" scope="row">{i + 1}</StyledTableCell>
                                        <StyledTableCell align="right">{user.name}</StyledTableCell>
                                        <StyledTableCell align="right">{user.email}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Button onClick={() => handleEditUser(user)} sx={{ marginRight: "2px" }} variant="outlined" startIcon={<EditIcon />}>
                                                Edit
                                            </Button>
                                            <Button variant="outlined" onClick={() => handleDelete(user.id)} color="error" startIcon={<DeleteIcon />}>
                                                Delete
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <MUIModal
                        showModal={showModal}
                        isDelete={isDelete}
                        header={isDelete ? 'Delete User' : (isUpdate ? 'Edit User' : 'Add User')}
                        handleCloseModal={handleCloseModal}
                        modalBody={<UserManagementForm
                            isDelete={isDelete}
                            isUpdate={isUpdate}
                            updatedData={updatedData}
                            handleCloseModal={handleCloseModal}
                            getUserManagementList={getUserManagementList}
                            currentPage={currentPage}
                            paginatedValue={paginatedValue}
                        />}
                        loading={loading}
                    />
                    <div className="d-flex justify-content-center align-items-center">
                        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                            />
                            <FormControl sx={{ mt: 2, minWidth: 120, '& .MuiInputBase-root': { height: 36 } }}>
                                <InputLabel>Items per page</InputLabel>
                                <Select
                                    value={paginatedValue}
                                    onChange={handleItemsPerPageChange}
                                    label="Items per page"
                                    sx={{ height: 36 }}
                                >
                                    <MenuItem value={5} sx={{ height: 30 }}>5</MenuItem>
                                    <MenuItem value={10} sx={{ height: 30 }}>10</MenuItem>
                                    <MenuItem value={20} sx={{ height: 30 }}>20</MenuItem>
                                    <MenuItem value={50} sx={{ height: 30 }}>50</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </div>
                </>
            )}
        </div>
    );
};

export default React.memo(UserData);
