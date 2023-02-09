import { Container, Input, Select } from 'semantic-ui-react'

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
        <Container>
            <Input placeholder="Recherche" onChange={ handleInputFilter } value={ searchTerm } />  
            <Select options={ infoOptions } onChange={ handleSelectInfo } value={ searchSelectionInfo } />
            <Select options={ catOptions } onChange={ handleSelectCat } value={ searchSelectionCat }/>
        </Container>
    )
}


export default UserFilter