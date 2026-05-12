/**
 * Manual profile entry: validate, sanitize, prompt-injection scan, normalize to CV pipeline shape.
 */

const { createHttpError } = require('../../utils/httpError');
const { normalizeCvData } = require('./unified-contracts.service');
const { scanUserText, wrapUntrustedUserContent } = require('../ai/aiPromptInjectionGuard.service');
const { CONSENT_VERSION } = require('../../config/dataRetention.constants');

const ALLOWED_BODY_KEYS = new Set([
  'currentStatus',
  'educationLevel',
  'fieldOfStudy',
  'skillsText',
  'projectsText',
  'experienceText',
  'certificationsText',
  'careerGoalsText',
  'preferredDomainsText',
  'workStyleText',
  'profileSummary',
  'consentAccepted',
  'consentVersion',
  'userRole',
]);

const MAX = {
  currentStatus: 400,
  educationLevel: 120,
  fieldOfStudy: 200,
  skillsText: 4000,
  projectsText: 6000,
  experienceText: 8000,
  certificationsText: 4000,
  careerGoalsText: 4000,
  preferredDomainsText: 2000,
  workStyleText: 2000,
  profileSummary: 8000,
};

const stripControl = (s) =>
  String(s || '')
    .replace(/\u0000/g, '')
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]{0,400}>/g, ' ')
    .replace(/javascript:/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

const sanitizeField = (value, maxLen) => {
  const t = stripControl(value);
  if (t.length > maxLen) {
    return t.slice(0, maxLen);
  }
  return t;
};

const splitLines = (text, limit = 48) =>
  String(text || '')
    .split(/\n+|•|;(?=\s)/)
    .map((line) => stripControl(line))
    .filter((line) => line.length > 1)
    .slice(0, limit);

const splitSkills = (text, limit = 48) => {
  const parts = String(text || '')
    .split(/[,;\n]+/)
    .map((p) => stripControl(p))
    .filter(Boolean);
  return Array.from(new Set(parts)).slice(0, limit);
};

const assertPlainObjectBody = (body) => {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw createHttpError(400, 'Invalid JSON body');
  }
  const keys = Object.keys(body);
  for (const key of keys) {
    if (!ALLOWED_BODY_KEYS.has(key)) {
      throw createHttpError(400, `Unexpected field: ${key}`);
    }
    const val = body[key];
    if (val != null && typeof val !== 'string' && typeof val !== 'boolean') {
      throw createHttpError(400, `Invalid type for field: ${key}`);
    }
  }
};

const aggregateInjectionScan = (parts) => {
  const patterns = new Set();
  let worst = 'none';
  for (const p of parts) {
    const r = scanUserText(p);
    r.patterns.forEach((id) => patterns.add(id));
    if (r.severity === 'high') worst = 'high';
    else if (r.severity === 'medium' && worst !== 'high') worst = 'medium';
  }
  return {
    suspicious: patterns.size > 0,
    patterns: Array.from(patterns),
    severity: worst,
  };
};

const assertSufficientManualProfile = (fields) => {
  const total =
    fields.profileSummary.length +
    fields.skillsText.length +
    fields.experienceText.length +
    fields.projectsText.length +
    fields.careerGoalsText.length;

  if (fields.profileSummary.length < 60) {
    throw createHttpError(
      400,
      'Profile summary is too short; add at least a few sentences about your background and goals.'
    );
  }

  if (fields.skillsText.length < 12) {
    throw createHttpError(400, 'Please list meaningful skills (comma- or line-separated).');
  }

  if (total < 220) {
    throw createHttpError(
      400,
      'Profile text is too thin overall; expand skills, experience, projects, or summary.'
    );
  }
};

const parseConsent = (body) => {
  if (body.consentAccepted !== true) {
    throw createHttpError(400, 'consentAccepted must be true to process your profile.');
  }
  const version = stripControl(body.consentVersion || CONSENT_VERSION).slice(0, 64) || CONSENT_VERSION;
  return {
    consentAccepted: true,
    consentVersion: version,
    acceptedAt: new Date(),
    profileSource: 'manual_profile',
  };
};

/**
 * @returns {{ cvData: object, cvRawText: string, normalizedManual: object, consent: object, injection: object }}
 */
