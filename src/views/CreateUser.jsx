// Formulaire d'ajout d'utilisateur
// ---- Accès admin seulement
import { UserForm } from '@comp/UserForm'
import { Container, Header } from 'semantic-ui-react'

const FormHeader = () => (
  <Header as='h1' textAlign="center">
    Ajouter un utilisateur
  </Header>
)

const CreateUser = ({ user }) => {

  return (
    <div>
      <Container>
        <FormHeader />
        <UserForm methode="add" isAdmin={ user ? user.isAdmin : false} />
      </Container>
    </div>
  )
}

export default CreateUser