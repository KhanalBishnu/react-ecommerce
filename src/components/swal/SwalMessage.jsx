import React from 'react'
import Swal from 'sweetalert2'

 export const SwalMessage=(title,text,icon)=> {
 Swal.fire({
    title,text,icon
 })
}
