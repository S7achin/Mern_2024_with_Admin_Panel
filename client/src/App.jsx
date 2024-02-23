import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import { Service } from "./pages/Service";
import Navbar from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { Error } from "./pages/Error";
import { Logout } from "./pages/Logout";
import { AdminLayouts } from "./components/layouts/Admin-Layouts";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminServices } from "./pages/Admin-Services";
import { AdminUpdate } from "./pages/Admin-Update";
import { AdminAddService } from "./pages/Admin-Add-Service";

const App = ()=>{
  return(
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/service" element={<Service/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/logout" element={<Logout/>} />
          <Route path="*" element={<Error/>} />

          <Route path="/admin" element={<AdminLayouts/>}>
            <Route path="users" element={<AdminUsers/>}/>
            <Route path="users/:id/edit" element={<AdminUpdate/>}/>
            <Route path="contacts" element={<AdminContacts/>}/>
            <Route path="services" element={<AdminServices/>}/>
            <Route path="services/AddService" element={<AdminAddService/>}/>
          </Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;