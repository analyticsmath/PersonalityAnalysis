const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const PAGE_MARGIN = 46;
const TOP_MARGIN = PAGE_HEIGHT - PAGE_MARGIN;
const DEFAULT_WRAP_WIDTH = 94;
const lineHeight = 14;
const sectionSpacing = 26;

const wrapLine = (text = '', width = DEFAULT_WRAP_WIDTH) => {
  const words = String(text || '')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);

  if (!words.length) {
    return [''];
  }

  const lines = [];
  let current = '';

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= width) {
      current = next;
      return;
    }

    lines.push(current);
    current = word;
  });

  if (current) {
    lines.push(current);
  }

  return lines;
};

const escapePdfText = (text = '') =>
  String(text || '')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');

const toBar = (value = 0) => {
  const score = Math.max(0, Math.min(100, Number(value) || 0));
  const size = Math.max(1, Math.round(score / 5));
  const empty = Math.max(0, 20 - size);
  return `${'#'.repeat(size)}${'-'.repeat(empty)}`;
};

const toConfidenceLabel = (confidenceBand = '', confidenceGap = 0) => {
  const band = String(confidenceBand || '').toLowerCase();
  if (band) {
    return `${band.toUpperCase()} (gap ${Math.round(Number(confidenceGap || 0))})`;
  }

  const gap = Number(confidenceGap || 0);
  if (gap < 5) return `LOW (gap ${gap})`;
  if (gap <= 15) return `MEDIUM (gap ${gap})`;
  return `HIGH (gap ${gap})`;
};

const extractOceanScores = (result) => {
  const bf = result.scores?.bigFive;
  if (
    bf &&
    typeof bf === 'object' &&
    bf.openness &&
    typeof bf.openness.score === 'number'
  ) {
    return {
      O: bf.openness.score,
      C: bf.conscientiousness?.score ?? 0,
      E: bf.extraversion?.score ?? 0,
      A: bf.agreeableness?.score ?? 0,
      ES: bf.emotionalStability?.score ?? 0,
      _source: 'phase3',
    };
  }
  const legacy = result.ocean_scores || result.trait_scores || {};
  return Object.keys(legacy).length > 0 ? { ...legacy, _source: 'legacy' } : null;
};

const extractCognitive = (result) => {
  const cs = result.cognitive_scores;
  if (cs && typeof cs === 'object' && Object.keys(cs).length > 0) {
    const vals = Object.values(cs).map(Number).filter(Number.isFinite);
    if (vals.some((v) => v > 0 && v !== 50)) return cs;
  }
  // Derive from careerSignals
  const sig = result.scores?.careerSignals;
  if (!sig || typeof sig !== 'object') return null;
  const getScore = (key) => {
    const entry = sig[key];
    if (!entry || typeof entry !== 'object') return null;
    const s = Number(entry.score);
    return Number.isFinite(s) ? s : null;
  };
  const analytical = getScore('analyticalThinking');
  const creative = getScore('creativity');
  const planning = getScore('planning');
  const problemSolving = getScore('problemSolving');
  const technicalDepth = getScore('technicalDepth');
  const domainFocus = getScore('domainFocus');
  const learningOrientation = getScore('learningOrientation');

  const avg2 = (a, b) => (a !== null && b !== null ? Math.round((a + b) / 2) : a ?? b);

  const derived = {
    analytical,
    creative,
    strategic: avg2(planning, problemSolving),
    systematic: planning,
    practical: avg2(technicalDepth, domainFocus),
    abstract: avg2(learningOrientation, creative),
  };
  const hasData = Object.values(derived).some((v) => v !== null);
  if (!hasData) return null;
  const filled = {};
  Object.entries(derived).forEach(([k, v]) => { filled[k] = v ?? 0; });
  return filled;
};

