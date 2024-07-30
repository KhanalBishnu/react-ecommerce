import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { SwalMessage } from '../../../swal/SwalMessage';
import { getData, postData } from '../../../../constant/axios';
import API_URLS from '../../../../constant/Constant';
import { Margin } from '@mui/icons-material';

function RoleAndPermissionForm({ isDelete,
  isUpdate,
  allPermission,
  handleCloseModal,
  setLoading,
  getRolePermissionList,
  currentPage,
  paginatedValue,
  selectedPermissions, setSelectedPermissions, currentRole }) {

  const [btnSpinner, setBtnSpinner] = useState(false)
  const [newRole, setNewRole] = useState(isUpdate ? currentRole?.name : '')

  const handleCheckboxChange = (event, permissionId) => {
    const { checked } = event.target;

    if (checked) {
      setSelectedPermissions(prevState => [...prevState, permissionId]);
    } else {
      setSelectedPermissions(prevState => prevState.filter(id => id !== permissionId));
    }

  };
  const handleDelete = async (userId) => {
    debugger
    try {
      const response = await getData(`${API_URLS.rolePermissionDelete}/${userId}`, setLoading);
      debugger
      if (response.response) {
        toast.success(response.message)
        getRolePermissionList(currentPage, paginatedValue)
        handleCloseModal()
      } else {
        SwalMessage('Error', response.message, 'error');
      }
    } catch (error) {
      SwalMessage('Error', error.message, 'error');
    }finally{
      setLoading(false);
    }
  }

  const handleSubmit = async () => {
    if (!newRole) {
      toast.error('Role name must be required!')
      return;
    }
    let newFormData = { name: newRole, permissionIds: selectedPermissions };
    if (isUpdate) {
      newFormData = { ...newFormData, id: currentRole.id }
    }
    try {
      setBtnSpinner(true)
      const response = await postData(isUpdate ? API_URLS.updateRoleAndPermission : API_URLS.storeRoleAndPermission, newFormData, setLoading);
      if (response.response) {
        handleCloseModal()
        getRolePermissionList(currentPage, paginatedValue)
        handleCloseModal()
        toast.success(response.message)
      } else {
        SwalMessage('Error', response.message, 'error');
      }
    } catch (error) {
      setBtnSpinner(false);
      SwalMessage('Error', error.message, 'error');
    }finally{
      setBtnSpinner(false);
    }
  }

  return (

    <Form>
      {
        isDelete ? <h6>Are you sure?</h6> :
          <>
            <TextField required fullWidth
              id="outlined-basic" type='text' label="Role Name" variant="outlined" name='name' onChange={(e) => setNewRole(e.target.value)}
              value={newRole} disabled={isUpdate && currentRole.name === "Admin"}
            />
            <Form.Group controlId="formTitle" className='mt-3'>
              <Form.Label>{isUpdate ? 'Edit' : "Add"} Permission</Form.Label>
              {
                allPermission.length > 0 && allPermission.map((module, index) => (
                  <div className="row" key={index}>
                    <label className=' bg-primary mx-auto my-3 p-2 text-white'>{module.title}</label>
                    <div className="col-md-12 d-flex justify-content-center align-items-center gap-4 p-2" >
                      {
                        module.permissions.length > 0 && module.permissions.map((per, i) => (
                          <div className="permissionCheck mx-4" key={i}>
                            <input type="checkbox" className='mx-4'
                              name="permissionids" id={`permission-${i}`}
                              value={per.id}
                              onChange={(event) => handleCheckboxChange(event, per.id)}
                              checked={selectedPermissions.includes(per.id)} />
                            <label htmlFor={`permission-${i}`}>{per.name.split('|')[0]}</label>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </Form.Group>
          </>
      }
      <div className=" form-group d-flex justify-content-end mt-4 gap-2">
        <Button onClick={handleCloseModal} variant="outlined">
          Cancel
        </Button>
        <Button variant="contained" color={isDelete ? 'error' : 'primary'} onClick={isDelete ? () => handleDelete(currentRole.id) : handleSubmit} sx={{ mr: 1 }}>
          {isDelete ? (btnSpinner ? 'Confirming...' : 'Confirm') : (btnSpinner ? 'Submitting...' : 'Submit')}
        </Button>
      </div>

    </Form>
  )
}

export default RoleAndPermissionForm