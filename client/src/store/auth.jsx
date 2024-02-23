import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{

    const API = import.meta.env.VITE_APP_SERVER_URI;
    // console.log(API);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);
    const authorizationToken = `Bearer ${token}`;

    const storeTokenInLS = (serverToken)=>{
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    }

    let isLoggedIn = !!token;

    // Takle logout
    const logoutUser = ()=>{
        setToken("");
        setUser("");
        return localStorage.removeItem("token");
    }

    // JWT AUTHENTICATION - getting currently loggedIN user data
    const userAuthentication = async()=>{
        try {
            setIsLoading(true);
            const response = await fetch(`${API}/api/auth/user`,{
            method:"GET",
            headers:{
                "Authorization": authorizationToken,
            },
        });
        
            if(response.ok){
                const data = await response.json()
                // console.log("data of user ",data.userData);
                setUser(data.userData);
                setIsLoading(false);
                // console.log("Taking time in setting data",user);
            }
            else{
                setIsLoading(false);
                console.log("User is not logged in!!!");
            }
        } catch (error) {
            console.log("Error in fetching user data " , error);
        }
    }


    // To get Services Data by API
    const getServices = async()=>{
        try {
          const response = await fetch(`${API}/api/data/service`,{ method: "GET" });
    
          if(response.ok){
            const data = await response.json();
            // console.log(data);
            setServices(data);
          }
        } 
        catch (error) {
          console.log("service frontend ",error);
        }
    }


    useEffect(()=>{
        getServices();
        userAuthentication();
    },[])
    
    return (
        <AuthContext.Provider value={{
                userAuthentication,
                storeTokenInLS,
                logoutUser,
                getServices,
                isLoggedIn,
                user,
                services,
                authorizationToken,
                isLoading,
                API
            }}>
            {children}
        </AuthContext.Provider>
    ); 
}

export const useAuth = ()=>{
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the Provider");
    }

    return authContextValue;
}
