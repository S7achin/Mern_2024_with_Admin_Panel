import { useEffect } from 'react';
import { useAuth } from '../store/auth'

export const Service = () => {
  const { services , getServices} = useAuth();
  // console.log(services);

  useEffect(()=>{
    getServices();
  },[]);

  return (
    <section className='section-services'>
      <div className="container">
        <h1 className='main-heading'>Services</h1>
      </div>

      <div className="container grid grid-three-cols">

        {
          services.map((curElem, index) => {
            const {service,description,price,provider } = curElem;
            return (
              <div className="card" key={index}>
                <div className="card-img">
                  <img src="/images/services.png" alt="card image" width="150" />
                </div>
                <div className="card-details">
                  <div className="grid grid-two-cols">
                    <p>{provider}</p>
                    <p>{price}</p>
                  </div>
                  <h2>{service}</h2>
                  <p>{description}</p>
                </div>
              </div>
            );
          })
        }

      </div>
       
    </section>
  )
}
