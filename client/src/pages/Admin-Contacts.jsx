import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

export const AdminContacts = () => {

  const [contacts, setContacts] = useState([]);

    const {authorizationToken, API} = useAuth();

    const getAllContacts = async ()=>{
        try {
            const response = await fetch(`${API}/api/admin/contacts`,{
                method: "GET",
                headers:{
                    "Authorization": authorizationToken,
                },
            })
            const contactsData = await response.json()
            // console.log("Getting all contacts data ",contactsData);

            if(response.ok){
                setContacts(contactsData);
            }else{
              setContacts([]);
              toast.error(contactsData.message);
            }
        } 
        catch (error) {
            console.log(error);
        }
        
    }

    const deleteContact = async(id, messageId, length)=>{
        // console.log(`user id ${id}, message Id ${messageId}, message Length ${length}`);
        try {
            const response = await fetch(`${API}/api/admin/contacts/delete/${id}/${messageId}/${length}`,{
                method: "DELETE",
                headers:{
                    "Authorization": authorizationToken,
                },
            })

            const msg = await response.json()
            if(response.ok){
              toast.success("Message delete Successfully");
              console.log(msg);
              getAllContacts();
                
            }else{
              toast.error("Message not deleted");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
      getAllContacts();
    },[]);

  return (
      <section className="admin-contacts-section">
          <div className="container">
              <h1>Admin Contacts Data</h1>
          </div>

          <div className="container admin-contacts">
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Messages</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        contacts.map((curContact, index)=>{
                            const {_id,username,email} = curContact;
                            return(
                                <tr key={index}>
                                    <td>{username}</td>
                                    <td className='email'>{email}</td>
                                    <td>
                                      <table className='contact-messages'>
                                        <tbody>
                                        {
                                          curContact.messages.map((curMessage,index)=>{
                                            return(
                                              <tr key={index}>
                                                <td>{curMessage.message}</td>
                                                <td><button className='btn red' onClick={()=> deleteContact(_id,curMessage._id,curContact.messages.length)}>delete</button></td>
                                              </tr>
                                            )
                                          })
                                        }
                                        </tbody>
                                      </table>
                                    </td>
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
