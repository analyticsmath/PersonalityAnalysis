export const CAREER_WORLDS = [
  {
    id: 'structured-systems',
    name: 'Structured Systems',
    thesis: 'Precision becomes a working condition.',
    description: 'Clear boundaries, accountable interfaces and rigorous verification reward deliberate execution.',
    tension: 'A poor fit can emerge when authority is unclear or scope and dependencies keep shifting.',
    media: '/media/public-experience/digital/code-detail-1920.webp',
    roleKeys: ['software_engineer', 'backend_engineer', 'electrical_engineer', 'embedded_engineer'],
    physics: 'align',
  },
  {
    id: 'deep-inquiry',
    name: 'Deep Inquiry',
    thesis: 'The question stays open longer.',
    description: 'Investigation, observation and root-cause depth matter more than premature certainty.',
    tension: 'A poor fit can emerge when delivery is rushed before assumptions can be tested.',
    media: '/media/public-experience/digital/wireframe-1920.webp',
    roleKeys: ['data_analyst', 'machine_learning_engineer', 'cybersecurity_analyst', 'business_analyst'],
    physics: 'inspect',
  },
  {
    id: 'collaborative-delivery',
    name: 'Collaborative Delivery',
    thesis: 'Clarity becomes coordination.',
    description: 'Shared ownership, communication and negotiated priorities turn individual judgment into collective progress.',
    tension: 'A poor fit can emerge when dependencies stay hidden or priorities are not shared.',
    media: '/media/public-experience/digital/collaborate-1920.webp',
    roleKeys: ['product_manager', 'technical_program_manager', 'customer_success_manager'],
    physics: 'gather',
  },
  {
    id: 'technical-control',
    name: 'Technical Control',
    thesis: 'The system answers back in real time.',
    description: 'Telemetry, intervention and operational accountability compress the distance between signal and action.',
    tension: 'A poor fit can emerge when feedback is delayed and operational ownership is unclear.',
    media: '/media/public-experience/digital/studio-1920.webp',
    roleKeys: ['devops_engineer', 'power_systems_engineer', 'control_systems_engineer', 'automation_engineer'],
    physics: 'respond',
  },
  {
    id: 'creative-synthesis',
    name: 'Creative Synthesis',
    thesis: 'Possibility becomes a material.',
    description: 'Rapid iteration, visual judgment and generative exploration stay useful when they can still resolve into a system.',
    tension: 'A poor fit can emerge when approvals block iteration or ideas never reach implementation.',
    media: '/media/public-experience/digital/designer-1920.webp',
    roleKeys: ['frontend_engineer', 'ux_designer'],
    physics: 'compose',
  },
];

export const CAREER_PRESENTATION_DISCLAIMER =
  'These five environments organize related roles for exploration. They do not predict your personal match; complete your profile to compare careers against your own assessment results.';

export function getCareerWorldForRole(roleKey) {
  return CAREER_WORLDS.find((world) => world.roleKeys.includes(roleKey)) || null;
}

export function getCareerWorld(index) {
  const safe = Math.max(0, Math.min(CAREER_WORLDS.length - 1, index));
  return CAREER_WORLDS[safe];
}

export default CAREER_WORLDS;
