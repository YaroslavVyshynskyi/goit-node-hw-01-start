const express = require('express');
const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');
const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));
router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));
router.post('/verify', validateBody(schemas.verifyEmailSchema), ctrlWrapper(ctrl.resendVerify));
router.post('/verify/:verificationToken', ctrlWrapper(ctrl.verify));
router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));
router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));
router.patch(
  '/users',
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);
router.post(
  '/users/avatars',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
