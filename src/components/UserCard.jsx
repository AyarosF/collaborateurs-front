import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

// Carte utilisateur
// --- Infos utilisateur
// --- Options admin : modifier/supprimer

class UserCard extends Component {

  render() {
    <Card>
      <Image src='' wrapped ui={false} />
      <Card.Content>
        <Card.Header>Matthew</Card.Header>
        <Card.Meta>
          <span className='date'>Joined in 2015</span>
        </Card.Meta>
        <Card.Description>
          Matthew is a musician living in Nashville.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='user' />
          22 Friends
        </a>
      </Card.Content>
    </Card>
  }
}

export default UserCard