const { CAREER_PROFILE_VERSION, SIGNAL_KEYS } = require('./careerFitTypes');
const { listCareers } = require('./careerTaxonomy.service');
const { analyzeSkillGap } = require('./skillGap.service');
const { computeCareerFit, extractUserMaps } = require('./careerMatching.service');
const { buildCareerRoadmap } = require('./careerRoadmap.service');

const toText = (v) => String(v || '').trim();

const topMatchedSignals = (userSignals = {}, careerSignals = {}) => {
  const scored = SIGNAL_KEYS.map((k) => {
    const u = Number(userSignals[k] || 0);
    const c = Number(careerSignals[k] || 0);
    const closeness = 100 - Math.abs(u - c);
    return { k, closeness, u, c };
  })
    .filter((x) => x.u >= 52 && x.c >= 52)
    .sort((a, b) => b.closeness - a.closeness)
    .slice(0, 4)
    .map((x) => x.k);
  return scored.length ? scored : SIGNAL_KEYS.slice(0, 3);
};

const classifyFitType = ({ fitScore, confidence, skillReadinessScore }) => {
  if (fitScore >= 78 && confidence >= 0.55 && skillReadinessScore >= 58) return 'bestFit';
  if (fitScore >= 68 && skillReadinessScore < 56) return 'stretchFit';
  if (fitScore >= 54) return 'exploratoryFit';
  return 'lowerFitButPossible';
};

const buildWhyFits = ({ career: _career, fitBreakdown, hasCv }) => {
  const lines = [];
  if (fitBreakdown.riasecFit >= 72) lines.push('Your RIASEC interest pattern aligns closely with this role profile.');
  else if (fitBreakdown.riasecFit >= 60) lines.push('Several RIASEC dimensions overlap with this career profile.');
  if (fitBreakdown.workValuesFit >= 70) lines.push('Your stated work values are broadly compatible with this path.');
  if (fitBreakdown.personalityFit >= 68) lines.push('Work-style signals (Big Five snapshot) are reasonably aligned.');
  if (hasCv && fitBreakdown.skillFit >= 62) lines.push('CV or profile skills overlap with important role skills.');
  if (!hasCv) lines.push('Skill alignment is inferred mainly from assessment signals because CV detail is limited.');
  if (!lines.length) lines.push('There is moderate overlap between your current signals and this career profile.');
  return lines.slice(0, 4);
};

const runCareerRecommendationOrchestrator = ({
  scoringOutput = {},
  cvData = {},
  aiProfile = {},
  userProfile = {},
} = {}) => {
  const scoreMeta = scoringOutput?.scoreMeta || {};
  const scores = scoringOutput?.scores || {};
  const warnings = [...(Array.isArray(scoringOutput?.warnings) ? scoringOutput.warnings : [])];

  const locked = String(scoreMeta.scoreValidity || '') === 'invalid';
  if (locked) {
    return {
      careerProfileVersion: CAREER_PROFILE_VERSION,
      generatedAt: new Date().toISOString(),
      locked: true,
      preliminary: false,
      recommendations: {
        bestFits: [],
        stretchFits: [],
        exploratoryFits: [],
        lowerFitButPossible: [],
      },
      topRecommendations: [],
      skillGapSummary: { note: 'Career recommendations unavailable for invalid score data.' },
      roadmaps: [],
      warnings: [...warnings, 'Career intelligence is locked because assessment score validity is invalid.'],
    };
  }

  const cvSkills = (Array.isArray(cvData.skills) ? cvData.skills : [])
    .map((s) => toText(s?.name || s))
    .filter(Boolean);
  const profileSkills = (Array.isArray(userProfile.skills) ? userProfile.skills : [])
    .map((s) => toText(typeof s === 'string' ? s : s?.name))
    .filter(Boolean);
  const hasCv = cvSkills.length > 0 || (Array.isArray(cvData.experience) && cvData.experience.length > 0);

  if (!hasCv) {
    warnings.push('Skill fit confidence is reduced because structured CV skills are sparse or missing.');
  }

  const preliminary =
    String(scoreMeta.scoreValidity || '') === 'insufficient_data' ||
    String(scoreMeta.scoreValidity || '') === 'partial' ||
    !scoreMeta.isFinal;

  if (preliminary) {
    warnings.push(
      'Career recommendations are preliminary because assessment evidence is limited or score validity is partial.'
    );
  }

  const userMaps = extractUserMaps(scores);
  const careers = listCareers();
  const enriched = careers.map((career) => {
    const skillGap = analyzeSkillGap({
      career,
      cvSkillNames: cvSkills,
      profileSkills,
      careerSignalsUser: userMaps.careerSignals || {},
    });
    const fit = computeCareerFit({
      career,
      scores,
      skillReadinessScore: skillGap.skillReadinessScore,
      cvEducation: cvData.education || [],
      aiDomain: aiProfile.domain || aiProfile.field || '',
      hasCv,
      scoreMeta,
    });
    const roadmap = buildCareerRoadmap({ career, skillGap });
    const fitType = classifyFitType({
      fitScore: fit.fitScore,
      confidence: fit.confidence,
      skillReadinessScore: skillGap.skillReadinessScore,
    });

    const whyThisFits = buildWhyFits({ career, fitBreakdown: fit.fitBreakdown, hasCv });
    const whyThisMayBeChallenging = (career.riskFactors || [])
      .slice(0, 3)
      .map((t) => toText(t))
      .filter(Boolean);
    if (skillGap.missingCriticalSkills?.length) {
      whyThisMayBeChallenging.push(
        `Skill development likely needed in: ${skillGap.missingCriticalSkills.slice(0, 3).join(', ')}.`
      );
    }
    if (career.licensingNote) {
      whyThisMayBeChallenging.push(career.licensingNote);
    }

    return {
      careerId: career.careerId,
      title: career.title,
      category: career.category,
      fitScore: fit.fitScore,
      confidence: fit.confidence,
      fitType,
      fitBreakdown: fit.fitBreakdown,
      whyThisFits,
      whyThisMayBeChallenging: whyThisMayBeChallenging.slice(0, 5),
      topMatchedSignals: topMatchedSignals(userMaps.careerSignals || {}, career.careerSignals || {}),
      skillGaps: {
        matchedSkills: skillGap.matchedSkills,
        missingCriticalSkills: skillGap.missingCriticalSkills,
        recommendedSkills: skillGap.recommendedSkills,
        skillReadinessScore: skillGap.skillReadinessScore,
        evidenceSources: skillGap.evidenceSources,
      },
      recommendedNextSteps: (roadmap.timeline[0]?.actions || []).slice(0, 4),
      roadmap,
      licensingNote: career.licensingNote || '',
    };
  });

  enriched.sort((a, b) => b.fitScore - a.fitScore);

  const buckets = {
    bestFits: [],
    stretchFits: [],
    exploratoryFits: [],
    lowerFitButPossible: [],
  };

  enriched.forEach((item) => {
    const key =
      item.fitType === 'bestFit'
        ? 'bestFits'
        : item.fitType === 'stretchFit'
        ? 'stretchFits'
        : item.fitType === 'exploratoryFit'
        ? 'exploratoryFits'
        : 'lowerFitButPossible';
    buckets[key].push(item);
  });

  Object.keys(buckets).forEach((k) => {
    buckets[k] = buckets[k].slice(0, 12);
  });

  const topRecommendations = enriched.slice(0, 10);
  const roadmaps = enriched.slice(0, 6).map((e) => ({
    careerId: e.careerId,
    title: e.title,
    timeline: e.roadmap?.timeline || [],
  }));

  const skillGapSummary = {
    topCareerId: topRecommendations[0]?.careerId || null,
    averageReadiness:
      topRecommendations.length > 0
        ? Math.round(
            topRecommendations.reduce((s, r) => s + (r.skillGaps?.skillReadinessScore || 0), 0) /
              topRecommendations.length
          )
        : null,
  };

  return {
    careerProfileVersion: CAREER_PROFILE_VERSION,
    generatedAt: new Date().toISOString(),
    locked: false,
    preliminary,
    recommendations: buckets,
    topRecommendations,
    skillGapSummary,
    roadmaps,
    warnings,
  };
};

