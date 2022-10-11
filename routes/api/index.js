const express = require('express');
const router = express.Router();

const contactsRouter = require('./contactsRoutes');

router.use('/contacts', contactsRouter);

module.exports = router;
