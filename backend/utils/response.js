const { buildMeta } = require('./apiResponse');

/**
 * @param {import('express').Response} res
 * @param {{ status?: number, data?: object, message?: string, meta?: object | true | false, req?: import('express').Request }} [options]
 */
const sendSuccess = (res, { status = 200, data = {}, message = 'OK', meta, req } = {}) => {
  const body = {
    success: true,
    data,
    message,
  };

  if (meta === true) {
    body.meta = buildMeta(req);
  } else if (meta && typeof meta === 'object') {
    body.meta = meta;
  }

  return res.status(status).json(body);
};

const sendError = (res, { status = 500, message = 'Internal Server Error' } = {}) =>
  res.status(status).json({
    success: false,
    message,
  });

module.exports = {
  buildMeta,
  sendSuccess,
  sendError,
};
