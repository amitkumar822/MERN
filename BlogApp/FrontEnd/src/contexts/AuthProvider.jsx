import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [blogs, setBlogs] = useState();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get('/api/blogs/get-all-blogs')
                setBlogs(data.blogs)
            } catch (error) {
                console.log("AuthBlogs error: " + error.message);
            }
        }
        fetchBlogs();
    }, [setBlogs])
    
  return (
    <AuthContext.Provider value={{blogs}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)