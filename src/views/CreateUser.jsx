// Formulaire d'ajout d'utilisateur
// ---- Accès admin seulement
import { UserForm } from '@comp/UserForm'
import { Container, Header } from 'semantic-ui-react'

const FormHeader = () => (
  <Header as='h2'>
    Ajouter un utilisateur
  </Header>
)

const CreateUser = () => {

  return (
    <div>
      <Container>
        <FormHeader />
        <UserForm methode="add" />
      </Container>
    </div>
  )
}

export default CreateUser