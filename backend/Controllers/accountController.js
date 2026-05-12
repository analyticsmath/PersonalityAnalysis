const { sendSuccess } = require('../utils/response');
const {
  buildUserExport,
  deleteProfileDataForUser,
  deleteAssessmentForUser,
  deleteAccountForUser,
} = require('../services/account/accountData.service');

const currentUserId = (req) => String(req.user?.id || req.user?.userId || '');

const exportAccountData = async (req, res, next) => {
  try {
    const data = await buildUserExport(currentUserId(req));
    return sendSuccess(res, { data, meta: {} });
  } catch (error) {
    return next(error);
  }
};

const deleteProfileData = async (req, res, next) => {
  try {
    const data = await deleteProfileDataForUser(currentUserId(req));
    return sendSuccess(res, { data, meta: {} });
  } catch (error) {
    return next(error);
  }
};

const deleteAssessment = async (req, res, next) => {
  try {
    const data = await deleteAssessmentForUser({
      requester: req.user,
      resultId: req.params.resultId,
    });
    return sendSuccess(res, { data, meta: {} });
  } catch (error) {
    return next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const data = await deleteAccountForUser({
      requester: req.user,
      body: req.body || {},
    });
    return sendSuccess(res, { data, meta: {} });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  exportAccountData,
  deleteProfileData,
  deleteAssessment,
  deleteAccount,
};