const buildManualProfilePayload = (body = {}) => {
  assertPlainObjectBody(body);
  const consent = parseConsent(body);

  const fields = {
    currentStatus: sanitizeField(body.currentStatus, MAX.currentStatus),
    educationLevel: sanitizeField(body.educationLevel, MAX.educationLevel),
    fieldOfStudy: sanitizeField(body.fieldOfStudy, MAX.fieldOfStudy),
    skillsText: sanitizeField(body.skillsText, MAX.skillsText),
    projectsText: sanitizeField(body.projectsText, MAX.projectsText),
    experienceText: sanitizeField(body.experienceText, MAX.experienceText),
    certificationsText: sanitizeField(body.certificationsText, MAX.certificationsText),
    careerGoalsText: sanitizeField(body.careerGoalsText, MAX.careerGoalsText),
    preferredDomainsText: sanitizeField(body.preferredDomainsText, MAX.preferredDomainsText),
    workStyleText: sanitizeField(body.workStyleText, MAX.workStyleText),
    profileSummary: sanitizeField(body.profileSummary, MAX.profileSummary),
  };

  if (!fields.currentStatus || !fields.educationLevel || !fields.fieldOfStudy) {
    throw createHttpError(400, 'currentStatus, educationLevel, and fieldOfStudy are required.');
  }

  assertSufficientManualProfile(fields);

  const skills = splitSkills(fields.skillsText).map((name) => ({
    name,
    level: 3,
    category: 'manual_profile',
  }));

  const education = [
    fields.educationLevel,
    fields.fieldOfStudy,
    fields.currentStatus ? `Status: ${fields.currentStatus}` : '',
  ]
    .map((s) => stripControl(s))
    .filter(Boolean);

  const experience = splitLines(fields.experienceText, 36);
  const projects = splitLines(fields.projectsText, 48);
  const certifications = splitLines(fields.certificationsText, 32).map((c) => `Certification: ${c}`);
  const careerGoals = splitLines(fields.careerGoalsText, 24);
  const preferredDomains = splitLines(fields.preferredDomainsText, 24);
  const workStyleSignals = splitLines(fields.workStyleText, 24);

  const interests = [...preferredDomains, ...workStyleSignals].slice(0, 24);
  const careerSignals = [...careerGoals, ...preferredDomains].slice(0, 24);

  const injection = aggregateInjectionScan([
    fields.profileSummary,
    fields.skillsText,
    fields.experienceText,
    fields.projectsText,
    fields.certificationsText,
    fields.careerGoalsText,
    fields.preferredDomainsText,
    fields.workStyleText,
  ]);

  const confidence = injection.suspicious ? 0.42 : 0.58;
  const warnings = [];
  if (injection.suspicious) {
    warnings.push(
      `Some phrases resembled common prompt-injection patterns (${injection.patterns.slice(0, 4).join(', ')}). They were not executed as instructions; review your text if this was unintentional.`
    );
  }

  const normalizedManual = {
    skills: skills.map((s) => s.name),
    education,
    experience,
    projects,
    certifications: splitLines(fields.certificationsText, 32),
    careerGoals,
    preferredDomains,
    workStyleSignals,
    profileSource: 'manual_profile',
    confidence,
    warnings,
  };

  const cvPayload = {
    name: '',
    skills,
    subjects: [fields.fieldOfStudy].filter(Boolean),
    marks: [],
    projects,
    tools: certifications,
    education,
    experience,
    interests,
    careerSignals,
    confidenceScore: confidence,
    source: 'heuristic',
    schemaVersion: '1.0.0',
  };

  const cvData = normalizeCvData(cvPayload);

  const narrativeBlock = [
    wrapUntrustedUserContent('profile_summary', fields.profileSummary),
    wrapUntrustedUserContent('skills', fields.skillsText),
    wrapUntrustedUserContent('experience', fields.experienceText),
    wrapUntrustedUserContent('projects', fields.projectsText),
    wrapUntrustedUserContent('certifications', fields.certificationsText),
    wrapUntrustedUserContent('career_goals', fields.careerGoalsText),
    wrapUntrustedUserContent('domains', fields.preferredDomainsText),
    wrapUntrustedUserContent('work_style', fields.workStyleText),
  ].join('\n\n');

  const cvRawText = narrativeBlock.slice(0, 120000);

  return { cvData, cvRawText, normalizedManual, consent, injection };
};

module.exports = {
  buildManualProfilePayload,
  ALLOWED_BODY_KEYS,
  CONSENT_VERSION,
};
