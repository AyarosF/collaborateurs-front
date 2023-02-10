import { Container, Input, Select, Divider } from 'semantic-ui-react'

const UserFilter = ({ setSearchTerm, searchTerm, setSearchSelectionInfo, searchSelectionInfo, setSearchSelectionCat, searchSelectionCat }) => {

    const infoOptions = [
        { key: 'name', value: 'name', text: 'Nom' },
        { key: 'loc', value: 'loc', text: 'Localisation' },
    ]

    const catOptions = [
        { key: 't', text: 'Technique', value: 'Technique' },
        { key: 'm', text: 'Marketing', value: 'Marketing' },
        { key: 'c', text: 'Client', value: 'Client' },
        { key: 's', text: 'Sciences', value: 'Sciences' },
    ]
    const handleInputFilter = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectInfo = (e, data) => {
        setSearchSelectionInfo(data.value)
    }

    const handleSelectCat = (e, data) => {
        setSearchSelectionCat(data.value)
    }

    return (
        <Container textAlign="center">
            <Input type="text" placeholder="Rechercher..." onChange={ handleInputFilter } value={ searchTerm } action>
                <input  />
                <Select options={ infoOptions } onChange={ handleSelectInfo } defaultValue={ searchSelectionInfo } />
                <Select options={ catOptions } onChange={ handleSelectCat } defaultValue={ searchSelectionCat }/>
            </Input>
            <Divider  />
        </Container>
    )
}


export default UserFilter