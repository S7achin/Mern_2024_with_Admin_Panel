import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
// import { useEffect } from "react";

const About = () => {

    const {user,isLoggedIn} = useAuth();

  return (
    <>
      <section>
                <main>
                    <div className="section-hero">
                        <div className="container grid grid-two-cols">
                            <div className="hero-content about-content">
                                <p>Welcome, {isLoggedIn ? `${user.username} to our website` : "to our website"}</p>
                                    
                                <h1>Why Choose Us?</h1>
                                <p>Expertise: our team consists of experienced IT professionals who are up-to-date with the latest industry trends. </p>
                                <p>Customization: we understand that every business is unique. Thats why we create solutions that are tailored to your specific needs and goals. </p>
                                <p>Customer-Centric Approach: we prioritize your satisfaction and provide top-notch support to address your IT concerns.</p>
                                <p>Affortability: we offer compative pricing without compromising on the quality of our service. </p>
                                <p>Reliability: count on us to be there when you need us. We're committed to ensuring your IT environment reliable and available 24/7.  </p>
                                <div className="btn btn-group">
                                    <NavLink to="/contact"><button className="btn">connect now</button></NavLink>
                                </div>
                                <div className="btn btn-group">
                                    <NavLink to="/service"><button className="btn secondary-btn">learn more</button></NavLink>
                                </div>
                            </div>

                            {/* Hero Images */}
                            <div className="about-image hero-image">
                                <img src="/images/img-4.png" alt="About Image" width="80" height="80" />
                            </div>

                        </div>
                    </div>
                </main>
            </section>

      {/* Section 2 */}
      <section className="section-analytics about">
                <div className="container grid grid-four-cols">
                    <div className="div-1">
                        <h2>50+</h2>
                        <p>Company registers</p>
                    </div>
                    <div className="div-1">
                        <h2>150+</h2>
                        <p>projects done</p>
                    </div>
                    <div className="div-1">
                        <h2>250+</h2>
                        <p>Happy Clients</p>
                    </div>
                    <div className="div-1">
                        <h2>650K+</h2>
                        <p>Youtube Subscribers</p>
                    </div>
                </div>
            </section>
    </>
  )
}

export default About
