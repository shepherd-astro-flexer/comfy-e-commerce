import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const {isAuthenticated, loginWithRedirect, logout, user, isLoading} = useAuth0()

  const [myUser, setMyUser] = useState(null)

  useEffect(() => {
    // We run this effect each rerender and every time the value of isAuthenticated changes
    setMyUser(isAuthenticated ? user : null)
  }, [isAuthenticated])

  return (
    <UserContext.Provider value={{loginWithRedirect, logout, myUser, isAuthenticated}}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
