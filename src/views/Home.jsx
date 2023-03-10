// Affichage principal
// ---- L'utilisateur doit être connecté -> sinon, reidrection vers login
// ---- Affiche la page "avez-vous dit bonjour à..." (import component Card)
import { useState, useEffect } from "react"
import { Container, Button, Header, Card } from "semantic-ui-react"
import UserCard from "@comp/UserCard"
import axiosRequest from "../services/axiosRequest"

const Home = ({ user }) => {
  const [randomUser, setRandomUser] = useState()

  const getRandomUser = async () => {
    try {
      await axiosRequest
        .get("/users/random")
        .then((res) => res.data.user)
        .then((rand) => {
          if (user.email !== rand.email) {
            setRandomUser(rand)
          }
        })
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getRandomUser()
  }, []);

  return (
    <div>
      <Container textAlign="center">
        <Header as="h1">Bienvenue sur l'intranet</Header>
        <p >
          La plateforme de l'entreprise qui vous permet de retrouver tous vos
          collaborateurs
        </p>
      </Container>
      <Container text>
        {randomUser && (
          <Card.Group centered >
            <UserCard user={randomUser} isAdmin={false} />
          </Card.Group>
        )}
      </Container>
      <Container textAlign="center">
        <Button onClick={getRandomUser}>Dire bonjour à quelqu'un d'autre</Button>
      </Container>
    </div>
  );
};

export default Home;
