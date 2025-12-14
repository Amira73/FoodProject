import React from 'react'
import Header from '../../Shared/Components/Header/Header'
import headerImg from '../../assets/images/header.png'

export default function Dashboard() {
  return (
  <>
  <Header title="Welcome Upskilling" description="This is a welcoming screen for the entry of the application , you can now see the options" imgUrl={headerImg}/>
  <h1>DashBoard</h1>
  </>
  )
}
