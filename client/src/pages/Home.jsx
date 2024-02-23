import { useEffect } from "react";
import { NavLink } from "react-router-dom"
import { useAuth } from "../store/auth";
const Home = () => {

    const {userAuthentication} = useAuth();

    useEffect(()=>{
        userAuthentication();
      },[]);
    
    return (
        <>
            <section>
                <main>
                    <div className="section-hero">
                        <div className="container grid grid-two-cols">
                            <div className="hero-content">
                                <p>We are the World Best IT Company</p>
                                <h1>Welcome to Sachin Mern Development</h1>
                                <p>Are you ready to take your business to the next level with cutting-edge IT solutions? Look no further! At Sachin Mern Development, We specialize in providing innovative IT services and solutions tailored to meet your unique needs.</p>
                                <div className="btn btn-group">
                                    <NavLink to="/contact"><button className="btn">connect now</button></NavLink>
                                </div>
                                <div className="btn btn-group">
                                    <NavLink to="/service"><button className="btn secondary-btn">learn more</button></NavLink>
                                </div>
                            </div>

                            {/* Hero Images */}
                            <div className="hero-image">
                                <img src="/images/img-2.png" alt="Home Image" width="80" height="80" />
                            </div>

                        </div>
                    </div>
                </main>
            </section>

            {/* Section 2  */}
            <section className="section-analytics">
                <div className="container grid grid-four-cols">
                    <div className="div-1">
                        <h2>50+</h2>
                        <p>registered companies</p>
                    </div>
                    <div className="div-1">
                        <h2>100,00+</h2>
                        <p>Happy Clients</p>
                    </div>
                    <div className="div-1">
                        <h2>500+</h2>
                        <p>Well known Developers</p>
                    </div>
                    <div className="div-1">
                        <h2>24/7</h2>
                        <p>services</p>
                    </div>
                </div>
            </section>

            {/* section 3 */}
            <section>
                <main>
                    <div className="section-hero">
                        <div className="container grid grid-two-cols">

                            {/* Hero Images */}
                            <div className="hero-image">
                                <img src="/images/img-1.png" alt="Home Image" width="80" height="80" />
                            </div>

                            <div className="hero-content">
                                <p>We are here to help you</p>
                                <h1>Get Started Today</h1>
                                <p>Ready to take the first step towards a more efficient and secure IT Infrastructure? Contact us today for a free consultation and let's discuss how Sachin can help your business thrive in the digital age.</p>
                                <div className="btn btn-group">
                                    <NavLink to="/contact"><button className="btn">connect now</button></NavLink>
                                </div>
                                <div className="btn btn-group">
                                    <NavLink to="/service"><button className="btn secondary-btn mb-5">learn more</button></NavLink>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </section>

        </>
    )
}

export default Home;