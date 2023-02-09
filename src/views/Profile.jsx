// Affichage formulaire d'édition
// ---- Édition du profil par l'utilisateur
// ---- Variante si édité par l'admin
import { useState } from 'react'
import { UserForm } from '@comp/UserForm'
import { Container, Header } from 'semantic-ui-react'
import axiosRequest from '../services/axiosRequest'
import { useParams } from 'react-router-dom'

const FormHeader = () => (
  <Header as='h2'>
    Modifier le profil
  </Header>
)

const getUserToModify = async (id) => {
  try {
    return await axiosRequest.get(`/users/${id}`).then(res => res.data.user)
  }
  catch (err) {
    console.log(err)
  }
}

const Profile = ({ user }) => {

  const [userToEdit, setUserToEdit] = useState()
  
  let userId = useParams();
  
  getUserToModify(userId.id).then((user) => {
    setUserToEdit(user)
  })
  
  return (
    <div>
      <Container>
        <FormHeader />
        <UserForm methode="edit" user={ userToEdit } isAdmin={ user ? user.isAdmin : false } />
      </Container>
    </div>
  )
}

export default Profile