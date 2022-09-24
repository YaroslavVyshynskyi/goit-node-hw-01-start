// const contacts = require('./db/contacts.json');
const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

const updateContacts = async contacts =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async id => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === id);
  return result || null;
};

const addContact = async ({ id, name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = {
    id,
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await updateContacts(contacts);

  return newContact;
};

const removeContact = async id => {
  const contacts = await listContacts();

  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};