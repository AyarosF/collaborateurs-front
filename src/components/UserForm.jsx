import { useState } from 'react'
import { Form, Input, Button, Select } from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom'
import axiosRequest from "../services/axiosRequest"

const formatDate = (user) => {
  const birthdate = user ? new Date(user.birthdate) : new Date()
  let day = birthdate.getDate()
  let month = birthdate.getMonth() + 1
  const year = birthdate.getFullYear()

  if (day < 10) 
    day = "0" + day
  if (month < 10) 
    month = "0" + month
  
  return year + '-' + month + '-' + day
}

export const UserForm = (props) => {

  const user = props.user ? props.user : { gender: 'autre', category: 'Client' }
  const isAdmin = props.isAdmin
  const methode = props.methode
  
  const navigate = useNavigate();

  const [gender, setGender] = useState(user.gender)
  const [category, setCategory] = useState(user.category)

  const birthdate = formatDate(user)

  const genders = [
    { key: 'm', text: 'Homme', value: 'male' },
    { key: 'f', text: 'Femme', value: 'female' },
    { key: 'o', text: 'Autre', value: 'autre' }
  ]
  const categories = [
    { key: 't', text: 'Technique', value: 'Technique' },
    { key: 'm', text: 'Marketing', value: 'Marketing' },
    { key: 'c', text: 'Client', value: 'Client' },
    { key: 's', text: 'Sciences', value: 'Sciences' }
  ]

  const onSubmit = async (e) => {
    e.preventDefault(); 
      
    let newGender = 'autre'
    genders.map((gen) => {
      if (gen.text === gender)
        newGender = gen.value
    })
    const data = new FormData(e.target) 
    data.append("gender", newGender)
    data.append("category", category)

    let editUser = {}
    for (const entry of data.entries()) {
      editUser = { ...editUser, [entry[0]] : entry[1] }
    }

    try {
      if (methode === "add") {
        await axiosRequest.post(`/users/add`, editUser)
        .then((res) => console.log(res.data))
      } else {
        await axiosRequest.put(`/users/${user.id}/edit`, editUser)
        .then((res) => console.log(res.data))
      }        
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
    <Form id="userForm" method={ methode === "add" ? "post" : "put" } onSubmit={onSubmit} encType="multipart/form-data">      
      {methode === "edit" && (
        <Form.Field
          id="userid"
          name="userid"
          control={Input}
          value={user.id}
          type="hidden"
        />
      )}      
      <Form.Group widths='equal'>
        <Form.Field
          id="firstname"
          name="firstname"
          control={Input}
          label="Prénom"
          placeholder="Prénom"
          defaultValue={user.firstname ? user.firstname : ""}
          required
        />
        <Form.Field
          id="lastname"
          name="lastname"
          control={Input}
          label="Nom" 
          placeholder="Nom" 
          defaultValue={user.lastname ? user.lastname : ""}
          required
        />
        <Form.Field
          name="gender"
          control={Select}
          options={genders}
          label={{ children: "Civilité", htmlFor: 'gender' }}
          placeholder="Civilité"
          defaultValue={gender}
          search
          searchInput={{ id: 'gender' }}
          required
          onChange={(e) => setGender(e.target.innerText)}
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field
          id="email"
          name="email"
          control={Input}
          type="email"
          label="Email"
          placeholder="mail@mail.com"
          defaultValue={user.email ? user.email : ""}
          required
        />
        <Form.Field
          id="phone"
          name="phone"
          control={Input}
          type="tel"
          label="Téléphone"
          placeholder="01-02-03-04-05"
          defaultValue={user.phone ? user.phone : ""}
          required
        />
        <Form.Field
          name="category"
          control={Select}
          options={categories}
          label={{ children: "Catégorie", htmlFor: 'category' }}
          placeholder="Catégorie"
          defaultValue={category}
          search
          searchInput={{ id: 'category' }}
          required
          onChange={(e) => setCategory(e.target.innerText)}
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field
          id="birthdate"
          name="birthdate"
          control={Input}
          type="date"
          label="Date de naissance"
          defaultValue={birthdate}
          required
        />
        <Form.Field
          id="city"
          name="city"
          control={Input}
          label="Ville"
          placeholder="Ville"
          defaultValue={user.city ? user.city : ""}
          required
        />
        <Form.Field
          id="country"
          name="country"
          control={Input}
          label="Pays"
          placeholder="Pays"
          defaultValue={user.country ? user.country : ""}
          required
        />
      </Form.Group>
      <Form.Field
        id="photo"
        name="photo"
        label="Photo"
        control={Input}
        placeholder="https://..."
        defaultValue={user.photo ? user.photo : ""}
      />
      <Form.Field
        id="password"
        name="password"
        label="Mot de passe"
        control={Input}
        type="password"
      />
      <Form.Group>
        <Form.Field
          id="form-submit"
          control={Button}
          content={methode === "add" ? "Ajouter un utilisateur" : "Modifier les informations"}
          type="submit"
        />
        {methode === "edit" && isAdmin && (
          <Button basic color="red" onClick={onDelete} >
            Supprimer l'utilisateur
          </Button>
        )}
      </Form.Group>
    </Form>
  )
}