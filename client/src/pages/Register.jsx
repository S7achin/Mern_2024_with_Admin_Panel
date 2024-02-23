import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Register = () => {

  const [user,setUser] = useState({
    username:"",
    email:"",
    phone:"",
    password:""
  });

  const navigate = useNavigate();
  const {storeTokenInLS, API} = useAuth();

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
        console.log(user);
        const response = await fetch(`${API}/api/auth/register`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(user)
        });
        
        // console.log(response);
        const res_data = await response.json()
        console.log(res_data);

        if(response.ok){
          setUser({username:"",  email:"",  phone:"",  password:""});
          toast.success("Registration Succesfull");
          storeTokenInLS(res_data.token);
          // localStorage.setItem("token",res_data.token);
          // console.log("Registration Succesfull");
          navigate("/");
        }
        else {
          toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
          if(!res_data.extraDetails){
            navigate("/login");
          }
        // else if(response.status == 401){
        //   alert("Email already Exist, please login!!");
        // }
        // else{
        //   alert(res_data.extraDetails);
        // }
        }
    } catch (error) {
      console.log("Register Error from Frontend ",error);
    }
  }

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="grid container grid-two-cols">

              <div className="registration-image">
                <img src="/images/signup5.png" alt="Registration Form" width="450" height="400" />
              </div>

              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input 
                      type="text" 
                      name="username" 
                      id="username" 
                      placeholder="Username"
                      required
                      autoComplete="off"
                      value={user.username}
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
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">phone</label>
                    <input 
                      type="number" 
                      name="phone" 
                      id="phone" 
                      placeholder="Phone"
                      required
                      autoComplete="off"
                      value={user.phone}
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
                  <button type="submit" className="btn btn-submit">Register Now</button>
                </form>

              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}
