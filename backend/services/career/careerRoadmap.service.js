const buildCareerRoadmap = ({ career, skillGap = {} }) => {
  const missing = (skillGap.missingCriticalSkills || []).slice(0, 4);
  const rec = (skillGap.recommendedSkills || []).slice(0, 4);
  const growth = (career.growthPath || []).slice(0, 4);

  const actions0 = [];
  if (missing[0]) actions0.push(`Strengthen ${missing[0]} with a focused mini-project`);
  if (missing[1]) actions0.push(`Practice ${missing[1]} fundamentals weekly`);
  if (!actions0.length) actions0.push('Document two measurable outcomes from current work or learning');

  const actions1 = [];
  if (rec[0]) actions1.push(`Add ${rec[0]} to a portfolio artifact`);
  if (rec[1]) actions1.push(`Pair ${rec[1]} learning with peer review or mentorship`);
  if (!actions1.length) actions1.push('Ship one portfolio project aligned to role expectations');

  const actions2 = [];
  if (growth[1]) actions2.push(`Target scope similar to: ${growth[1]}`);
  actions2.push('Practice structured interview stories tied to outcomes');

  return {
    careerId: career.careerId,
    timeline: [
      {
        stage: '0-30 days',
        title: 'Strengthen foundations',
        actions: actions0,
        skills: missing.slice(0, 3).length ? missing.slice(0, 3) : ['Core role skills'],
        evidenceBased: true,
      },
      {
        stage: '1-3 months',
        title: 'Build portfolio proof',
        actions: actions1,
        skills: rec.slice(0, 3).length ? rec.slice(0, 3) : (career.portfolioProjects || []).slice(0, 2),
        evidenceBased: true,
      },
      {
        stage: '3-6 months',
        title: 'Prepare for target roles',
        actions: actions2,
        skills: [...missing.slice(2), ...rec.slice(2)].filter(Boolean).slice(0, 4),
        evidenceBased: false,
      },
      {
        stage: '6-12 months',
        title: 'Expand impact and depth',
        actions: [
          (career.growthPath && career.growthPath[2]) ? `Aim toward: ${career.growthPath[2]}` : 'Seek stretch assignments with measurable scope',
          'Collect feedback on communication and ownership quarterly',
        ],
        skills: (career.recommendedSkills || []).slice(0, 3),
        evidenceBased: false,
      },
    ],
  };
};

module.exports = {
  buildCareerRoadmap,
};
