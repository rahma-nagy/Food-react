import React, { useEffect, useState } from 'react'
import Header from '../../../SharedModules/Components/Header/Header'
import axios from 'axios'
import NoData from '../../../SharedModules/Components/NoData/NoData'
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { useLayoutEffect } from 'react';

export default function UserList() {
  const getUserList=()=>{
    axios.get("https://upskilling-egypt.com:443/api/v1/Users/currentUser",{headers:{
      Authorization:`Bearer ${localStorage.getItem("adminToken")}`
    }
    }).then((response)=>{
        console.log(response.data.group.name);
        setAdmin(response.data.group.name === "SuperAdmin")
    }).catch((error)=>{
      console.log(error);
    })
  }
  const getCategoriesList=()=>{
    console.log("raaaa");

    axios.get("https://upskilling-egypt.com:443/api/v1/Category/?pageSize=10&pageNumber=1",{headers:{
      Authorization:`Bearer ${localStorage.getItem("adminToken")}`
    }
    }).then((response)=>{
      setCategoriesList(response.data.data);
    }).catch((error)=>{
      console.log(error);
    })
  }
  
  const[isAdmin,setAdmin]= useState(false);

  const[CategoriesList,setCategoriesList]= useState([]);

  // const [modelState,setModelState]=useState("close");

  // const showDeleteModel =() =>{
  //   setModelState("model-two")
  // }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useLayoutEffect(()=>{
    getUserList()
    getCategoriesList()
  },[])

  useEffect(()=>{
  
  },[isAdmin])

  return (<>
  <Header title={'user list'} paragraph={'You can now add your items that any user can order it from the Application and you can edit'}/>
  
  <Modal show={show} onHide={handleClose}>
       
       <Modal.Body>
    <h4>Add New Category </h4>
   
       </Modal.Body>
      
     </Modal>
      <div className='row  mx-4 p-3'>
        <div className="col-md-6">
          <div>
            <h6>
            Categories Table Details
            </h6>
            <span>You can check all details</span>
          </div>

        </div>
        <div className="col-md-6 text-end">
          <div>
           <button onClick={handleShow} className='btn btn-success'>Add New Category</button>
          </div>

        </div>
        {CategoriesList.length>0? <div className=''>
      <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Category Name</th>
      <th scope="col">Actions</th>

    </tr>
  </thead>
  <tbody>
    
  {CategoriesList.map((category)=><React.Fragment key={category.id}>
  <tr>
    <th scope='row'>{category.id}</th>
    <td>{category.name}</td>

    <td><i className='fa fa-edit fa-1x mx-2 text-warning'></i>
    <i onClick={handleShow} className='fa fa-trash fa-1x text-danger'></i>
    </td>
  </tr>
  </React.Fragment>)}
  </tbody>
</table>
      </div>:(<NoData/>)}
      
      </div>
     
</>

  )
}
