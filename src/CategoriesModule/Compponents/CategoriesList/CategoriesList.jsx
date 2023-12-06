import React, { useEffect, useState } from 'react'
import Header from '../../../SharedModules/Components/Header/Header'
import axios from 'axios'
// import NoData from '../../../assets/imgs/nodata.png';
import nodata from '../../../assets/imgs/nodata.png';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';

export default function CategoriesList() {
  const {register,handleSubmit,formState:{errors}}= useForm();
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

  const onSubmit=(data)=>{
axios.post("https://upskilling-egypt.com:443/api/v1/Category/",data,{
  headers:{
    Authorization:`Bearer ${localStorage.getItem("adminToken")}`
  }
}).then((response)=>{
  handleClose()
  console.log(response);
  getCategoriesList()
}).catch((error)=>{
  console.log(error);
})
  }
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

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  const handleClose= () => setModelState("close") ;

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



  useEffect(()=>{
   getCategoriesList()
  },[])
  return (<>
  <Header title={'welcom Categoties'} paragraph={'categories'}/>
  
  <Modal show={modelState==="modal-one"} onHide={handleClose}>
       
       <Modal.Body>
    <h4>Add New Category </h4>
    <form onSubmit={showAddModel}>
      <div className="form-group my-3">
        
          <input className="form-control" placeholder='category Name' type="text" {...register("name",{required:true})} />
          {errors.name&&errors.name.type==='required'&&(<span className='text-danger'>field is required</span>)
          }
     
      </div>
      <div className="form-group text-end">
        <button className='btn btn-success'> save </button>
      </div>

    </form>
       </Modal.Body>
      
     </Modal>

     <Modal show={modelState==="modal-two"} onHide={handleClose}>
       
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
            Categories Table Details
            </h6>
            <span>You can check all details</span>
          </div>

        </div>
        <div className="col-md-6 text-end">
          <div>
           <button onClick={showAddModel} className='btn btn-success'>Add New Category</button>
          </div>

        </div>
        {CategoriesList.length>0? <div className=''>
      <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Category Name</th>
      <th scope="col">Actions</th>

    </tr>
  </thead>
  <tbody>
  {CategoriesList.map((category)=><React.Fragment key={category.id}>
  <tr key={category.id}>
    <th scope='row'>{category.id}</th>
    <td>{category.name}</td>

    <td><i className='fa fa-edit fa-1x mx-2 text-warning'></i>
    <i onClick={()=>showDeleteModel(category.id)} className='fa fa-trash fa-1x text-danger'></i>
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
