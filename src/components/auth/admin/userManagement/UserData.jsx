import React, { useEffect, useState } from 'react'
import { getData } from '../../../../constant/axios'
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

function UserData() {
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [updatedData, setUpdatedData] = useState(null)

    const handleCloseModal = () => {
        setShowModal(false);
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

    useEffect(() => {
        getUserManagementList()
    }, [])
    const getUserManagementList = async () => {
        try {
            setLoading(true)
            const response = await getData(API_URLS.getUserManagementData, setLoading);
            if (response.response) {
                setUserData(response.data.users);
                setLoading(false);
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
                                {/* <a className="btn btn-primary my-2" >Add User</a> */}
                                <Button onClick={handleAddUser} sx={{ marginBottom: '3px ' }} variant="outlined" color='primary' startIcon={<AddIcon />}>
                                    Add
                                </Button>
                                <MUIModal />

                            </div>
                        </div>
                        <TableContainer component={Paper}>
                            <Table  aria-label="customized table">
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
                                                {i+1}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{user.name}</StyledTableCell>
                                            <StyledTableCell align="right">{user.email}</StyledTableCell>
                                            <StyledTableCell align="right">
                                            <Button onClick={() => handleEditUser(user)} sx={{ marginRight: "2px" }} variant="outlined" startIcon={<EditIcon />}>
                                                    Edit
                                                </Button>
                                                <Button variant="outlined" color='error' startIcon={<DeleteIcon />}>
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
                            header={isUpdate ? 'Edit User' : 'Add User'}
                            handleCloseModal={handleCloseModal}
                            modalBody={<UserManagementForm
                                isUpdate={isUpdate}
                                updatedData={updatedData}

                            />}
                            loading={loading}
                        />
                    </>
            }
        </div>
    )
}

export default UserData