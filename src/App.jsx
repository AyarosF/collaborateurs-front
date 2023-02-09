import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { CurrentUserProvider } from './services/CurrentUserContext'
import NavHeader from '@comp/NavHeader'
import PrivateRoute from '@comp/PrivateRoute'
import Home from '@page/Home'
import List from '@page/List'
import CreateUser from '@page/CreateUser'
import Login from '@page/Login'
import Profile from '@page/Profile'

function App() {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")))

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('user')))
  }, [])

  const handleLoggedUser = (user) => {
    setCurrentUser(user)
  }
  return (
      <Router>
        <NavHeader user={ currentUser }/>
        <Routes>
            <Route exact path="" element={
              <PrivateRoute user={ currentUser }>
                <Home user = { currentUser }/>
              </PrivateRoute>} />
            <Route path="collaborateurs" element={<List user = { currentUser }/>} />
            <Route path="add" element={
              <PrivateRoute user={ currentUser }>
                <CreateUser />
              </PrivateRoute>} />
            <Route path="edit/:id" element={<Profile user={ currentUser } />}/>
            <Route path="login" element={<Login user = { handleLoggedUser }/>} />
        </Routes>
      </Router>
  )
}

export default App
