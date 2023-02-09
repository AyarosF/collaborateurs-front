// Affichage des utilisateurs
// ---- Liste
// ---- Filtres (sur: nom, catégorie, localisation)
import { useState, useEffect } from "react";
import axiosRequest from "../services/axiosRequest";
import { Card, Container } from "semantic-ui-react";
import UserCard from "@comp/UserCard";
import UserFilter from "@comp/UserFilter";

const List = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSelectionInfo, setSearchSelectionInfo] = useState("");
  const [searchSelectionCat, setSearchSelectionCat] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [ arrayToFilter, setArrayToFilter ] = useState([])

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

  const filterByInfo = (array) => {
    if (searchSelectionInfo === "name") {
        return array.filter(
          (user) =>
            user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastname.toLowerCase().includes(searchTerm.toLowerCase())
        );
        }
      else if(searchSelectionInfo === "loc") {
        return array.filter((user) =>
          user.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
          user.country.toLowerCase().includes(searchTerm.toLowerCase())
        ;
    }
  }

  const filterByCat = (array) => {
    return array.filter((user) => user.category.toLowerCase().includes(searchSelectionCat.toLowerCase()))
  }

  useEffect(() => {
    let result = users
    result = filterByInfo(users)
    result = filterByCat(users)
    console.log(result)
    setUsers(result)
  }, [searchTerm, searchSelectionInfo, searchSelectionCat])

  useEffect(() => {

    // if (searchTerm || searchSelectionCat) {
    //   setFilteredUsers(
    //     users.filter((user) => {
    //       if(searchTerm !== "" && searchSelectionInfo === "name" && searchSelectionCat !== "") {
    //         if(searchSelectionInfo === "name")
    //         return (
    //           (user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //           user.lastname.toLowerCase().includes(searchTerm.toLowerCase()))
    //           &&
    //           user.category.toLowerCase().includes(searchSelectionCat.toLowerCase()));
    //           else if(searchSelectionInfo === "loc")
    //           return (
    //             (user.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //             user.country.toLowerCase().includes(searchTerm.toLowerCase()))
    //             &&
    //             user.category.toLowerCase().includes(searchSelectionCat.toLowerCase()));
    //       } else {
    //         return (
    //           user.category.toLowerCase().includes(searchSelectionCat.toLowerCase())
    //         );
    //       }
    //     })
    //   );
    // } else {
    //   setFilteredUsers(users);
    // }
   
    // let arrayToFilter; 

    // if(filteredUsers.length > 0)
    // {
    //   arrayToFilter = filteredUsers
    // }
    // else {
    //   arrayToFilter = users 
    // }

    // switch (searchSelectionInfo) {
    //   case "name":
    //   default:
    //     setFilteredUsers(users.filter(
    //       (user) =>
    //         user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         user.lastname.toLowerCase().includes(searchTerm.toLowerCase())
    //     ));
    //     break;

    //   case "loc":
    //     setFilteredUsers(users.filter((user) =>
    //       user.city.toLowerCase().includes(searchTerm.toLowerCase()))
    //     );
    //     break; 
    // }

    // if(searchSelectionCat) {
    //   setFilteredUsers(users.filter((user) => user.category.toLowerCase().includes(searchSelectionCat.toLowerCase())))
    // }


  }, [searchSelectionInfo, searchSelectionCat, searchTerm, users]);
    

  return (
    <Container>
      <UserFilter
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        searchSelectionInfo={searchSelectionInfo}
        setSearchSelectionInfo={setSearchSelectionInfo}
        searchSelectionCat={searchSelectionCat}
        setSearchSelectionCat={setSearchSelectionCat}
      />
      <Card.Group>
        {filteredUsers.map((eachUser) => (
          <UserCard key={eachUser.id} user={eachUser} isAdmin={user.isAdmin} />
        ))}
      </Card.Group>
    </Container>
  );
};

export default List;
