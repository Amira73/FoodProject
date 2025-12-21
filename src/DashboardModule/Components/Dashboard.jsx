import React from 'react'
import Header from '../../Shared/Components/Header/Header'
import headerImg from '../../assets/images/header.png'
import { useAuth } from '../../Context/AuthContext'
import FillRecipies from '../../Shared/Components/FillRecipies/FillRecipies'

export default function Dashboard() {
  const { savaLoginData , loginData, isAuthenticated} = useAuth()
  return (
  <>
  <Header title= {`Hello, ${loginData?.userName} 👋`} description="This is a welcoming screen for the entry of the application , you can now see the options" imgUrl={headerImg}/>
  <h1>DashBoard</h1>
  <FillRecipies title="Add" />
  </>
  )
}
