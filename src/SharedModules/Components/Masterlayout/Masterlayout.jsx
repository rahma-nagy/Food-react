import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

import SideBar from '../SideBar/SideBar'

export default function Masterlayout({adminData}){
  return <>
  <div className="container-fluid">
    <div className="row">
        <div className="col-md-2">
        <SideBar/>
        </div>
        <div className="col-md-10">
            <div>
               <Navbar adminData={adminData} />
              <div className="container-fluid">
              <Outlet/>
              </div>
          
            </div>
        </div>
    </div>
  </div>
  </>
}
