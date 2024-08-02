import { Description, Password } from '@mui/icons-material'
import React, { useState } from 'react'
import { getData, postData } from '../../../../constant/axios'
import API_URLS from '../../../../constant/Constant'
import { Button, Checkbox, FormControlLabel, Input, TextField } from '@mui/material'
import { SwalMessage } from '../../../swal/SwalMessage'
import { toast } from 'react-toastify'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ImagePreview from '../../../Image/ImagePreview'
// import MUIAlert, { alertMUI } from '../../../swal/MUIAlert'

function CategoryProductForm({ isUpdate, updatedData, handleCloseModal, isDelete, setLoading, getCategoryProductData, currentPage, paginatedValue }) {
    // for image preview 
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(isUpdate&&updatedData.media&& updatedData.media.length>0 ?updatedData.media[0].original_url:null);
    const [removedFiles,setRemovedFiles]=useState(isUpdate&&updatedData.media&& updatedData.media.length>0 ?updatedData.media[0].id:null)

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        if (selectedFile && selectedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setPreview(null);
        }
    };
    const handleRemove = () => {
        setFile(null);
        setPreview(null);
      };
    //end image preview

    const [btnSpinner, setBtnSpinner] = useState(false)
    const [formData, setFormData] = useState({
        name: isUpdate ? updatedData.name : '',
        description: isUpdate ? updatedData.description: '',
        status: isUpdate && updatedData.status=="Disabled"?false : true,
        file:file,
    })
    const [errors, setErrors] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    const handleChangeCheck = (e) => {
        const { checked,name } = e.target;
        setFormData({ ...formData, [name]: checked })
    }
    const handleSubmit = async () => {
        const newErrors = {};
      
        if (!formData.name) {
          newErrors.name = 'required';
        }
      
        setErrors(newErrors);
      
        if (Object.keys(newErrors).length === 0) {
          const newFormData = {
            ...formData,
            ...(file && { file }),  // Add file if it exists
            ...(isUpdate && { id: updatedData.id }), ...(removedFiles && {removedFiles:removedFiles}) // Add id if updating
          };
      
          try {
            setBtnSpinner(true);
            const apiUrl = isUpdate ? API_URLS.updateCategoryProduct : API_URLS.storeCategoryProduct;
            const response = await postData(apiUrl, newFormData, setLoading);
      
            if (response.response) {
              // On success
              getCategoryProductData(currentPage, paginatedValue);
              handleCloseModal();
              toast.success(response.message);
            } else {
              SwalMessage('Error', response.message, 'error');
            }
          } catch (error) {
            // On error
            SwalMessage('Error', error.message, 'error');
          } finally {
            setBtnSpinner(false);
          }
        }
      };
      
    const handleDelete = async (userId) => {
        try {
            const response = await getData(`${API_URLS.getUserManagementDataDelete}/${userId}`, setLoading);
            if (response.response) {
                toast.success(response.message)
                getCategoryProductData(currentPage, paginatedValue)
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
                        <TextField required className={`form-control rounded w-100' ${errors.name ? 'border border-danger' : ''}`}
                            id="outlined-basic" type='text' label="Name" variant="outlined" name='name' onChange={handleChange}
                            value={formData.name} />
                    </div>
                    <div className="form-group my-2 py-1">
                        <TextField
                            label="Description"
                            name="description"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                            value={formData.description}
                        />
                    </div>
                    <div className="form-group my-2 py-1 d-flex justify-content-between mx-2">
                        <div>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.status}
                                        onChange={handleChangeCheck}
                                        name="status"
                                        color="primary"
                                        defaultChecked
                                    />
                                }
                                label="Enabled"
                            />
                        </div>
                        <div>
                            <Input
                                accept="image/*"
                                id="file-input"
                                type="file"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="file-input">
                                <Button variant="contained" component="span">
                                    Upload File <FileUploadIcon className='mx-2'/>
                                </Button>
                            </label>
                            <ImagePreview file={file} preview={preview} onRemove={handleRemove} />
                        </div>
                    </div>
                </>
            }
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

export default CategoryProductForm