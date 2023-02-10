import { Message } from 'semantic-ui-react'

const ErrorMessage = ({ alert }) => {
  return (
    <Message warning>
      <Message.Header>Erreur</Message.Header>
      <p>{alert}</p>
    </Message>
  )
}

export default ErrorMessage