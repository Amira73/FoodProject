import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from 'react-router-dom';
import sidebar_logo from '../../../assets/images/3.png'
import { useState } from 'react';




export default function SideBar({ isCollapsed, toggleCollapse }) {
      
 
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
    <MenuItem  className='m-2 sidebar-item '  icon={ <i className="fa-solid fa-right-from-bracket"></i>} component={<Link to="/dashboard" />}>Logout</MenuItem>

  </Menu>
</Sidebar>
</div>
    </>
  )
}
