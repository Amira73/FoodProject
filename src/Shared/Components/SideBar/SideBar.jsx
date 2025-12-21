import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from 'react-router-dom';
import sidebar_logo from '../../../assets/images/3.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";




export default function SideBar({ isCollapsed, toggleCollapse }) {
  const navigate = useNavigate();

const handleLogout = async () => {
  const result = await Swal.fire({
    title: "Logout?",
    text: "Are you sure you want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, logout",
    cancelButtonText: "Cancel",
    customClass: {
    confirmButton: "swal-confirm-btn",
    cancelButton: "swal-cancel-btn",
  },
  buttonsStyling: false,
  });

  if (result.isConfirmed) {
    localStorage.removeItem("token");
   // localStorage.removeItem("loginData");
   
    // setIsAuthenticated(false); 
    // savaLoginData();

   await Swal.fire({
    title: "Logged out",
    icon: "success",
    confirmButtonText: "OK",
    customClass: {
      confirmButton: "swal-confirm-btn",
    },
    buttonsStyling: false,
  });

  navigate("/login", { replace: true });
  }
};
      
 
  return (
    <>
    <div className="sidebar-container">
    <Sidebar className='fixed'
     width="100%" 
     collapsedWidth="80px"
      collapsed={isCollapsed}>

      <div className="img-container text-center">
        <img className='img-fluid' src={sidebar_logo} alt="sidebar_logo " onClick={toggleCollapse}></img>

      </div>
  <Menu>
   
    <MenuItem className='m-2 sidebar-item ' icon={<i className="fa-regular fa-house"></i>} component={<Link to="/dashboard" />}> Home</MenuItem>
    <MenuItem  className='m-2 sidebar-item ' icon={<i className="fa-regular fa-bookmark"></i>} component={<Link to="/dashboard/users" />}> Users</MenuItem>
    <MenuItem  className='m-2 sidebar-item '  icon={  <i className="fa-solid fa-table-cells"></i>} component={<Link to="/dashboard/recipies-list" />}>Recipies</MenuItem>
        <MenuItem  className='m-2 sidebar-item '  icon={ <i className="fa-regular fa-calendar-days"></i>} component={<Link to="/dashboard/categories-list" />}>Categories</MenuItem>

    <MenuItem  className='m-2 sidebar-item '  icon={  <i className="fa-solid fa-lock"></i>} component={<Link to="/change-password" />}>Change Passoword</MenuItem>
    <MenuItem onClick={handleLogout} className='m-2 sidebar-item '  icon={ <i className="fa-solid fa-right-from-bracket"></i>} component={<Link to="/dashboard" />}>Logout</MenuItem>

  </Menu>
</Sidebar>
</div>
    </>
  )
}