const extractBehavior = (result) => {
  const bv = result.behavior_vector;
  if (bv && typeof bv === 'object' && Object.keys(bv).length > 0) {
    const vals = Object.values(bv).map(Number).filter(Number.isFinite);
    if (vals.some((v) => v > 0 && v !== 50)) return bv;
  }
  const sig = result.scores?.careerSignals;
  if (!sig || typeof sig !== 'object') return null;
  const getScore = (key) => {
    const entry = sig[key];
    if (!entry || typeof entry !== 'object') return null;
    const s = Number(entry.score);
    return Number.isFinite(s) ? s : null;
  };
  const leadership = getScore('leadership');
  const riskTolerance = getScore('riskTolerance');
  const adaptability = getScore('adaptability');
  const collaboration = getScore('collaboration');
  const derived = {
    leadership,
    risk_tolerance: riskTolerance,
    decision_speed: adaptability,
    stress_tolerance: adaptability !== null ? Math.round(adaptability * 0.9) : null,
    team_preference: collaboration,
  };
  const hasData = Object.values(derived).some((v) => v !== null);
  if (!hasData) return null;
  const filled = {};
  Object.entries(derived).forEach(([k, v]) => { filled[k] = v ?? 0; });
  return filled;
};

const getDominantBehavior = (bv) => {
  if (!bv || typeof bv !== 'object') return null;
  const LABELS = {
    leadership: 'Leadership',
    risk_tolerance: 'Risk Tolerance',
    decision_speed: 'Decision Speed',
    stress_tolerance: 'Stress Tolerance',
    team_preference: 'Team Preference',
  };
  const entries = Object.entries(bv).filter(([, v]) => Number.isFinite(Number(v)));
  if (!entries.length) return null;
  const [topKey] = entries.sort((a, b) => Number(b[1]) - Number(a[1]))[0];
  return LABELS[topKey] || topKey;
};

const toConfidencePct = (v) => {
  const n = Number(v || 0);
  if (!Number.isFinite(n) || n < 0) return 0;
  // Orchestrator stores phase-4 confidence as a 0–1 decimal; legacy already 0–100.
  return Math.round(n <= 1.0 ? n * 100 : n);
};

const extractTopCareers = (result) => {
  // Prefer Phase 4 canonical data
  const phase4 = result.career_recommendations_phase4;
  if (phase4 && typeof phase4 === 'object') {
    const top = phase4.topRecommendations;
    if (Array.isArray(top) && top.length) {
      return top.slice(0, 6).map((item) => ({
        career: item.title || item.careerId || 'Role',
        score: Math.round(Number(item.fitScore || 0)),
        confidence: toConfidencePct(item.confidence),
        why_fit: Array.isArray(item.whyThisFits) ? (item.whyThisFits[0] || '') : String(item.whyThisFits || ''),
        cluster: item.category || '',
      }));
    }
  }
  // Fall back to legacy career_recommendations (confidence already 0–100)
  const legacy = Array.isArray(result.career_recommendations) ? result.career_recommendations : [];
  return legacy.slice(0, 6).map((c) => ({
    career: c.career || 'Role',
    score: Math.round(Number(c.score || 0)),
    confidence: toConfidencePct(c.confidence),
    why_fit: c.why_fit || '',
    cluster: c.cluster || '',
  }));
};

