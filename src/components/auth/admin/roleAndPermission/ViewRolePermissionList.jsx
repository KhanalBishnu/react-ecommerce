import React from 'react'

function ViewRolePermissionList({rolePermissions}) {
  return (
    <div className='row'> 
    {rolePermissions.length>0?rolePermissions.map((perm, idx) => (
        <div key={idx} className="col-md-6 mt-1">
            <span key={idx}>{idx+1}. {perm}</span> 
        </div>
    ))
:<div><center>Permission Not Found</center></div>}
</div>  )
}

export default ViewRolePermissionList