const toLegacyRecommendations = (orchestratorOutput = {}) => {
  const flat = [
    ...(orchestratorOutput.recommendations?.bestFits || []),
    ...(orchestratorOutput.recommendations?.stretchFits || []),
    ...(orchestratorOutput.recommendations?.exploratoryFits || []),
    ...(orchestratorOutput.recommendations?.lowerFitButPossible || []),
  ];

  const seen = new Set();
  const unique = [];
  flat.forEach((item) => {
    if (seen.has(item.careerId)) return;
    seen.add(item.careerId);
    unique.push(item);
  });

  unique.sort((a, b) => b.fitScore - a.fitScore);

  return unique.slice(0, 10).map((item) => ({
    career: item.title,
    career_id: item.careerId,
    cluster: item.category,
    score: item.fitScore,
    role_match: item.fitScore,
    personality_score: item.fitBreakdown?.personalityFit ?? item.fitScore,
    career_score: item.fitScore,
    skill_alignment: item.skillGaps?.skillReadinessScore ?? 50,
    personality_alignment: item.fitBreakdown?.personalityFit ?? 50,
    cognitive_match: item.fitBreakdown?.goalFit ?? 50,
    behavior_match: item.fitBreakdown?.riasecFit ?? 50,
    why_fit: item.whyThisFits[0] || 'Deterministic multi-factor fit alignment.',
    explanation: {
      top_signals: item.topMatchedSignals,
      summary: `Phase 4 fit score ${item.fitScore} (deterministic).`,
    },
    key_skills_to_build: item.skillGaps?.missingCriticalSkills || [],
    skill_gaps: item.skillGaps?.missingCriticalSkills || [],
    growth_suggestions: item.recommendedNextSteps || [],
    roadmap_timeline: (item.roadmap?.timeline || []).map((t) => ({
      stage: t.stage,
      summary: `${t.title}: ${(t.actions || []).join('; ')}`,
    })),
    confidence: Math.round((item.confidence || 0) * 100),
    confidence_band: item.confidence >= 0.65 ? 'high' : item.confidence >= 0.45 ? 'medium' : 'low',
    reason: 'Deterministic career intelligence (Phase 4).',
    phase4: {
      fitType: item.fitType,
      fitBreakdown: item.fitBreakdown,
      preliminary: orchestratorOutput.preliminary,
      whyThisMayBeChallenging: item.whyThisMayBeChallenging,
    },
  }));
};

module.exports = {
  runCareerRecommendationOrchestrator,
  toLegacyRecommendations,
};
