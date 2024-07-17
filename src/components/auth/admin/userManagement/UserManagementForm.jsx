import { Password } from '@mui/icons-material'
import React, { useState } from 'react'
import { getData, postData } from '../../../../constant/axios'
import API_URLS from '../../../../constant/Constant'
import { Button, TextField } from '@mui/material'
import { SwalMessage } from '../../../swal/SwalMessage'
// import MUIAlert, { alertMUI } from '../../../swal/MUIAlert'

function UserManagementForm({ isUpdate, updatedData, handleCloseModal, isDelete, setLoading, getUserManagementList, loading }) {
    const [btnSpinner, setBtnSpinner] = useState(false)
    const [formData, setFormData] = useState({
        name: isUpdate ? updatedData.name : '',
        email: isUpdate ? updatedData.email : '',
    })
    const [errors, setErrors] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
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
                    // <MUIAlert message={response.message} />
                    // alertMUI(response.message)
                    SwalMessage('Success', response.message, 'success');
                    getUserManagementList()
                    setBtnSpinner(false)
                    handleCloseModal()
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
    const handleDelete = async (userId) => {
        try {
            const response = await getData(`${API_URLS.getUserManagementDataDelete}/${userId}`, setLoading);
            if (response.response) {
                SwalMessage('Success', response.message, 'success');
                getUserManagementList()
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


    return (

        <form >
            {
                isDelete ? <h6>Are you sure?</h6> : <>
                    <div className="illustration">
                        <i className="icon ion-ios-navigate"></i>
                    </div>
                    <div className="form-group my-2 py-1">
                        {/* <label htmlFor="name">Name<sup className="text-danger">*</sup></label>
                        <input
                            className={`form-control rounded ${errors.name ? 'border border-danger' : ''}`}
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            value={formData.name}
                            onChange={handleChange}
                        /> */}
                          <TextField required className={`form-control rounded w-100' ${errors.name ? 'border border-danger' : ''}`}
                         id="outlined-basic" type='text' label="Name" variant="outlined" name='name' onChange={handleChange}
                            value={formData.name}  />
                    </div>
                    <div className="form-group my-2 py-1">
                        {/* <label htmlFor="email">Email<sup className="text-danger">*</sup></label> */}
                        {/* <input
                            className={`form-control rounded ${errors.email ? 'border border-danger' : ''}`}
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            onChange={handleChange}
                            value={formData.email}
                        /> */}
                        <TextField required className={`form-control rounded w-100' ${errors.email ? 'border border-danger' : ''}`} id="outlined-basic" type='email' label="Email" variant="outlined" name='email' onChange={handleChange}
                            value={formData.email}  />

                    </div>
                </>
            }

            {/* <div className="form-group my-2 py-1">
                <label htmlFor="confirm_password">Photo</label>
                <input
                    className={`form-control rounded ${errors.file ? 'border border-danger' : ''}`}
                    type="file"
                    name="file"
                    onChange={handleChange}
                />
                {errors.file && <span className='text-danger'>{errors.file}</span>}
            </div> */}
            {/* <div className="form-group my-2 py-1">
                <label htmlFor="">Select Role</label>
                <select name="roleId" className='form-control' id="" onChange={handleChange} >
                    <option value="">Choose Role</option>
                    {
                        allRoles?.map((role) => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                        ))
                    }
                </select>
            </div> */}
            <div className=" form-group d-flex justify-content-end mt-4">
                <div className="d-flex gap-1">
                    <Button onClick={handleCloseModal} variant="outlined">
                        Cancel
                    </Button>
                    <Button variant="contained" color={isDelete ? 'error' : 'primary'} onClick={isDelete ? () => handleDelete(updatedData) : handleSubmit} sx={{ mr: 1 }}>
                        {isDelete ? (btnSpinner ? 'Confirming...' : 'Confirm') : (btnSpinner ? 'Submitting...' : 'Submit')}
                    </Button>


                </div>

            </div>

        </form>
    )
}

export default UserManagementForm