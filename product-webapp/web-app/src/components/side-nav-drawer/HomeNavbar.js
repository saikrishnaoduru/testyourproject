import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { Link } from 'react-router-dom'

function HomeNavbar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light" style={{'background':'#CC99FF'}}>
    <div className="container-fluid text-center">
    <div className="navbar-brand m-auto" >SpotYourVaccine</div>    
  </div>
</nav>

    </>
  )
}
export default HomeNavbar;