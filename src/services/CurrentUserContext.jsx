import { React, useState, createContext, useContext } from "react"
import axiosRequest from "./axiosRequest"

export const CurrentUserContext = createContext()

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [isLoading, setLoading] = useState(true)

    const fetchCurrentUser = async () => {
        const currentId = localStorage.getItem("id")
        try {
            const res = await axiosRequest.get(`/users/${currentId}`)
            setCurrentUser(res.data.user)
            setLoading(false)
          }
          catch(err) {
            console.log(err)
          }
    }

    return (
        <CurrentUserContext.Provider value={{ isLoading, currentUser, fetchCurrentUser }}>
          { children }
        </CurrentUserContext.Provider>
    )
}

export const useCurrentUser = () => useContext(CurrentUserContext)
