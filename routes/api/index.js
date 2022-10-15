const express = require('express');
const router = express.Router();

const contactsRouter = require('./contactsRoutes');
const authRouter = require('./authRoutes');

router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);

module.exports = router;
