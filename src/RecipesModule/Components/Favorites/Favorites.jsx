import React from 'react'
import Header from '../../../SharedModules/Components/Header/Header'
import { useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { useEffect } from 'react';

export default function Favorites() {

    const [favList,setFavList] =useState([]);
    const {requstHeaders,baseUrl}=useContext(AuthContext)

    const getAllFavorites= ()=>{
            axios
              .get(`${baseUrl}/userRecipe/`, {
                headers: requstHeaders,
              })
              .then((response) => {
                setFavList(response.data.data);
              })
              .catch((error) => console.log(error));
    }


    useEffect(()=>{
        getAllFavorites()
    },[])
  return (
    <>
      <Header
        title={"Favorites"}
        paragraph={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
<div className="row">
   
    {favList.map(fav=> <div className="col-md-4">   
    
    <div>
        <h2>{fav.id}</h2>
    </div>
     </div>
)}

</div>
    </>
  )
}
