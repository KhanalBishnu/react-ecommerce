import { Button } from '@mui/material';
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { toast } from 'react-toastify';

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
    const [newRole, setNewRole] = useState(isUpdate?currentRole:'')

  const handleCheckboxChange = (event, permissionId) => {
    const { checked } = event.target;

    if (checked) {
      setSelectedPermissions(prevState => [...prevState, permissionId]);
    } else {
      setSelectedPermissions(prevState => prevState.filter(id => id !== permissionId));
    }

  };



  const handleDelete = async (userId) => {
    try {
      const response = await getData(`${API_URLS.rolePermissionDelete}/${userId}`, setLoading);
      if (response.response) {
        toast.success(response.message)
        getRolePermissionList(currentPage, paginatedValue)
        setLoading(false)
        handleCloseModal()
      } else {
        setLoading(false);
        SwalMessage('Error', response.message, 'error');
      }
    } catch (error) {
      setLoading(false);
      SwalMessage('Error', error.message, 'error');
    }
  }

  const handleSubmit = async () => {
    let newErros = {};
    if (!!!formData.name) {
        newErros.name = 'required'
    }
    if (!!!formData.email) {
        newErros.email = 'required'
    }
    setErrors(newErros);
    if (Object.keys(newErros).length == 0) {
        let newFormData = formData;
        if (isUpdate) {
            newFormData = { ...formData, id: updatedData.id }
        }
        try {
            setBtnSpinner(true)
            const response = await postData(isUpdate ? API_URLS.getUserManagementDataUpdate : API_URLS.getUserManagementDataStore, newFormData, setLoading);
            if (response.response) {
                handleCloseModal()
                getUserManagementList(currentPage,paginatedValue)
                setBtnSpinner(false)
                handleCloseModal()
                toast.success(response.message)  
            } else {
                SwalMessage('Error', response.message, 'error');
                setBtnSpinner(false);
            }
        } catch (error) {
            setBtnSpinner(false);
            SwalMessage('Error', error.message, 'error');
        }
    }
}
  return (

    <Form>
      {
        isDelete ? <h6>Are you sure?</h6> : 
        <>
          <Form.Group controlId="formTitle">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="title"
              disabled={currentRole === "Admin"}
              onChange={(e) => setNewRole(e.target.value)}
              value={newRole}
              className={` border rounded`}
            />
          </Form.Group>
          <Form.Group controlId="formTitle" className='mt-3'>
            <Form.Label>Edit Permission</Form.Label>
            {
              allPermission.length > 0 && allPermission.map((module, index) => (
                <div className="row">
                  <label className='text-center bg-primary mx-auto my-3 p-2 text-white'>{module.title}</label>
                  <div className="col-md-12 d-flex justify-content-center align-items-center gap-4 p-2" >
                    {
                      module.permissions.length > 0 && module.permissions.map((per, i) => (
                        <div className="permissionCheck mx-4">
                          <input type="checkbox" className='mx-2'
                            name="permissionids" id={`permission-${i}`}
                            value={per.id}
                            onChange={(event) => handleCheckboxChange(event, per.id)}
                            checked={selectedPermissions.includes(per.id)} />
                          <label for={`permission-${i}`}>{per.name.split('|')[0]}</label>
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
      <Button variant="contained" color={isDelete ? 'error' : 'primary'} onClick={isDelete ? () => handleDelete(updatedData) : handleSubmit} sx={{ mr: 1 }}>
        {isDelete ? (btnSpinner ? 'Confirming...' : 'Confirm') : (btnSpinner ? 'Submitting...' : 'Submit')}
      </Button>
      </div>
      
    </Form>
  )
}

export default RoleAndPermissionForm