const toReportSections = ({ result }) => {
  const cv = result.cv_data || {};
  const careers = extractTopCareers(result);
  const roadmap = Array.isArray(result.career_roadmap) ? result.career_roadmap : [];
  const skills = Array.isArray(cv.skills) ? cv.skills : [];
  const topSkills = skills.slice(0, 8).map((item) => `${item.name} (${item.level}/5)`);
  const oceanRaw = extractOceanScores(result);
  const ocean = oceanRaw || {};
  const isPhase3Ocean = oceanRaw?._source === 'phase3';
  const cognitive = extractCognitive(result);
  const behavior = extractBehavior(result);
  const dominantBehavior = getDominantBehavior(behavior);
  const consistencyScore = Math.round(Number(result.consistency_score || 0) * 100);
  const narrativeSummary = String(result.narrative_summary || result.behavioral_summary || '').trim();
  const aiReport = result.ai_report || {};
  const strengths = Array.isArray(aiReport.strengths) ? aiReport.strengths : Array.isArray(result.dominant_strengths) ? result.dominant_strengths : [];
  const growthAreas = Array.isArray(aiReport.weaknesses) ? aiReport.weaknesses : Array.isArray(result.weaknesses) ? result.weaknesses : [];
  const facetScores = result.facetScores || result.facet_scores || {};
  const hasFacetData = Object.keys(facetScores).length > 0;
  const skillGaps = [];
  if (careers.length && careers[0]) {
    const top = careers[0];
    if (typeof top.why_fit === 'string' && top.why_fit) {
      skillGaps.push(top.why_fit);
    }
  }

  return [
    {
      title: 'Your Personality Assessment & Career Counseling Report',
      lines: [
        '',
        `Candidate: ${cv.name || 'Candidate'}`,
        `Date Generated: ${new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}`,
        `Archetype: ${result.personality_type_label || result.personality_type || 'Analytical Builder'}`,
        `Career Cluster: ${result.career_cluster || 'Not specified'}`,
        `Confidence: ${toConfidenceLabel(result.confidence_band, result.confidence_gap)}`,
        `Consistency: ${consistencyScore}%`,
        '',
        'Disclaimer: This report provides guidance only. It is not a medical or psychological',
        'diagnosis and must not be used as the sole basis for any hiring or selection decision.',
      ],
    },
    {
      title: 'Profile Summary',
      lines: [
        `Archetype: ${result.personality_type_label || result.personality_type || 'Analytical Builder'}`,
        '',
        ...wrapLine(narrativeSummary || (aiReport.summary ? String(aiReport.summary) : 'Narrative summary not available.')),
      ],
    },
    {
      title: 'Personality Snapshot — Big Five (OCEAN)',
      lines:
        Object.keys(ocean).filter((k) => k !== '_source').length === 0
          ? ['Insufficient scored evidence — complete the assessment for a full OCEAN profile.']
          : isPhase3Ocean
          ? [
              `Openness (O):              [${toBar(ocean.O)}] ${Math.round(Number(ocean.O || 0))}%`,
              `Conscientiousness (C):     [${toBar(ocean.C)}] ${Math.round(Number(ocean.C || 0))}%`,
              `Extraversion (E):          [${toBar(ocean.E)}] ${Math.round(Number(ocean.E || 0))}%`,
              `Agreeableness (A):         [${toBar(ocean.A)}] ${Math.round(Number(ocean.A || 0))}%`,
              `Emotional Stability (ES):  [${toBar(ocean.ES)}] ${Math.round(Number(ocean.ES || 0))}%`,
            ]
          : [
              `Openness (O):         [${toBar(ocean.O)}] ${Math.round(Number(ocean.O || 0))}%`,
              `Conscientiousness (C):[${toBar(ocean.C)}] ${Math.round(Number(ocean.C || 0))}%`,
              `Extraversion (E):      [${toBar(ocean.E)}] ${Math.round(Number(ocean.E || 0))}%`,
              `Agreeableness (A):     [${toBar(ocean.A)}] ${Math.round(Number(ocean.A || 0))}%`,
              `Emotional Stability:   [${toBar(100 - Number(ocean.N || 0))}] ${Math.round(100 - Number(ocean.N || 0))}%`,
            ],
    },
    {
      title: 'Strengths vs Growth Areas',
      lines: [
        '--- STRENGTHS --------------------------------',
        ...(strengths.length
          ? strengths.slice(0, 4).map((s, i) => `  ${i + 1}. ${s}`)
          : ['  Strengths appear in your AI report after generation.']),
        '',
        '--- GROWTH AREAS -----------------------------',
        ...(growthAreas.length
          ? growthAreas.slice(0, 4).map((w, i) => `  ${i + 1}. ${w}`)
          : ['  Growth areas appear in your AI report after generation.']),
      ],
    },
    {
      title: 'Cognitive Signals',
      lines: cognitive
        ? [
            `Analytical:  [${toBar(cognitive.analytical)}] ${Math.round(Number(cognitive.analytical || 0))}%`,
            `Creative:    [${toBar(cognitive.creative)}] ${Math.round(Number(cognitive.creative || 0))}%`,
            `Strategic:   [${toBar(cognitive.strategic)}] ${Math.round(Number(cognitive.strategic || 0))}%`,
            `Systematic:  [${toBar(cognitive.systematic)}] ${Math.round(Number(cognitive.systematic || 0))}%`,
            `Practical:   [${toBar(cognitive.practical)}] ${Math.round(Number(cognitive.practical || 0))}%`,
            `Abstract:    [${toBar(cognitive.abstract)}] ${Math.round(Number(cognitive.abstract || 0))}%`,
          ]
        : ['Cognitive signal data insufficient — complete more questions to unlock.'],
    },
    {
      title: 'Behavior Signals',
      lines: behavior
        ? [
            ...(dominantBehavior ? [`Dominant behavior signal: ${dominantBehavior}`, ''] : []),
            `Leadership:       [${toBar(behavior.leadership)}] ${Math.round(Number(behavior.leadership || 0))}%`,
            `Risk Tolerance:   [${toBar(behavior.risk_tolerance)}] ${Math.round(Number(behavior.risk_tolerance || 0))}%`,
            `Decision Speed:   [${toBar(behavior.decision_speed)}] ${Math.round(Number(behavior.decision_speed || 0))}%`,
            `Stress Tolerance: [${toBar(behavior.stress_tolerance)}] ${Math.round(Number(behavior.stress_tolerance || 0))}%`,
            `Team Preference:  [${toBar(behavior.team_preference)}] ${Math.round(Number(behavior.team_preference || 0))}%`,
          ]
        : ['Behavior signal data insufficient — complete the behavior section to unlock.'],
    },
    {
      title: 'Trait Facets / Heatmap',
      lines: hasFacetData
        ? Object.entries(facetScores).slice(0, 12).map(([k, v]) =>
            `${k.replace(/_/g, ' ')}: [${toBar(v)}] ${Math.round(Number(v || 0))}%`
          )
        : ['Facet-level data is not available for this assessment run.'],
    },
    {
      title: 'Career Match Landscape',
      lines: careers.length
        ? [
            'Role                           | Fit%  | Conf%',
            '--------------------------------------------',
            ...careers.slice(0, 6).map(
              (c) =>
                `${String(c.career).slice(0, 29).padEnd(30)} | ${String(c.score).padStart(4)}% | ${String(c.confidence).padStart(4)}%`
            ),
          ]
        : ['Career match data is not available.'],
    },
    {
      title: 'Top Career Suggestions',
      lines: careers.length
        ? careers.slice(0, 6).flatMap((career, index) => [
            `${index + 1}. ${career.career}  (Fit ${career.score}%  |  Confidence ${career.confidence}%)`,
            ...wrapLine(career.why_fit || ''),
            '',
          ])
        : ['No career suggestions available.'],
    },
    {
      title: 'Skill Gaps',
      lines: topSkills.length
        ? topSkills.map((skill, index) => `${index + 1}. ${skill}`)
        : skillGaps.length
        ? skillGaps.flatMap((line) => wrapLine(line))
        : ['Skill gap data will appear after career recommendations are generated.'],
    },
    {
      title: 'Roadmap',
      lines: roadmap.length
        ? roadmap.slice(0, 5).flatMap((item, index) => [
            `${index + 1}. ${item.stage || 'Stage'}`,
            ...wrapLine(item.summary || ''),
            '',
          ])
        : ['Roadmap data will appear after career recommendations are generated.'],
    },
    {
      title: 'AI Summary',
      lines: aiReport.summary
        ? [
            ...wrapLine(String(aiReport.summary)),
            '',
            ...(aiReport.workStyle ? ['Work style: ' + String(aiReport.workStyle)] : []),
            ...(aiReport.communicationStyle
              ? ['Communication style: ' + String(aiReport.communicationStyle)]
              : []),
          ]
        : [
            ...wrapLine(
              narrativeSummary ||
                'AI summary will appear after report generation. Deterministic scores above are the primary source of truth.'
            ),
          ],
    },
    {
      title: 'Disclaimer',
      lines: [
        'This report is intended as personal development guidance.',
        'It is not a medical, clinical, or psychological assessment.',
        'Scores are calculated from your assessment responses and profile evidence.',
        'The AI narrative layer adds context but does not alter your scores.',
        'Do not use this report as the sole basis for any hiring or selection decision.',
      ],
    },
  ];
};

