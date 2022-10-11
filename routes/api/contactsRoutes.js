const express = require('express');
const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');
const { isValidId, validateBody } = require('../../middlewares');
const { schemas } = require('../../models/contact');
const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));
router.get('/:id', isValidId, ctrlWrapper(ctrl.getById));
router.post('/', validateBody(schemas.addSchema), ctrlWrapper(ctrl.add));
router.delete('/:id', isValidId, ctrlWrapper(ctrl.removeById));
router.put('/:id', isValidId, validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateById));
router.patch(
  '/:id/favorite',
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
