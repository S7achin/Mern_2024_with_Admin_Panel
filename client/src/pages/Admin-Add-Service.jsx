import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../store/auth';

export const AdminAddService = () => {

    const navigate = useNavigate();

    const {authorizationToken, API} = useAuth();

    const [service, setService] = useState({
        provider:"",
        price:"",
        service:"",
        description:""
    });

    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
    
        setService({
          ...service,
          [name]:value
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            console.log(service);
            const response = await fetch(`${API}/api/admin/services/addservice`,{
              method:"POST",
              headers:{
                "Content-Type":"application/json",
                "Authorization": authorizationToken
              },
              body:JSON.stringify(service)
            });
            
            // console.log(response);
            const res_data = await response.json();
            console.log(res_data);
    
            if(response.ok){
                setService({provider:"",  price:"",  service:"",  description:""});
              toast.success(res_data.message);
              navigate("/admin/services");
            }
            else {
              toast.error(res_data.message);
            }
        } catch (error) {
          console.log("Service Adding Error from Frontend ",error);
        }
      }
    

  return (
    <div className="container registration-form admin-update-form">
                <h1 className="main-heading mb-3">Add Service</h1>
                <br />

                <form className="admin-form" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="provider">provider</label>
                    <input 
                      type="text" 
                      name="provider" 
                      id="provider" 
                      placeholder="Provider"
                      required
                      autoComplete="off"
                      value={service.provider}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="price">Price Range</label>
                    <input 
                      type="text" 
                      name="price" 
                      id="price" 
                      placeholder="Price"
                      required
                      autoComplete="off"
                      value={service.price}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="service">Service</label>
                    <input 
                      type="text" 
                      name="service" 
                      id="service" 
                      placeholder="Service"
                      required
                      autoComplete="off"
                      value={service.service}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="description">Description</label>
                    <input 
                      type="text" 
                      name="description" 
                      id="description" 
                      placeholder="description"
                      required
                      autoComplete="off"
                      value={service.description}
                      onChange={handleInput}
                    />
                  </div>

                  <br />
                  <button type="submit" className="btn btn-submit">Submit</button>
                </form>

    </div>
  )
}
