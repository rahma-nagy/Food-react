import { useContext, useEffect, useState } from "react";
import "./App.css";
import Home from "./HomeModule/Components/Home/Home";
import Login from "./AuthModule/Components/Login/Login";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Masterlayout from "./SharedModules/Components/Masterlayout/Masterlayout";
import NotFound from "./SharedModules/Components/NotFound/NotFound";
import RecipesList from "./RecipesModule/Components/RecipesList/RecipesList";
import Authlayout from "./SharedModules/Components/Authlayout/Authlayout";
import ForgetPassword from "./AuthModule/Components/ForgetPassword/ForgetPassword";
import RequestResetPassword from "./AuthModule/Components/RequestResetPassword/RequestResetPassword";
import ResetPassword from "./AuthModule/Components/ResetPassword/ResetPassword";
import { ToastContainer } from "react-toastify";
// import Favorites from "./RecipesModule/Components/Favorites/Favorites";
import { AuthContext } from "./context/AuthContext";
import Favorites from "./RecipesModule/Components/Favorites/Favorites";
import Register from "./AuthModule/Components/Register/Register";

function App() {
  let { userData, setUserData } = useContext(AuthContext);
  const routes = createBrowserRouter([
    {
      path: "/dashboard",
      element: <Masterlayout userData={userData} />,

      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "favorites", element: <Favorites /> },
      ],
    },
    {
      path: "",
      element: <Authlayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login setUserData={setUserData} /> },
        { path: "/login", element: <Login setUserData={setUserData} /> },
        { path: "/forgetPassword", element: <ForgetPassword /> },
        { path: "/RequestResetPassword", element: <RequestResetPassword /> },
        { path: "/ResetPassword", element: <ResetPassword /> },
        { path: "/Register", element: <Register/> },

      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;

// element: <ProtectedRoute userData={userData}> <Masterlayout userData={userData} />  </ProtectedRoute>,
