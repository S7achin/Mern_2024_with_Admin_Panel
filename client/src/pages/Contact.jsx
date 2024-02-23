import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Contact = () => {
  
  const [contact,setContact] = useState({
    username:"",
    email:"",
    message:""
  });

  const {user} = useAuth();
  const [userData, setUserData] = useState(true);


  if(userData && user){
    setContact({
      username:user.username,
      email:user.email,
      message:""
    });

    setUserData(false);
  }

  const handleInput = (e)=>{
    let name = e.target.name;
    let value = e.target.value;

    setContact({
      ...contact,
      [name]:value
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      // console.log(user);
      const response = await fetch(`http://localhost:5000/api/form/contact`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(contact)
      });
      
      if(response.ok){
        const res_data = await response.json();
        // console.log(res_data);
        toast.success(res_data.message);
        setContact({
          ...contact,
          message:""
        });
      }
      
  } catch (error) {
    console.log("Contact Error from Frontend ",error);
  }
    // console.log(contact);
  }


  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="grid container grid-two-cols">

              <div className="registration-image card-img">
                <img src="/images/contact.png" alt="Registration Form" width="390" height="390" />
              </div>

              <div className="registration-form">
                <h1 className="main-heading mb-3">Contact Form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input 
                      type="text" 
                      name="username" 
                      id="username" 
                      placeholder="username"
                      required
                      autoComplete="off"
                      value={contact.username}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      placeholder="enter your email"
                      required
                      autoComplete="off"
                      value={contact.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="message">message</label>
                    <textarea 
                      type="text" 
                      rows="3"
                      name="message" 
                      id="message" 
                      placeholder="message"
                      required
                      autoComplete="off"
                      value={contact.message}
                      onChange={handleInput}
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">Submit</button>
                </form>

              </div>
            </div>
          </div>
        </main>

        <section className="mb-3">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.1469931707547!2d75.8696201751541!3d22.685571279411455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fdaa764cd043%3A0x94555546f45a3ec9!2sGAMMASTACK%20-%20Fantasy%20Sports%2C%20Sports%20Betting%20Software%20Development%20Company!5e0!3m2!1sen!2sin!4v1707226361703!5m2!1sen!2sin" 
          width="100%" 
          height="450" 
          allowFullScreen 
          loading="lazy" 
          // referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  )
}

export default Contact
