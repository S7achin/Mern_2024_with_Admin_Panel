import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify';

export const AdminUsers = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const {authorizationToken, user, API} = useAuth();

    const getAllUsersData = async ()=>{
        try {
            const response = await fetch(`${API}/api/admin/users`,{
                method: "GET",
                headers:{
                    "Authorization": authorizationToken,
                },
            })

            const data = await response.json()
            // console.log("Getting all users data ",data);
            
            if(response.ok){
                setUsers(data);
            }else{
                toast.error(data.message);
                navigate('/');
            }
        } 
        catch (error) {
            console.log(error);
        }
        
    }

    const deleteUser = async(id)=>{
        // console.log("delete user",id, " Admin Id",user._id);
        try {
            if(id != user._id){
                const response = await fetch(`${API}/api/admin/users/delete/${id}`,{
                method: "DELETE",
                headers:{
                    "Authorization": authorizationToken,
                },
                })

                if(response.ok){
                    getAllUsersData();
                    const msg = await response.json()
                    console.log(msg);
                }
            }
            else{
                toast.error("User cannot delete yourself!!")
            }

            
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(()=>{
        getAllUsersData();
    },[]);

  return (
    <>
        <section className="admin-users-section">
            <div className="container">
                <h1>Admin User Data</h1>
            </div>
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((curUser, index)=>{
                            const {_id,username,email,phone} = curUser;
                            return(
                                <tr key={index}>
                                    <td>{username}</td>
                                    <td className='email'>{email}</td>
                                    <td>{phone}</td>
                                    <td className='updateLink'><Link to={`/admin/users/${_id}/edit`}>Edit</Link></td>
                                    <td><button className='red' onClick={()=> deleteUser(_id)}>Delete</button></td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        </section>


        
    </>
  )
}
