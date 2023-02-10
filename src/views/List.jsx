// Affichage des utilisateurs
// ---- Liste
// ---- Filtres (sur: nom, catégorie, localisation)
import { useState, useEffect } from "react";
import axiosRequest from "../services/axiosRequest";
import { Card, Container, Header } from "semantic-ui-react";
import UserCard from "@comp/UserCard";
import UserFilter from "@comp/UserFilter";

const List = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSelectionInfo, setSearchSelectionInfo] = useState("");
  const [searchSelectionCat, setSearchSelectionCat] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    const getUsers = async () => {
      try {
        await axiosRequest
          .get("/users")
          .then((res) => res.data)
          .then((users) => {
            setUsers(users.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  // ---------------
  // Fonctions de filtres
  // ---------------

  const filterByType = (user) => {
    if (searchSelectionInfo === 'loc')
      return user.city.toLowerCase().includes(searchTerm.toLowerCase())
    else if (searchSelectionInfo === 'name')
      return (
        user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return true;
  }

  const filterByCategory = (user) => {
    return user.category.toLowerCase().includes(searchSelectionCat.toLowerCase());
  }
  
  useEffect(() => {
    setFilteredUsers(
      users.filter(filterByType).filter(filterByCategory)
    );
  }, [searchSelectionInfo, searchSelectionCat, searchTerm, users]);

  return (
    <Container>
      <Header as="h1" textAlign="center">Les collègues</Header>
      <UserFilter
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        searchSelectionInfo={searchSelectionInfo}
        setSearchSelectionInfo={setSearchSelectionInfo}
        searchSelectionCat={searchSelectionCat}
        setSearchSelectionCat={setSearchSelectionCat}
      />
      <Card.Group centered>
        {filteredUsers.map((eachUser) => (
          <UserCard key={eachUser.id} user={eachUser} isAdmin={user.isAdmin} />
        ))}
      </Card.Group>
    </Container>
  );
};

export default List;
