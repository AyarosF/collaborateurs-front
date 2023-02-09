import { Card, Icon, Image, Button, Label, Divider } from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom'
import axiosRequest from "../services/axiosRequest"

// Carte utilisateur
// --- Infos utilisateur
// --- Options admin : modifier/supprimer

const UserCard = (props) => {

  const { user, isAdmin } = props  
  const navigate = useNavigate();

  var catColor = "yellow"

  if (user.category === "Marketing")
    catColor = 'blue'
  else if (user.category === "Technique")
    catColor = 'teal'
  else if (user.category === "Sciences")
    catColor = 'green'

  const onDelete = async (e) => {
    e.preventDefault()

    try {
      await axiosRequest.delete(`/users/${user.id}/delete`).then((res) => console.log(res))
      navigate('/')
    }
    catch (error) {
      //TODO gestion correct des erreurs
      if (error.response) {
        console.log(error.response.data.message)
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
      }
      console.log(error.config) 
    }
  }

  return (
    <Card>
      <Card.Content>
        <Image src={user.photo} floated="right" size="mini" />        
        <Card.Header>{user.firstname} {user.lastname}</Card.Header>
        <Card.Meta>
          <div>
            {user.city}, {user.country}
          </div>
          <Label as='a' color={catColor}>
            {user.category}
          </Label>
        </Card.Meta>
        <Divider />
        <Card.Description>          
          <div>
            <Icon name='paper plane' />
            {user.email}
          </div>
          <div>
            <Icon name='mobile' />
            {user.phone}
          </div>          
          <div>
            <Icon name='birthday cake' />
            Anniversaire : {user.birthday} ({user.age} ans)
          </div>
        </Card.Description>
      </Card.Content>
      {isAdmin && (
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="teal" as={Link} to={`/edit/${user.id}`}>
              Éditer
            </Button>
            <Button basic color="red" onClick={onDelete}>
              Supprimer
            </Button>
          </div>
        </Card.Content>
      )}      
    </Card>
  )  
}

export default UserCard