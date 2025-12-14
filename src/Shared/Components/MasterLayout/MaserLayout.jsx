import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from "../SideBar/SideBar";
import NavBar from '../NavBar/NavBar'
import Header from '../Header/Header';
import { useState } from 'react';

export default function MaserLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);

  return (

   <div className="d-flex vh-100">
      <div style={{ width:   isCollapsed ? "80px" : "18%" }}>
        <SideBar isCollapsed={isCollapsed} toggleCollapse={() => setIsCollapsed(v => !v)} />
      </div>

      <div className="flex-grow-1">
        <NavBar toggleSidebar={() => setIsCollapsed(v => !v)} />
        <Outlet />
      </div>
    </div>
  )
}
