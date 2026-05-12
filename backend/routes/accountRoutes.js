const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  exportAccountData,
  deleteProfileData,
  deleteAssessment,
  deleteAccount,
} = require('../Controllers/accountController');
const { assertConfirm } = require('../services/account/accountData.service');

const router = express.Router();

router.use(authMiddleware);

const requireDeleteConfirm = (req, res, next) => {
  try {
    assertConfirm(req.body || {});
    return next();
  } catch (error) {
    return next(error);
  }
};

router.get('/export', exportAccountData);
router.delete('/profile-data', express.json(), requireDeleteConfirm, deleteProfileData);
router.delete('/assessment/:resultId', express.json(), requireDeleteConfirm, deleteAssessment);
router.delete('/', express.json(), requireDeleteConfirm, deleteAccount);

module.exports = router;