const checkPageBreak = ({ state, requiredSpace = lineHeight }) => {
  if (state.y - requiredSpace < PAGE_MARGIN) {
    state.pages.push([]);
    state.pageIndex += 1;
    state.y = TOP_MARGIN;
  }
};

const pushTextLine = ({ state, text = '', font = 'F1', size = 11 }) => {
  checkPageBreak({ state, requiredSpace: lineHeight });

  const content = String(text || '').trim();
  if (content) {
    state.pages[state.pageIndex].push(
      `BT\n/${font} ${size} Tf\n1 0 0 1 ${PAGE_MARGIN} ${state.y.toFixed(2)} Tm\n(${escapePdfText(content)}) Tj\nET`
    );
  }

  state.y -= lineHeight;
};

const toPageStreams = (sections = []) => {
  const state = {
    pages: [[]],
    pageIndex: 0,
    y: TOP_MARGIN,
  };

  sections.forEach((section, sectionIndex) => {
    if (sectionIndex > 0) {
      state.y -= sectionSpacing;
    }

    checkPageBreak({ state, requiredSpace: lineHeight * 2 + sectionSpacing });
    // First section title uses a slightly larger size
    pushTextLine({ state, text: section.title, font: 'F2', size: sectionIndex === 0 ? 14 : 15 });
    state.y -= Math.max(4, Math.round(sectionSpacing / 3));

    const rawLines = Array.isArray(section.lines) ? section.lines : [];
    rawLines.forEach((rawLine) => {
      const wrapped = wrapLine(rawLine, DEFAULT_WRAP_WIDTH);
      wrapped.forEach((line) => {
        pushTextLine({ state, text: line, font: 'F1', size: 11 });
      });
    });
  });

  return state.pages.map((commands) => commands.join('\n'));
};

