// Affichage formulaire d'édition
// ---- Édition du profil par l'utilisateur
// ---- Variante si édité par l'admin
import { useState, useEffect } from 'react'
import { UserForm } from '@comp/UserForm'
import { Container, Header } from 'semantic-ui-react'
import axiosRequest from '../services/axiosRequest'
import { useParams, useNavigate } from 'react-router-dom'
import { formatDate } from '../services/utils'
import ErrorMessage from "@comp/ErrorMessage"

const FormHeader = () => (
  <Header as='h1' textAlign="center">
    Modifier le profil
  </Header>
)


const Profile = ({ user }) => {

  const [userToEdit, setUserToEdit] = useState()
  const [alert, setAlert] = useState(false)
  
  let userId = useParams();
  

  useEffect(() => {
    const getUserToModify = async (id) => {
      try {
        await axiosRequest
          .get(`/users/${id}`)
          .then((res) => res.data.user)
          .then((userToEdit) => {
            setUserToEdit({...userToEdit, birthdate: formatDate(userToEdit.birthdate)})
          })
      } catch (error) {
        setAlert(error.response.data.message)
        console.log(error);
      }
    };
    getUserToModify(userId.id)
  }, [])


  
  return (
    <div>
      <Container>        
        {alert && (
          <ErrorMessage alert={alert} />
        )}
        <FormHeader />
        {userToEdit && <UserForm methode="edit" userData={ userToEdit } isAdmin={ user ? user.isAdmin : false } />}
      </Container>
    </div>
  )
}

export default Profile