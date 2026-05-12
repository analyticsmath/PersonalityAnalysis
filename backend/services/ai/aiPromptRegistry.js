const reportNarrative = require('./prompts/reportNarrative.prompt');
const careerCoach = require('./prompts/careerCoach.prompt');
const cvAnalysis = require('./prompts/cvAnalysis.prompt');
const adaptiveQuestion = require('./prompts/adaptiveQuestion.prompt');
const { SCHEMA_IDS } = require('./aiSchemas');

const REGISTRY = {
  [reportNarrative.promptId]: reportNarrative,
  [careerCoach.promptId]: careerCoach,
  [cvAnalysis.promptId]: cvAnalysis,
  [adaptiveQuestion.promptId]: adaptiveQuestion,
};

const getPromptRegistryEntry = (promptId) => REGISTRY[promptId] || null;

const assertPromptRegistryIntegrity = () => {
  for (const entry of Object.values(REGISTRY)) {
    if (!entry.promptId || !entry.version || !entry.outputSchemaId) {
      throw new Error('Invalid prompt registry entry');
    }
    if (!Array.isArray(entry.forbiddenClaims) || entry.forbiddenClaims.length === 0) {
      throw new Error(`Prompt ${entry.promptId} missing forbiddenClaims`);
    }
  }
  return true;
};

module.exports = {
  SCHEMA_IDS,
  getPromptRegistryEntry,
  assertPromptRegistryIntegrity,
  REGISTRY,
};
