export const CAREER_WORLDS = [
  {
    id: 'structured-systems',
    index: '01',
    name: 'Structured Systems',
    thesis: 'Precision becomes a working condition.',
    description: 'Clear boundaries, accountable interfaces and rigorous verification reward deliberate execution.',
    tension: 'Ambiguous authority, shifting scope and uncalibrated dependencies.',
    media: '/media/public-experience/cinematic/1645258044234-f4ba2655baf1.jpg',
    roleKeys: ['software_engineer', 'backend_engineer', 'electrical_engineer', 'embedded_engineer'],
    physics: 'align',
  },
  {
    id: 'deep-inquiry',
    index: '02',
    name: 'Deep Inquiry',
    thesis: 'The question stays open longer.',
    description: 'Investigation, observation and root-cause depth matter more than premature certainty.',
    tension: 'Superficial delivery pressure and unverified assumptions.',
    media: '/media/public-experience/digital/code-detail-1920.webp',
    roleKeys: ['data_analyst', 'machine_learning_engineer', 'cybersecurity_analyst', 'business_analyst'],
    physics: 'inspect',
  },
  {
    id: 'collaborative-delivery',
    index: '03',
    name: 'Collaborative Delivery',
    thesis: 'Clarity becomes coordination.',
    description: 'Shared ownership, communication and negotiated priorities turn individual judgment into collective progress.',
    tension: 'Silos, hidden dependencies and uncommunicated priority shifts.',
    media: '/media/public-experience/digital/collaborate-1920.webp',
    roleKeys: ['product_manager', 'technical_program_manager', 'customer_success_manager'],
    physics: 'gather',
  },
  {
    id: 'technical-control',
    index: '04',
    name: 'Technical Control',
    thesis: 'The system answers back in real time.',
    description: 'Telemetry, intervention and operational accountability compress the distance between signal and action.',
    tension: 'Delayed feedback, unmonitored change and weak incident ownership.',
    media: '/media/public-experience/cinematic/1554863798-d89af6030d7d.jpg',
    roleKeys: ['devops_engineer', 'power_systems_engineer', 'control_systems_engineer', 'automation_engineer'],
    physics: 'respond',
  },
  {
    id: 'creative-synthesis',
    index: '05',
    name: 'Creative Synthesis',
    thesis: 'Possibility becomes a material.',
    description: 'Rapid iteration, visual judgment and generative exploration stay useful when they can still resolve into a system.',
    tension: 'Premature optimization, rigid approvals and ideas without execution discipline.',
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
