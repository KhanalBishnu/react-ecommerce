import React, { useEffect, useState } from 'react'
import { getData } from '../../../../constant/axios'
import API_URLS from '../../../../constant/Constant'
import { SwalMessage } from '../../../swal/SwalMessage'
import Spinner from '../../../spinner/Spinner'
import ModalComponent from '../../../modal/ModalComponent'
import UserManagementForm from './UserManagementForm'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function UserData() {
    const [loading,setLoading]=useState(false)
    const [userData,setUserData]=useState([])
    const [showModal,setShowModal]=useState(false)
    const [isUpdate,setIsUpdate]=useState(false)
    const [updatedData,setUpdatedData]=useState(null)
 
    const handleCloseModal=()=>{
        setShowModal(false);
    }
    const handleEditUser=(user)=>{
        setIsUpdate(true);
        setUpdatedData(user);
        setShowModal(true);
    }
    const handleAddUser=()=>{
        setIsUpdate(false);
        setShowModal(true);
    }

    useEffect(()=>{
        getUserManagementList()
    },[])
    const getUserManagementList=async()=>{
        try {
            setLoading(true)
            const response= await getData(API_URLS.getUserManagementData,setLoading);
            if(response.response){
                setUserData(response.data.users);
                setLoading(false);
            }else{
                SwalMessage('Error',response.message|| 'Something went Wrong!','error')
                setLoading(false)
            }
            
        } catch (error) {
            SwalMessage('Error',error.message|| 'Something went Wrong!','error')
            setLoading(false)
        }
    }
  

  return (
    <div className="container-fluid">
        {
            loading ?<Spinner content="Loading..." />:
            <>
            
            <div className="row">
                <div className="col-md-12">
                    <a className="btn btn-primary my-2" onClick={handleAddUser}>Add User</a>
                </div>
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                    <th>SN</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th> 
                    </tr>
                </thead>
                <tbody>
                    {
                        userData.map((user,i)=>(
                        <tr key={user.id}>
                            <td>{i+1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                 <EditIcon  onClick={()=>handleEditUser(user)} sx={{color:'blue',cursor:'pointer'}} />
                                <DeleteIcon  sx={{color:'red',cursor:'pointer'}}/>

                            </td>
                        </tr>
                        ))
                    }
                   
                </tbody>
            </table>

            <ModalComponent 
                showModal={showModal}
                header={isUpdate?'Edit User':'Add USer'}
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