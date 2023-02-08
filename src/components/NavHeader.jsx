// Navigation
// ---- Logo à gauche
// ---- À droite: bouton "Liste", lien vers l'édition du profil (avatar de l'utilisateur connecté), déconnexion
// ---- Option admin: bouton "Ajouter un utilisateur" en plus
import { Component, useState } from 'react'
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

const NavHeader = () => {
  
    const [authInfo, setAuthInfo] = useState({isLoggedIn: false, isAdmin: false, activeItem: 'home'})
  
    const handleItemClick = (e, { name }) => {
      setAuthInfo({ ...prevState, activeItem: name })
    }

    const { isLoggedIn, isAdmin, activeItem } = authInfo

    const user = {
      _id: 123,
      firstname: "Test",
      lastname: "React",
      photo: "https://randomuser.me/api/portraits/women/66.jpg",
      isAdmin: true
    }

    let loggedNav

    if (isLoggedIn) {
      loggedNav = (
      <Menu.Menu position="right">
          <Menu.Item as={Link} to="/collaborateurs" name="collaborateurs" active={activeItem === 'collaborateurs'} onClick={handleItemClick}>
            List
          </Menu.Item>
          <Menu.Item as={Link} to="/edit" name="edit" active={activeItem === 'edit'} onClick={handleItemClick}>
            <ProfilePicture img={user.photo} firstname={user.firstname} />
          </Menu.Item>
          <Menu.Item as={Link} to="/logout" name="logout" active={activeItem === 'logout'} onClick={handleItemClick}>
            Logout
          </Menu.Item>
        </Menu.Menu>
        )
    } else {
      loggedNav = (
        <Menu.Menu position="right">          
          <Menu.Item as={Link} to="/login" name="login" active={activeItem === 'login'} onClick={handleItemClick}>
            Login
          </Menu.Item>
        </Menu.Menu>
      )
    }

    return (
      <Menu>
        <Menu.Item as={Link} to="/" name="home" active={activeItem === 'home'} onClick={handleItemClick}>
          <HeaderLogo />
        </Menu.Item>
        {loggedNav}
      </Menu>      
    )
  
}

export default NavHeader