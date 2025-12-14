import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 




// Layouts
import AuthLayout from "./Shared/Components/AuthLayout/AuthLayout.jsx";
import NotFound from "./Shared/Components/NotFound/NotFound.jsx";
import MasterLayout from "./Shared/Components/MasterLayout/MaserLayout.jsx";

// Pages (Auth)

import Login from "./AuthModule/Components/Login/Login.jsx";
import Register from "./AuthModule/Components/Register/Register.jsx";
import ForgetPassword from "./AuthModule/Components/ForgetPassword/ForgetPassword.jsx";
import ChangePassword from "./AuthModule/Components/ChangePassword/ChangePassword.jsx";
import ResetPassword from "./AuthModule/Components/ResetPassword/ResetPassword.jsx";
import VerifyAccount from "./AuthModule/Components/VerifyAccount/VerifyAccount.jsx";

// Pages (Dashboard)
import DashBoard from "./DashboardModule/Components/Dashboard.jsx";

import RecipieData from "./RecipieModule/Components/RecipieData/RecipieData.jsx";
import RecipiesList from "./RecipieModule/Components/RecipiesList/REcipiesList.jsx";
import CategoryData from "./CategoriesModule/Components/CategoryData/CategoryData.jsx";
import CategoriesList from "./CategoriesModule/Components/CategoriesList/CategoriesList.jsx";
import UsersList from "./UsersModule/Components/UsersList/UsersList.jsx";



const routes = createBrowserRouter([
  {
    path: "",
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forget-pass", element: <ForgetPassword /> },
      { path: "reset-pass", element: <ResetPassword /> },
       { path: "change-pass", element: <ChangePassword /> },
      { path: "vertify-account", element: <VerifyAccount/> },
    ],
  },
  {
    path: "dashboard",
    element: <MasterLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <DashBoard /> },
  
      { path: "recipie-data", element: <RecipieData /> },
      { path: "recipies-list", element: <RecipiesList /> },
      { path: "category-data", element: <CategoryData /> },
      { path: "categories-list", element: <CategoriesList/> },
      { path: "users", element: <UsersList /> },
    ],
  },
]);

function App() {
 return (
    <>
      
      <RouterProvider router={routes} />
      <ToastContainer position="top-center" />
 
    </>
  );

}

export default App;
