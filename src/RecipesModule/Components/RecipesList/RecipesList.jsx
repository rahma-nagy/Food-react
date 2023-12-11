import React, { useEffect, useState } from "react";
import Header from "../../../SharedModules/Components/Header/Header.jsx";
import NoData from "../../../SharedModules/Components/NoData/NoData.jsx";
import axios from "axios";
import noData from "../../../assets/imgs/nodata.png";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";

export default function RecipesList() {
  const [RecipesList, setRecipesList] = useState([]);
  const [modalState, setModalState] = useState("close");
  const [itemId, setItemId] = useState(0);
  const [pagesArray, setPagesArray] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [selectedTagId, setSelectedTagId] = useState(0);
  const [selectedCatId, setSelectedCatId] = useState(0);
  const { baseUrl ,requstHeaders } = useContext(AuthContext);
  const [recipeDetails,setRecipeDetails] =useState([]);
  const [recipe, setRecipe] = useState();
  const [tagsList, setTagsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const handleClose = () => setModalState("close");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data["name"]);
    formData.append("price", data["price"]);
    formData.append("description", data["description"]);
    formData.append("tagId", data["tagId"]);
    formData.append("categoriesIds", data["categoriesIds"]);
    formData.append("recipeImage", data["recipeImage"][0]);
    return formData;
  };
  const addRecipe = (data) => {
    const addFormData = appendToFormData(data);
    axios
      .post(`${baseUrl}/Recipe/`, addFormData, {
        headers: requstHeaders,
      })
      .then((response) => {
        toast.success("added successsfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        handleClose();
        getAllRecipes();
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
  const showViewModal = (id) => {
    setItemId(id);
    setModalState("view-modal");
    getRecipeDetails(id)
  };
 
  const getAllTags = () => {
    axios
      .get(`${baseUrl}/tag/`, {
        headers: requstHeaders,
      })
      .then((response) => {
        setTagsList(response.data);
      })
      .catch((error) => console.log(error));
  };
  const getAllCategories = () => {
    axios
      .get(
        `${baseUrl}/Category/?pageSize=20&pageNumber=1`,
        {
          headers:requstHeaders,
        }
      )
      .then((response) => {
        setCategoriesList(response.data.data);
      })
      .catch((error) => console.log(error));
  };
 
  const getAllRecipes = (pageNo, name, tagId, categoryId) => {
    axios
      .get(`${baseUrl}/Recipe/`, {
        headers:requstHeaders,
        params: {
          pageSize: 5,
          pageNumber: pageNo,
          name: name,
          tagId: tagId,
          categoryId: categoryId,
        },
      })
      .then((response) => {
        setPagesArray(
          Array(response?.data?.totalNumberOfPages)
            .fill()
            .map((_, i) => i + 1)
        );
        setRecipesList(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRecipeDetails = (id) => {
    axios
      .get(`${baseUrl}/Recipe/${id}`, {
        headers:requstHeaders,
       
      })
      .then((response) => {
     
        setRecipeDetails(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addToFav =()=>{
   axios.post(`${baseUrl}/userRecipe/,{
    "recipeId": itemId,
   },{
    headers:requstHeaders
   }`)
   .then((response) => {
     
    setRecipeDetails(response?.data);
  })
  .catch((error) => {
    console.log(error);
  });
  }

  const getNameValue = (input) => {
    setSearchString(input.target.value);
    getAllRecipes(1, input.target.value, selectedTagId, selectedCatId);
  };

  const getTagValue = (select) => {
    setSelectedTagId(select.target.value);
    getAllRecipes(1, searchString, select.target.value, selectedCatId);
  };
  const getCategoryValue = (select) => {
    setSelectedCatId(select.target.value);
    getAllRecipes(1, searchString, selectedTagId, select.target.value);
  };

  useEffect(() => {
    getAllCategories();
    getAllTags();
    getAllRecipes(1);
  }, []);
  return (
    <>
      <ToastContainer />
      <Modal show={modalState === "view-modal"} onHide={handleClose}>
        <Modal.Body>
          <div className="text-center">
          {recipeDetails.imagePath?  <img
              className="img-fluid w-25 rounded-3"
                   src={
                   `https://upskilling-egypt.com/` +
                    recipeDetails.imagePath
                   }
                  alt=""
            /> : <img className="img-fluid" src={noData} alt="" />}


            <p>Description: {recipeDetails.description}</p>
           
          </div>
        </Modal.Body>
      </Modal>

      <Header
        title={"Recipes Items"}
        paragraph={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />

      <div className="row  mx-4 p-3">
        <div>
          <div>
            <h6>Recipes Table Details</h6>
            <span className="text-muted">You can check all details</span>
          </div>
        </div>

        <div>
          <div className="row  my-2">
            <div className="col-md-4">
              <input
                onChange={getNameValue}
                placeholder="search by recipe name..."
                className="form-control"
                type="text"
              />
            </div>
            <div className="col-md-4">
              <select onChange={getTagValue} className="form-select">
                <option value="" className="text-muted">
                  search by tag
                </option>
                {tagsList?.map((tag) => (
                  <option value={tag.id}>{tag.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select onChange={getCategoryValue} className="form-select">
                <option value="" className="text-muted">
                  search by category
                </option>

                {categoriesList?.map((cat) => (
                  <option value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          {RecipesList.length > 0 ? (
            <div>
              <div className="table-responsive">
                <table className="table  table-striped my-2">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Recipe Name</th>
                      <th scope="col">Image</th>
                      <th scope="col">Price</th>
                      <th scope="col">Description</th>
                      <th scope="col">Category</th>
                      <th scope="col">Tag</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RecipesList.map((recipe, index) => (
                      <tr key={recipe.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{recipe.name}</td>

                        <td>
                          <div className="img-container">
                            {recipe.imagePath ? (
                              <img
                                className="img-fluid w-25 rounded-3"
                                src={
                                  `https://upskilling-egypt.com/` +
                                  recipe.imagePath
                                }
                                alt=""
                              />
                            ) : (
                              <img className="img-fluid" src={noData} alt="" />
                            )}
                          </div>
                        </td>

                        <td>{recipe.price}</td>
                        <td>{recipe.description}</td>
                        <td>{recipe.category[0]?.name}</td>
                        <td>{recipe.tag.name}</td>

                        <td>
                          {/* <i
                            onClick={() => showUpdateModal(recipe)}
                            className="fa fa-edit text-warning   mx-2"
                          ></i> */}
                         <i class="fa-solid fa-heart " onClick={addToFav}></i>
                          <i
                            onClick={() => showViewModal(recipe.id)}
                            className="fa fa-eye mx-2 "
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <nav className="d-flex justify-content-center" aria-label="...">
                <ul className="pagination pagination-sm">
                  {pagesArray.map((pageNo) => (
                    <li
                      key={pageNo}
                      onClick={() => getAllRecipes(pageNo, searchString)}
                      className="page-item"
                    >
                      <a className="page-link">{pageNo}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </>
  );
}