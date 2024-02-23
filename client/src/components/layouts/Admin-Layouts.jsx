import React from 'react'
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { FaUser, FaHome, FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";

export const AdminLayouts = () => {

    const {user,isLoading} = useAuth();

    if(isLoading){
        return(
            <div className="container">
                <h1>Loading ...</h1>
            </div>
        )
    }

    if(!user.isAdmin){
        return(
            <>
            {/* {toast.error("Access Denied !!, User is not an Admin")}; */}
            <Navigate to="/"/>
        </>
        )
    }
  return (
    <>
        <header>
            {/* <div className="container"> */}
                <nav className='side-bar'>
                    <ul>
                        <li><NavLink to="/admin/users"><FaUser className="icon"/>users</NavLink></li>
                        <li><NavLink to="/admin/contacts"><FaMessage className="icon"/>contacts</NavLink></li>
                        <li><NavLink to="/admin/services"><FaRegListAlt className="icon"/>services</NavLink></li>
                        <li><NavLink to="/"><FaHome className="icon"/>Home</NavLink></li>
                    </ul>
                </nav>
            {/* </div> */}
        </header>
        <Outlet />
      </>
  );
}
