import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(false);
    const getAuthState = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/auth/is-auth', {})
            console.log(data);
            
            if(data.success){
                setIsLoggedIn(true);
                getUserData();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "something went wrong while loading user data pls login again");
        }
    }

    useEffect(() => {
        getAuthState();
    }, [])

    const getUserData = async () => {
        
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/user/data', {});
            console.log(data);
            data.success ? setUserData(data.userData) : toast.error(data.message);
        } catch (error) {
           toast.error(error.response?.data?.message || error.message || "Something went wrong") 
           console.error(error.response?.data?.message || error.message || "Something went wrong") 
        }
    }

    const value = {
        backendUrl,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        getUserData

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}