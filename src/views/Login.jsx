import axiosRequest from "../services/axiosRequest"
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import ErrorMessage from "@comp/ErrorMessage"

// Formulaire de connexion
// ---- Champs de connexion : email & password
// ---- Affichage des erreurs : champ manquant, utilisateur inexistant ou mauvais mot de passe

const Login = ({ user }) => {

  const [alert, setAlert] = useState(false)

  const navigate=useNavigate(); 
  
  const onSubmit = async (e) => {
     e.preventDefault(); 
    
    const data = new FormData(e.target) 
    const logUser = { email : data.get('email'), password : data.get('password') }

    try {
      const response = await axiosRequest.post('/login', logUser)
      const res = response.data
      localStorage.setItem("token", res.token)
      const getUser = await axiosRequest.get(`/users/${res.userId}`)
      localStorage.setItem('user', JSON.stringify(getUser.data.user))
      if(getUser.status === 200) {
        user(getUser.data.user)
        navigate('/')
      }
    }
    catch (error) {
      if (error.response) {
        console.log(error.response.data.message)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
      setAlert(error.response.data.message)
      console.log(error.config) 
    }
  }

  return (
    <div className="ui text container">
      {alert && (
        <ErrorMessage alert={alert} />
      )}
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <h2 className="ui teal image header">
            <div className="content">Connexion</div>
          </h2>
          <form onSubmit={onSubmit} className="ui large form">
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input
                    type="text"
                    name="email"
                    placeholder="Adresse mail"
                  />
                
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                  />
                </div>
              </div>
              <button className="ui fluid large teal button" type="submit">
                Connexion
              </button>
            </div>

            <div className="ui error message"></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
