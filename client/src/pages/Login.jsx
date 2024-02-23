import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';


export const Login = () => {
  
  const [user,setUser] = useState({
    email:"",
    password:""
  });

  const navigate = useNavigate();
  const {storeTokenInLS, API} = useAuth();
  const URL = `${API}/api/auth/login`;

  const handleInput = (e)=>{
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]:value
    })
  }


  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      // console.log(user);
      const response = await fetch(URL,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
      });

      // console.log(response);
      const res_data = await response.json();
      // console.log(res_data);

      if(response.ok){
        setUser({email:"",  password:""});
        toast.success("Login Successfull");
        storeTokenInLS(res_data.token);
        // localStorage.setItem("token",res_data.token);
        // console.log("Login Successfull");
        navigate("/");
      }
      else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }

    } catch (error) {
      console.log("Login Error from Frontend",error);
    }
  }

  return (
    <>
        <section>
        <main>
          <div className="section-registration">
            <div className="grid container grid-two-cols">

              <div className="registration-image">
                <img src="/images/login.png" alt="Login Form" width="330" height="330" />
              </div>

              <div className="registration-form">
                <h1 className="main-heading mb-3">Login Form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      placeholder="Enter Your Email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input 
                      type="password" 
                      name="password" 
                      id="password" 
                      placeholder="Password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>

                  <br />
                  <button type="submit" className="btn btn-submit">Login</button>
                </form>

              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

