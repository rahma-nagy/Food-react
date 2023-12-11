import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from "../../../assets/imgs/3.png";

import Modal from 'react-bootstrap/Modal';
import ForgetPassword from '../../../AuthModule/Components/ForgetPassword/ForgetPassword';

export default function SideBar() {
  let navigate=useNavigate()
  let [isCollapsed,setIsCollapsed]=useState(false)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let handleToggle =()=>{
    setIsCollapsed(!isCollapsed)
  }
  let logOut =()=>{
    localStorage.removeItem("userToken")
    navigate('/login')
  }
  return (
    <div className='sideBar-Container position-fixed'>
        

      <Modal show={show} onHide={handleClose}>
       
        <Modal.Body>
          <ForgetPassword handleClose={handleClose}/>
        </Modal.Body>
       
      </Modal>

      <Sidebar collapsed={!isCollapsed}>
  <Menu>
  <MenuItem onClick={ handleToggle} icon={<img src={logo}alt='logo' className='m-5'/>} >  </MenuItem>
    
      <MenuItem icon={<i className="fa-solid fa-home" ></i>} component={<Link to ='/dashboard'/>}> Home </MenuItem>
      <MenuItem icon={<i className="fa-solid fa-heart" ></i>} component={<Link to ='/dashboard/favorites'/>}> Favorites </MenuItem>
    <MenuItem icon={<i className="fa-solid fa-bowl-rice"></i>} component={<Link to ='/dashboard/recipes'/>}> Recipes </MenuItem>
    <MenuItem onClick={handleShow} icon={<i className="fa-solid  fa-calendar-days"></i>} > Change Password </MenuItem>
    <MenuItem icon={<i className="fa-solid fa-right-from-bracket"></i>} onClick={logOut}> logOut </MenuItem>



  </Menu>
</Sidebar >
    </div>
    
  )
}
