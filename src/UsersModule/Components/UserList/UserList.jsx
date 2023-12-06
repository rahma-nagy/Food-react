import React, { useEffect, useState } from "react";
import Header from "../../../SharedModules/Components/Header/Header";
import axios from "axios";
// import NoData from '../../../SharedModules/Components/NoData/NoData'
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import avatar from "../../../assets/imgs/avatar.png";
import nodata from "../../../assets/imgs/nodata.png";

import { useLayoutEffect } from "react";

export default function UserList() {
  const getCurrentUser = () => {
    axios
      .get("https://upskilling-egypt.com:443/api/v1/Users/currentUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data.group.name);
        setAdmin(response.data.group.name === "SuperAdmin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUsersList = () => {
    axios
      .get(
        "https://upskilling-egypt.com:443/api/v1/Users/?pageSize=20&pageNumber=2",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((response) => {
        setUsersList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [isAdmin, setAdmin] = useState(false);

  const [usersList, setUsersList] = useState([]);

  const [modelState, setModelState] = useState("close");

  const [itemId, setItemId] = useState(0);

  const [selectedUser, setSelectUser] = useState({});

  const showUserDetailsModal = (user) => {
    setSelectUser(user);
    console.log(user);
    setModelState("modal-one");
  };

  const showDeleteModel = (id) => {
    setItemId(id);
    console.log(itemId);

    setModelState("modal-two");
  };

  const handleClose = () => setModelState("close");

  const deleteUser = () => {
    axios
      .delete(`https://upskilling-egypt.com:443/api/v1/Users/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        console.log(response);
        handleClose();
      })
      .catch((error) => console.log(error));
  };

  //   const handleShow = () => setShow(true);
  useLayoutEffect(() => {
    getCurrentUser();
    getUsersList();
  }, []);


  return (
    <>
      <Header
        title={"user list"}
        paragraph={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />

      <Modal show={modelState === "modal-two"} onHide={handleClose}>
        <Modal.Body>
          <div className="text-center">
            <img src={nodata} alt="#" />
            <h5 className="my-2">Delete This Item?</h5>
            <span className="text-muted">
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </span>
          </div>
          <div className="text-end my-2">
            <button onClick={deleteUser} className="btn btn-outline-danger">
              Delete This Item
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={modelState === "modal-one"} onHide={handleClose}>
        {Object.keys(selectedUser).length === 0 ? <></> : <Modal.Body>
          <div className="text-center">{selectedUser.country}</div>
          {selectedUser.group.name ? <div className="text-center">{selectedUser.group.name}</div>:<></>}

        </Modal.Body>}
        
      </Modal>

      <div className="row  mx-4 p-3">
        <div className="col-md-6">
          <div>
            <h6>Users Table Details</h6>
            <span>You can check all details</span>
          </div>
        </div>

        {usersList.length > 0 ? (
          <div className="">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">user name</th>
                  <th scope="col">Image</th>
                  <th scope="col">phone</th>
                  <th scope="col">email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((user) => (
                  <React.Fragment key={user.id}>
                    <tr>
                      <th scope="row">{user.id}</th>
                      <td>{user.userName}</td>
                      <th>
                        <img
                          width={"50px"}
                          style={{ aspectRatio: "1", borderRadius: "50%" }}
                          src={
                            user.imagePath
                              ? `https://upskilling-egypt.com:443/` +
                                user?.imagePath
                              : avatar
                          }
                          alt=""
                        />
                      </th>
                      <th>{user.phoneNumber}</th>
                      <th>{user.email}</th>
                      <td>
                        <i
                          onClick={() => showUserDetailsModal(user)}
                          class="fa-regular fa-eye text-success p-1 fa-1x"
                        ></i>
                        <i
                          onClick={() => showDeleteModel(user.id)}
                          className="fa fa-trash  text-danger py-1 fa-1x"
                        ></i>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <nodata />
        )}
      </div>
    </>
  );
}
