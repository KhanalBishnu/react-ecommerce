import React, { useEffect, useState } from 'react'
import { getData } from '../../../../constant/axios'
import API_URLS from '../../../../constant/Constant'
import { SwalMessage } from '../../../swal/SwalMessage'
import Spinner from '../../../spinner/Spinner'

function UserData() {
    const [loading,setLoading]=useState(false)
    const [userData,setUserData]=useState([])
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
                    <a className="btn btn-primary">Add User</a>
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
                            <td>edit</td>
                        </tr>
                        ))
                    }
                   
                </tbody>
            </table>
            </>
        }
    </div>
    )
}

export default UserData