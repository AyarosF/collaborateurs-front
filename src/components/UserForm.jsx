import { useState, useEffect, useRef } from "react";
import { Container, Form, Input, Button, Checkbox } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import axiosRequest from "../services/axiosRequest";
import ErrorMessage from "@comp/ErrorMessage";

export const UserForm = (props) => {
  const { userData, isAdmin, methode } = props;

  const [user, setUser] = useState(userData || {});
  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();

  const genders = [
    { key: "m", text: "Homme", value: "male" },
    { key: "f", text: "Femme", value: "female" },
    { key: "o", text: "Autre", value: "autre" },
  ];
  const categories = [
    { key: "t", text: "Technique", value: "Technique" },
    { key: "m", text: "Marketing", value: "Marketing" },
    { key: "c", text: "Client", value: "Client" },
    { key: "s", text: "Sciences", value: "Sciences" },
  ];

  // Update du state User
  const setFields = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  // Vérification du mot de passe
  const verifyPassword = (editUser) => {
    let isValid = true;
    if (editUser.password && editUser.password !== "") {
      if (editUser.confirm_password === "") {
        setAlert("Merci de confirmer votre mot de passe");
        isValid = false;
      }
      if (editUser.password !== editUser.confirm_password) {
        setAlert("Le mot de passe et sa confirmation ne correspondent pas");
        isValid = false;
      }
    }

    return isValid;
  };

  // Envoi du formulaire (add ou edit)
  const onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    // Ajustement de la valeur de "gender"
    let newGender = "autre";
    genders.map((gen) => {
      if (gen.text === user.gender) newGender = gen.value;
    });
    data.append("gender", newGender);
    data.append("category", user.category);
    
    let editUser = {};
    for (const entry of data.entries()) {
      editUser = { ...editUser, [entry[0]]: entry[1] };
    }

    if (verifyPassword(editUser)) {
      try {
        if (methode === "add") {
          await axiosRequest
            .post(`/users/add`, editUser)
            .then((res) => console.log(res.data));
          window.location.reload(false);
        } else {
          await axiosRequest
            .put(`/users/${user.id}/edit`, editUser)
            .then((res) => console.log(res.data));
          window.location.reload(false);
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        setAlert(error.response.data.message);
        console.log(error.config);
      }
    }
  };

  const onDelete = async (e) => {
    e.preventDefault();

    try {
      await axiosRequest
        .delete(`/users/${user.id}/delete`)
        .then((res) => console.log(res));
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  return (
    <Container text>
      {alert && <ErrorMessage alert={alert} />}
      <Form
        id="userForm"
        method={methode === "add" ? "post" : "put"}
        onSubmit={onSubmit}
        encType="multipart/form-data"
      >
        {methode === "edit" && (
          <Form.Field
            id="userid"
            name="userid"
            control={Input}
            value={user.id}
            type="hidden"
          />
        )}
        <Form.Group widths="equal">
          <Form.Field
            id="firstname"
            name="firstname"
            control={Input}
            label="Prénom"
            placeholder="Prénom"
            value={user.firstname ?? ""}
            onChange={setFields}
            required
          />
          <Form.Field
            id="lastname"
            name="lastname"
            control={Input}
            label="Nom"
            placeholder="Nom"
            value={user.lastname ?? ""}
            onChange={setFields}
            required
          />
          <Form.Select
            name="gender"
            options={genders}
            label={{ children: "Civilité", htmlFor: "gender" }}
            placeholder="Civilité"
            defaultValue={user.gender}
            onChange={(e) => setUser({ ...user, gender: e.target.innerText })}
            search
            searchInput={{ id: "gender" }}
            required
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            id="email"
            name="email"
            control={Input}
            type="email"
            label="Email"
            placeholder="mail@mail.com"
            value={user.email ?? ""}
            onChange={setFields}
            required
          />
          <Form.Field
            id="phone"
            name="phone"
            control={Input}
            type="tel"
            label="Téléphone"
            placeholder="01-02-03-04-05"
            value={user.phone ?? ""}
            onChange={setFields}
            required
          />
          <Form.Select
            name="category"
            options={categories}
            label={{ children: "Catégorie", htmlFor: "category" }}
            placeholder="Catégorie"
            defaultValue={user.category}
            onChange={(e) => setUser({ ...user, category: e.target.innerText })}
            search
            searchInput={{ id: "category" }}
            required
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            id="birthdate"
            name="birthdate"
            control={Input}
            type="date"
            label="Date de naissance"
            min="1950-01-01"
            max="2005-01-01"
            value={user.birthdate}
            onChange={setFields}
            required
          />
          <Form.Field
            id="city"
            name="city"
            control={Input}
            label="Ville"
            placeholder="Ville"
            defaultValue={user.city ?? ""}
            onChange={setFields}
            required
          />
          <Form.Field
            id="country"
            name="country"
            control={Input}
            label="Pays"
            placeholder="Pays"
            defaultValue={user.country ?? ""}
            onChange={setFields}
            required
          />
        </Form.Group>
        <Form.Field
          id="photo"
          name="photo"
          label="Photo"
          control={Input}
          placeholder="https://..."
          defaultValue={user.photo ?? ""}
          onChange={setFields}
        />
        <Form.Field
          id="password"
          name="password"
          label="Mot de passe"
          control={Input}
          type="password"
          onChange={setFields}
          required={methode === "add" ? true : false}
        />

        <Form.Field
          id="confirm_password"
          name="confirm_password"
          label="Confirmer le mot de passe"
          control={Input}
          type="password"
          required={methode === "add" ? true : false}
        />

        {isAdmin && (
          <Form.Field
            id="isAdmin"
            name="isAdmin"
            label="Administrateur"
            control={Checkbox}
            type="checkbox"
            value={user.isAdmin ? "true" : "false"}
            checked={user.isAdmin}
            onChange={(e) => setUser({ ...user, isAdmin: !user.isAdmin })}
            toggle
          />
        )}
        <Form.Group>
          <Form.Field
            id="form-submit"
            control={Button}
            content={
              methode === "add"
                ? "Ajouter un utilisateur"
                : "Modifier les informations"
            }
            type="submit"
            color="teal"
          />
          {methode === "edit" && isAdmin && (
            <Button basic color="red" onClick={onDelete}>
              Supprimer l'utilisateur
            </Button>
          )}
        </Form.Group>
      </Form>
    </Container>
  );
};
