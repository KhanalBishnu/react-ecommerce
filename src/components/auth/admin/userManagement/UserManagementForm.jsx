import { Password } from '@mui/icons-material'
import React, { useState } from 'react'
import { postData } from '../../../../constant/axios'
import API_URLS from '../../../../constant/Constant'
import { Button } from '@mui/material'

function UserManagementForm({ isUpdate, updatedData }) {
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

            if (isUpdate) {
                setFormData({ ...formData, [id]: updatedData.id })
            }
            const response = postData(isUpdate ? API_URLS.getUserManagementDataUpdate : API_URLS.getUserManagementDataStore, formData,)

        }
    }


    return (

        <form >
            <div className="illustration">
                <i className="icon ion-ios-navigate"></i>
            </div>
            <div className="form-group my-2 py-1">
                <label htmlFor="name">Name<sup className="text-danger">*</sup></label>
                <input
                    className={`form-control rounded ${errors.name ? 'border border-danger' : ''}`}
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group my-2 py-1">
                <label htmlFor="email">Email<sup className="text-danger">*</sup></label>
                <input
                    className={`form-control rounded ${errors.email ? 'border border-danger' : ''}`}
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                    value={formData.email}
                />
            </div>

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
                    <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mr: 1 }}>
                        Submit
                    </Button>
                    <Button variant="outlined">
                        Cancel
                    </Button>
                </div>

            </div>

        </form>
    )
}

export default UserManagementForm