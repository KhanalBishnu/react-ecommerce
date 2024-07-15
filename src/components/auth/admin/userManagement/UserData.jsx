import React, { useEffect, useState } from 'react'
import { getData, postData } from '../../../../constant/axios'
import API_URLS from '../../../../constant/Constant'
import { SwalMessage } from '../../../swal/SwalMessage'
import Spinner from '../../../spinner/Spinner'
import ModalComponent from '../../../modal/ModalComponent'
import UserManagementForm from './UserManagementForm'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableRow, StyledTableCell } from '../../../table/MUITable'
import MUIModal from '../../../modal/MUIModal'
import Pagination from '../../../pagination/Pagination'
import CustomPagination from '../../../pagination/CustomPagination'

function UserData() {
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [updatedData, setUpdatedData] = useState(null)
    // pagination 
    const [page, setPage] = useState(1)
    const [paginatedValue, setPaginatedValue] = useState(10)
    const [totalData, setTotalData] = useState(null)


    const handleCloseModal = () => {
        setShowModal(false);
        setIsUpdate(false);
        setIsDelete(false);
    }
    const handleEditUser = (user) => {
        setIsUpdate(true);
        setUpdatedData(user);
        setShowModal(true);
    }
    const handleAddUser = () => {
        setIsUpdate(false);
        setShowModal(true);
    }

    const handleDelete = (userId) => {
        setShowModal(true);
        setIsDelete(true);
        setUpdatedData(userId);

    }
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        getUserManagementList()
    }, [])
    const getUserManagementList = async () => {
        try {
            setLoading(true)
            const response = await postData(API_URLS.getUserManagementData,{page:page,paginatedValue:paginatedValue}, setLoading);
            if (response.response) {
                setUserData(response.data.users);
                setLoading(false);
                setTotalData(response.data.total);
            } else {
                SwalMessage('Error', response.message || 'Something went Wrong!', 'error')
                setLoading(false)
            }

        } catch (error) {
            SwalMessage('Error', error.message || 'Something went Wrong!', 'error')
            setLoading(false)
        }
    }


    return (
        <div className="container-fluid">
            {
                loading ? <Spinner content="Loading..." /> :
                    <>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-end">
                                <Button onClick={handleAddUser} sx={{ marginBottom: '3px ' }} variant="outlined" color='primary' startIcon={<AddIcon />}>
                                    Add
                                </Button>
                                <MUIModal />

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
                                    {
                                        userData.map((user, i) => (
                                            <StyledTableRow key={user.id}>
                                                <StyledTableCell component="th" scope="row">
                                                    {i + 1}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{user.name}</StyledTableCell>
                                                <StyledTableCell align="right">{user.email}</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <Button onClick={() => handleEditUser(user)} sx={{ marginRight: "2px" }} variant="outlined" startIcon={<EditIcon />}>
                                                        Edit
                                                    </Button>
                                                    <Button variant="outlined" onClick={() => handleDelete(user.id)} color='error' startIcon={<DeleteIcon />}>
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
                            header={isDelete ? 'Delete User' : (isUpdate ? 'Edit User' : 'Add User')}
                            handleCloseModal={handleCloseModal}
                            modalBody={<UserManagementForm
                                isDelete={isDelete}
                                isUpdate={isUpdate}
                                updatedData={updatedData}
                                handleCloseModal={handleCloseModal}
                                setLoading={setLoading}
                                loading={loading}
                                getUserManagementList={getUserManagementList}
                                />}
                            loading={loading}
                        />
                        <div className="d-flex justify-content-center align-items-center">

                        <CustomPagination currentPage={page} totalPages={totalData} onPageChange={handlePageChange} limit={paginatedValue}/>
                        </div>
                    </>
            }
        </div>
    )
}

export default UserData