const buildPdfBufferFromStreams = (streams = []) => {
  const pageCount = streams.length;
  const objects = new Map();
  const kids = [];

  objects.set(1, '<< /Type /Catalog /Pages 2 0 R >>');

  streams.forEach((stream, index) => {
    const pageObjectId = 3 + index * 2;
    const contentObjectId = 4 + index * 2;
    const length = Buffer.byteLength(stream, 'utf8');

    objects.set(contentObjectId, `<< /Length ${length} >>\nstream\n${stream}\nendstream`);
    objects.set(
      pageObjectId,
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${
        3 + pageCount * 2
      } 0 R /F2 ${4 + pageCount * 2} 0 R >> >> /Contents ${contentObjectId} 0 R >>`
    );

    kids.push(`${pageObjectId} 0 R`);
  });

  objects.set(2, `<< /Type /Pages /Count ${pageCount} /Kids [${kids.join(' ')}] >>`);
  objects.set(3 + pageCount * 2, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  objects.set(4 + pageCount * 2, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');

  const orderedObjectIds = Array.from(objects.keys()).sort((a, b) => a - b);
  let pdf = '%PDF-1.4\n';
  const offsets = [0];

  orderedObjectIds.forEach((objectId) => {
    offsets[objectId] = Buffer.byteLength(pdf, 'utf8');
    pdf += `${objectId} 0 obj\n${objects.get(objectId)}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, 'utf8');
  const maxObjectId = orderedObjectIds[orderedObjectIds.length - 1];

  pdf += `xref\n0 ${maxObjectId + 1}\n`;
  pdf += '0000000000 65535 f \n';

  for (let objectId = 1; objectId <= maxObjectId; objectId += 1) {
    const offset = String(offsets[objectId] || 0).padStart(10, '0');
    pdf += `${offset} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${maxObjectId + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return Buffer.from(pdf, 'utf8');
};

const generateAssessmentPdfBuffer = ({ resultSummary }) => {
  const sections = toReportSections({ result: resultSummary || {} });
  const streams = toPageStreams(sections);
  return buildPdfBufferFromStreams(streams);
};

module.exports = {
  generateAssessmentPdfBuffer,
};
