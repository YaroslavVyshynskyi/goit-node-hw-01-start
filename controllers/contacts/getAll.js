const { Contact } = require('../../models/contact');

const getAll = async (_, res) => {
  const result = await Contact.find({}, 'name email phone');
  console.log('good waldemar');
  res.json(result);
};

module.exports = getAll;
