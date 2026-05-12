const { randomUUID } = require('crypto');

/**
 * Standard API metadata (request correlation + time).
 * @param {import('express').Request | null} req
 * @param {Record<string, unknown>} [extra]
 */
const buildMeta = (req = null, extra = {}) => {
  const headerId = req?.headers?.['x-request-id'] || req?.headers?.['x-requestid'];
  const requestId =
    headerId && String(headerId).trim() ? String(headerId).trim() : randomUUID();

  return {
    requestId,
    timestamp: new Date().toISOString(),
    ...extra,
  };
};

/**
 * Success envelope including meta (for canonical assessment read endpoints).
 * @param {import('express').Response} res
 */
const sendStructuredSuccess = (res, { status = 200, data = {}, message = 'OK', req, metaExtra = {} } = {}) =>
  res.status(status).json({
    success: true,
    data,
    message,
    meta: { ...buildMeta(req), ...metaExtra },
  });

/**
 * Structured error envelope (optional; most routes still use flat sendError in utils/response.js).
 * @param {import('express').Response} res
 */
const sendStructuredError = (res, { status = 400, code, message, details = {}, req } = {}) =>
  res.status(status).json({
    success: false,
    error: {
      code: code || 'ERROR',
      message: message || 'Request failed',
      details: details && typeof details === 'object' ? details : {},
    },
    meta: buildMeta(req),
  });

module.exports = {
  buildMeta,
  sendStructuredSuccess,
  sendStructuredError,
};
