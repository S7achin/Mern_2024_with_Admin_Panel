import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

export const AdminServices = () => {

  const [services, setServices] = useState([]);

    const {authorizationToken, API} = useAuth();

    const getAllServices = async ()=>{
        try {
            const response = await fetch(`${API}/api/admin/services`,{
                method: "GET",
                headers:{
                    "Authorization": authorizationToken,
                },
            })
            const servicesData = await response.json()
            // console.log("Getting all Services data ",servicesData);

            if(response.ok){
              setServices(servicesData);
            }else{
              toast.error(servicesData.message)
            }
        } 
        catch (error) {
            console.log(error);
        }
        
    }

    const deleteService = async (id)=>{
      console.log(`delete service called with id : ${id}`);
        try {
                const response = await fetch(`${API}/api/admin/services/delete/${id}`,{
                method: "DELETE",
                headers:{
                    "Authorization": authorizationToken,
                },
                })

                const msg = await response.json()
                if(response.ok){
                  getAllServices();
                  console.log(msg);
                }
                else{
                  toast.error(msg);
                }

            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
      getAllServices();
    },[]);

  return (
    <section className="admin-users-section">
            <div className="container flex">
                <h1>Admin Services Data</h1>
                <NavLink to="/admin/services/AddService"><button className='addService'>Add Service</button></NavLink>
            </div>
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Provider</th>
                            <th>Price</th>
                            <th>Service</th>
                            <th>Description</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      services.map((curService, index)=>{
                            const {_id,provider,price,service,description} = curService;
                            return(
                                <tr key={index}>
                                    <td>{provider}</td>
                                    <td className='email'>{price}</td>
                                    <td>{service}</td>
                                    <td>{description}</td>
                                    
                                    <td><button className='red' onClick={()=> deleteService(_id)}>Delete</button></td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        </section>

  )
}
