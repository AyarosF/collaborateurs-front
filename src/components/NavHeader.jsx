// Navigation
// ---- Logo à gauche
// ---- À droite: bouton "Liste", lien vers l'édition du profil (avatar de l'utilisateur connecté), déconnexion
// ---- Option admin: bouton "Ajouter un utilisateur" en plus
import { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Header, Icon, Menu, Image } from 'semantic-ui-react'

const HeaderLogo = () => (
  <Header as='h2'>
    <Icon name='coffee' />
    <Header.Content>Team Coffee</Header.Content>
  </Header>
)

const ProfilePicture = (currentUser) => (
  <Image src={currentUser.img} avatar alt={currentUser.firstname} />
)

const NavHeader = ({ user }) => {
  
  const [authInfo, setAuthInfo] = useState({isLoggedIn: false, isAdmin: false, activeItem: ''})
  const { isLoggedIn, isAdmin, activeItem } = authInfo
  
  useEffect(() => {
    if(user) {
      setAuthInfo({...authInfo, isLoggedIn: true, isAdmin: user.isAdmin })
    }
  }, [user]);

  const handleItemClick = (e, { name }) => {
    setAuthInfo({ ...authInfo, activeItem: name })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setAuthInfo({isLoggedIn: false, isAdmin: false, activeItem: ''})
  }

  return (
    
    <Menu>
      <Menu.Item as={Link} to="/" name="home">
        <HeaderLogo />
      </Menu.Item>
      {isLoggedIn && (
        <Menu.Menu position="right">
        <Menu.Item as={Link} to="/collaborateurs" name="collaborateurs" active={activeItem === 'collaborateurs'} onClick={handleItemClick}>
          Liste
        </Menu.Item>
        {isAdmin && (
          <Menu.Item as={Link} to="/add" name="add" active={activeItem === 'add'} onClick={handleItemClick}>
            Ajouter
          </Menu.Item>
        )}
        <Menu.Item as={Link} to={`/edit/${user.id}`} name="edit" active={activeItem === 'edit'} onClick={handleItemClick}>
          <ProfilePicture img={user.photo} firstname={user.firstname} />
        </Menu.Item>
        <Menu.Item as={ Link } to="/login" onClick={ logout }>
          Déconnexion
        </Menu.Item>
      </Menu.Menu>
      )}
      {!isLoggedIn && (
        <Menu.Menu position="right">          
        <Menu.Item as={Link} to="/login" name="login" active={activeItem === 'login'} onClick={handleItemClick}>
          Se connecter
        </Menu.Item>
      </Menu.Menu>
      )}
    </Menu>
  )
  
}

export default NavHeader