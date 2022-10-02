const { Command } = require('commander');
const contacts = require('./contacts');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-ph, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const listContact = await contacts.listContacts();
      console.log(listContact);
      break;

    case 'get':
      const getContactById = await contacts.getContactById(id);
      console.log(getContactById);
      break;

    case 'add':
      const addContact = await contacts.addContact({ id, name, email, phone });
      console.log(addContact);
      break;

    case 'remove':
      const removeContact = await contacts.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
