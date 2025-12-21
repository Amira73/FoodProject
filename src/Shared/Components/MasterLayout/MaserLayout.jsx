import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from "../SideBar/SideBar";
import NavBar from '../NavBar/NavBar'
import Header from '../Header/Header';
import { useState } from 'react';

export default function MaserLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const sidebarWidth = isCollapsed ? 80 : 300;

  return (

   <div style={{ minHeight: "100vh" }}>
      <div
    style={{
      width: sidebarWidth,
      transition: "width 0.3s",
      flexShrink: 0,
     
    }}
  >
        <SideBar 
        className="sidebar-container"
          style={{ "--sidebar-width": `${sidebarWidth}px` }}
          isCollapsed={isCollapsed}
           toggleCollapse={() => setIsCollapsed(v => !v)} />
      </div>

      <div  
      style={{
      marginLeft: sidebarWidth,          
      transition: "margin-left .3s",
      minHeight: "100vh",
    }}
      
      className="flex-grow-1 d-flex flex-column main-content">
        <NavBar toggleSidebar={() => setIsCollapsed(v => !v)} />
        <Outlet />
      </div>
    </div>
  )
}
