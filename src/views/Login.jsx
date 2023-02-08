import axiosRequest from "../services/axiosRequest"
import { useState } from 'react'
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { LogUser } from "../services/api";
// Formulaire de connexion
// ---- Champs de connexion : email & password
// ---- Affichage des erreurs : champ manquant, utilisateur inexistant ou mauvais mot de passe

const Login = () => {
//   const [response, setResponse] = useState()
//   const { register, formState: { errors }, handleSubmit } = useForm();
  
  const onSubmit = e => {
     e.preventDefault(); 
     
    const data = new FormData(e.target) 
    const user = { email : data.get('email'), password : data.get('password') }
    console.log(user)
    LogUser(user); 
  }

  return (
    <div className="ui text container">
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
                    // {...register("singleErrorInput", {
                    //   required: "This is required",
                    // })}
                    type="text"
                    name="email"
                    placeholder="Adresse mail"
                  />
                  {/* <ErrorMessage errors={errors} name="singleErrorInput" /> */}

                
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
