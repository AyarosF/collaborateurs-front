// Navigation
// ---- Logo à gauche
// ---- À droite: bouton "Liste", lien vers l'édition du profil (avatar de l'utilisateur connecté), déconnexion
// ---- Option admin: bouton "Ajouter un utilisateur" en plus
import { Component } from 'react'
import { Link } from 'react-router-dom'
import { Header, Icon, Menu, Image } from 'semantic-ui-react'

const HeaderLogo = () => (
  <Header as='h2'>
    <Icon name='coffee' />
    <Header.Content>Team Coffee</Header.Content>
  </Header>
)

const ProfilePicture = (props) => (
  <Image src={props.img} avatar alt={props.firstname} />
)

class NavHeader extends Component {

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    const user = {
      _id: 123,
      firstname: "Test",
      lastname: "React",
      photo: "https://randomuser.me/api/portraits/women/66.jpg",
      isAdmin: true
    }

    return (
      <Menu>
        <Menu.Item as={Link} to="/" name="home" active={activeItem === 'home'} onClick={this.handleItemClick}>
          <HeaderLogo />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/collaborateurs" name="collaborateurs" active={activeItem === 'collaborateurs'} onClick={this.handleItemClick}>
            List
          </Menu.Item>
          <Menu.Item as={Link} to="/edit" name="edit" active={activeItem === 'edit'} onClick={this.handleItemClick}>
            <ProfilePicture img={user.photo} firstname={user.firstname} />
          </Menu.Item>
          <Menu.Item as={Link} to="/logout" name="logout" active={activeItem === 'edit'} onClick={this.handleItemClick}>
            Logout
          </Menu.Item>
        </Menu.Menu>
      </Menu>      
    )
  }
  
}

export default NavHeader