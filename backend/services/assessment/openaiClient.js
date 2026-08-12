const OpenAI = require('openai');
const { config } = require('../../config/env');
const { createHttpError } = require('../../utils/httpError');

let client;

const getOpenAiClient = () => {
  const apiKey = config.aiApiKey || config.openaiApiKey;
  if (!apiKey) {
    const providerName = (config.aiProvider || 'AI').toUpperCase();
    throw createHttpError(503, `${providerName}_API_KEY is not configured`);
  }

  if (!client) {
    const options = { apiKey };
    if (config.aiBaseUrl) {
      options.baseURL = config.aiBaseUrl;
    }
    client = new OpenAI(options);
  }

  return client;
};

const resetAiClient = () => {
  client = null;
};

module.exports = {
  getOpenAiClient,
  resetAiClient,
};
