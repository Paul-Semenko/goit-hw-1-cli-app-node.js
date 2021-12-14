const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');
const path = require('path');



const readContent = async () => {
    const content = await fs.readFile(path.join(__dirname, 'db', 'contact.json'), 'utf8',)
    const result = JSON.parse(content)
    return result
}
const writeContent = async (contacts) => {
    await fs.writeFile(path.join(__dirname, 'db', 'contact.json'), JSON.stringify(contacts, null, 2))
}
 
const  listContacts=async()=> readContent()

const getContactById = async (contactId) => {
    const contacts = await readContent()
    const contact = contacts.find(contact => contact.id === contactId)
    return contact
}

const removeContact = async (contactId) => {
    const contacts = await readContent()
    if (contacts.some((el) => el.id === contactId)) {
        const newContact = contacts.filter((el) => el.id !== contactId)
        await writeContent(newContact)
        return 'contact is removed successfully'
    } else {
        return 'no contact found'
    }
}
const addContact = async (userData) => {
    const{name, email, phone}=userData
    if (!Object.values(userData).every((userData) => userData)) {
        return "operation failed, user data is missing!"
    }
    const contacts = await readContent()
    const newContact = { name, email, phone, id: uuidv4()}
    contacts.push(newContact)
    await fs.writeFile(path.join(__dirname, 'db', 'contact.json'),
        JSON.stringify(contacts, null, 2),
    )
  return newContact
}

module.exports={listContacts, getContactById, removeContact, addContact}