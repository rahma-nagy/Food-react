import React, { useEffect, useState } from 'react'
import Header from '../../../SharedModules/Components/Header/Header'
import axios from 'axios'
// import NoData from '../../../SharedModules/Components/NoData/NoData'
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import nodata from '../../../assets/imgs/nodata.png';

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

  const [modelState,setModelState]=useState("close");

  const [itemId,setItemId]=useState(0);


  const showAddModel =() =>{
    setModelState("modal-one")
  }

  const showDeleteModel =(id) =>{
    setItemId(id)
    setModelState("modal-two")
  }

  // const [modelState,setModelState]=useState("close");

  // const showDeleteModel =() =>{
  //   setModelState("model-two")
  // }

//   const [show, setShow] = useState(false);

  const handleClose = () => setModelState("close");

  
  const deleteCategories =()=>{
    axios.delete(`https://upskilling-egypt.com:443/api/v1/Category/${itemId}`,{
     headers:{
      Authorization:`Bearer ${localStorage.getItem("adminToken")}`
    }
  }).then((response)=>{
    console.log(response);
    handleClose();
  
  }).catch((error)=>console.log(error))
  }

//   const handleShow = () => setShow(true);
  useLayoutEffect(()=>{
    getUserList()
    getCategoriesList()
  },[])

  useEffect(()=>{
  
  },[isAdmin])

  return (<>
  <Header title={'user list'} paragraph={'You can now add your items that any user can order it from the Application and you can edit'}/>
  
  <Modal show={modelState==="modal-one"} onHide={handleClose}>
       
       <Modal.Body>
       <div className="text-center">

<img src={nodata} alt='#'/>
<h5 className='my-2'>Delete This Item?</h5>
<span className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</span>
</div>
<div className="text-end my-2">
    <button onClick={deleteCategories} className='btn btn-outline-danger'>Delete This Item</button>

</div>   
       </Modal.Body>
      
     </Modal>
      <div className='row  mx-4 p-3'>
        <div className="col-md-6">
          <div>
            <h6>
            Users Table Details
            </h6>
            <span>You can check all details</span>
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

    <td><i class="fa-regular fa-eye text-success p-1 fa-1x"></i>
    <i  onClick={()=>showDeleteModel(category.id)} className='fa fa-trash  text-success py-1 fa-1x'></i>
    </td>
  </tr>
  </React.Fragment>)}
  </tbody>
</table>
      </div>:(<nodata/>)}
      
      </div>
     
</>

  )
}
