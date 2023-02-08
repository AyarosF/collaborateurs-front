import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import NavHeader from '@comp/NavHeader'
import PrivateRoute from '@comp/PrivateRoute'
import Home from '@page/Home'
import List from '@page/List'
import CreateUser from '@page/CreateUser'
import Login from '@page/Login'
import Profile from '@page/Profile'

function App() {
  const user = false

  return (
    <Router>
      <NavHeader />
      <Routes>
          <Route exact path="" element={
            <PrivateRoute user={user}>
              <Home />
            </PrivateRoute>} />
          <Route path="collaborateurs" element={<List />} />
          <Route path="add" element={<CreateUser />} />
          <Route path="edit/:id" element={<Profile />} />
          <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
