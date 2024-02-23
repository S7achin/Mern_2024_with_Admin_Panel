import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


export const AdminUpdate = () => {

    const navigate = useNavigate();
    const {authorizationToken, API} = useAuth();
    const [data, setData] = useState({
        username:"",
        email:"",
        phone:"",
        isAdmin:""
    });

    const params = useParams();

    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
    
        setData({
          ...data,
          [name]:value
        })
        // console.log(data);
    }


    const getUserByParamsId = async ()=>{
        try {
            const response = await fetch(`${API}/api/admin/users/${params.id}`,{
                method: "GET",
                headers:{
                    "Authorization": authorizationToken,
                },
            })

            if(response.ok){
                const dataUser = await response.json()
                // console.log("Getting user data for updation",dataUser);
                setData(dataUser);
            }
        } 
        catch (error) {
            console.log(error);
        }
        
    }

    const updateUserByParamsId = async (e)=>{
        e.preventDefault(); 
        // console.log("sending updated data for updation",data);
        // console.log(JSON.stringify(data));
        try {
            const response = await fetch(`${API}/api/admin/users/update/${params.id}`,{
                method: "PATCH",
                headers:{
                    "Authorization": authorizationToken,
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(data)
            })

            if(response.ok){
              toast.success("Data Updated Successfully");
                navigate('/admin/users');
            }else{
              toast.error("Data Not Updated");
            }
        } 
        catch (error) {
            console.log(error);
        }
        
    }

    useEffect(()=>{
        getUserByParamsId();
    },[]);

  return (
    <>
      <div className="container registration-form admin-update-form">
                <h1 className="main-heading mb-3">Update User Data</h1>
                <br />

                <form className="admin-form" onSubmit={updateUserByParamsId}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input 
                      type="text" 
                      name="username" 
                      id="username" 
                      placeholder="Username"
                      required
                      autoComplete="off"
                      value={data.username}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      placeholder="Enter Your Email"
                      required
                      autoComplete="off"
                      value={data.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Mobile</label>
                    <input 
                      type="number" 
                      name="phone" 
                      id="phone" 
                      placeholder="Phone"
                      required
                      autoComplete="off"
                      value={data.phone}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="isAdmin">isAdmin</label>
                    <select 
                      name="isAdmin" 
                      id="isAdmin"
                      placeholder="isAdmin"
                      required
                      autoComplete="off"
                      value={data.isAdmin}
                      onChange={handleInput}
                      >
                      <option value="true">YES</option>
                      <option value="false">NO</option>
                    </select>
                    {/* <input 
                      type="text" 
                      name="isAdmin" 
                      id="isAdmin" 
                      placeholder="isAdmin"
                      required
                      autoComplete="off"
                      value={data.isAdmin}
                      onChange={handleInput}
                    /> */}
                  </div>

                  <br />
                  <button type="submit" className="btn btn-submit">Update</button>
                </form>

              </div>
    </>
  )
}


