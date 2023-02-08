import { Navigate } from 'react-router-dom'


const PrivateRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children ? children : <Outlet />
}

export default PrivateRoute