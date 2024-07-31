import React, { useEffect, useState, useCallback } from 'react';
import { getData, postData } from '../../../../constant/axios';
import API_URLS from '../../../../constant/Constant';
import { SwalMessage } from '../../../swal/SwalMessage';
import Spinner from '../../../spinner/Spinner';
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewRolePermissionList from './ViewRolePermissionList';
import RoleAndPermissionForm from './RoleAndPermissionForm';

const RolePermissionData = () => {
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [btnSpinner, setBtnSpinner] = useState(false)


    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedValue, setPaginatedValue] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const handleCloseModal = useCallback(() => {
        setIsUpdate(false);
        setIsDelete(false);
        setShowModal(false);
    }, []);


    const handleAddRolePermission = useCallback(async() => {
        setBtnSpinner(prev=>!prev)
        try {
            const res=await getData(`${API_URLS.allPermissionList}`,setLoading);
            const data=res.data;
            setAllPermission(data)
        } catch (error) {
            console.error('Failed to fetch permissions:', error);
        }
        setIsUpdate(false);
        setShowModal(true);    
        setIsDelete(false);
        setRolePermissions(false)
        setIsRolePermissionList(false)
        setBtnSpinner(prev=>!prev)
    }, []);

    const handleDelete = useCallback((role) => {
        setShowModal(true);
        setIsDelete(true);
        setCurrentRole(role)
        setIsRolePermissionList(false)
    }, []);

    const handlePageChange = useCallback((event, value) => {
        setCurrentPage(value);
        getRolePermissionList(value, paginatedValue);
    }, [paginatedValue]);

    const handleItemsPerPageChange = useCallback((event) => {
        const value = event.target.value;
        setPaginatedValue(value);
        setCurrentPage(1);
        getRolePermissionList(1, value);
    }, []);

    //permission 
    const [rolePermissions, setRolePermissions] = useState([]);
    const [isRolePermissionList, setIsRolePermissionList] = useState(false);
    const handleViewRolePermission = () => {
        setIsUpdate(false);
        setShowModal(true);
        setIsRolePermissionList(true);
    }

    const getRolePermissionList = useCallback(async (page = 1, paginatedValue = 10) => {
        try {
            setLoading(true);
            const response = await postData(API_URLS.getRoleAndPermissionData, { page, paginatedValue });
            if (response.response) {
                setRoles(response.data.items);
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
        getRolePermissionList(currentPage, paginatedValue);
    }, [currentPage, paginatedValue, getRolePermissionList]);

    //role permission list
    const handlePermissionListView = async (roleId) => {
        setBtnSpinner(prev=>!prev)
        try {
            const res = await getData(`${API_URLS.getRolePermission}/${roleId}`, setLoading);
            const data = res.data;
            setRolePermissions(data);
            handleViewRolePermission();
        } catch (error) {
            console.error('Failed to fetch permissions:', error);
        }
        setBtnSpinner(prev=>!prev)
    };

    //edit role 
    const [allPermission,setAllPermission]=useState([]);
    const [userOwnPermission, setUserOwnPermission] = useState([]);
    const [currentRole, setCurrentRole] = useState(null);
    const editRolePermission= async (role)=>{
        setBtnSpinner(prev=>!prev)
        try {
            const res=await getData(`${API_URLS.getPermissionList}/${role.id}`,setLoading);
            const data=res.data;
            setAllPermission(data.modules)
            setUserOwnPermission(data.permissionIds);
            setIsUpdate(true);
            setShowModal(true);
            setCurrentRole(role)
            setIsRolePermissionList(false)
        } catch (error) {
            console.error('Failed to fetch permissions:', error);
        }
        setBtnSpinner(prev=>!prev)
    }
    return (
        <div className="container-fluid">
            {loading ? <Spinner content="Loading..." /> : (
                <>
                    <div className="row">
                        <div className="col-md-12 d-flex justify-content-end">
                            <Button onClick={handleAddRolePermission} sx={{ marginBottom: '3px ' }} variant="outlined" color="primary" startIcon={<AddIcon />}>
                            {btnSpinner?'Adding...':"Add"}
                            </Button>
                        </div>
                    </div>
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>SN</StyledTableCell>
                                    <StyledTableCell align="right">Name</StyledTableCell>
                                    <StyledTableCell align="right">Permissions</StyledTableCell>
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {roles.map((role, i) => (
                                    <StyledTableRow key={role.id}>
                                        <StyledTableCell component="th" scope="row">{i + 1}</StyledTableCell>
                                        <StyledTableCell align="right">{role.name}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Button onClick={() => handlePermissionListView(role.id)} sx={{ marginBottom: '3px ' }} variant="outlined" color="primary" startIcon={<VisibilityIcon />}>
                                                {btnSpinner?'Viewing...':"View"}
                                            </Button>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Button onClick={() => editRolePermission(role)} sx={{ marginRight: "2px" }} variant="outlined" startIcon={<EditIcon />}>
                                            {btnSpinner?'Editing...':"Edit"}

                                            </Button>
                                            <Button variant="outlined" onClick={() => handleDelete(role)} color="error" startIcon={<DeleteIcon />}>
                                                Delete
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <MUIModal
                        isDelete={isDelete}
                        showModal={showModal}
                        header={isRolePermissionList ? 'Permission List' : (isDelete ? 'Delete Role' : (isUpdate ? 'Edit Role' : 'Add Role'))}
                        handleCloseModal={handleCloseModal}
                        modalBody={isRolePermissionList ? <ViewRolePermissionList
                            rolePermissions={rolePermissions}
                        /> : <RoleAndPermissionForm
                            isDelete={isDelete}
                            isUpdate={isUpdate}
                            allPermission={allPermission}
                            handleCloseModal={handleCloseModal}
                            getRolePermissionList={getRolePermissionList}
                            currentPage={currentPage}
                            paginatedValue={paginatedValue}
                            userOwnPermission={userOwnPermission}
                            currentRole={currentRole}
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

export default RolePermissionData;
