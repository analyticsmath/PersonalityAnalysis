import { marketingDemo, methodology } from '../../content/personalityMarketingDemo';

// Static, public-safe demonstration authority for this DEV-only art-direction proof.
// It is intentionally kept outside the rendering components: the proof does not
// calculate a result or a career match in the browser.
export const proofDemo = {
  label: `${marketingDemo.label} — demonstration data`,
  portrait: [
    {
      id: 'big-five', label: 'Big Five', dimensions: [
        ['Openness', 76], ['Conscientiousness', 68], ['Extraversion', 54], ['Agreeableness', 63], ['Neuroticism', 41],
      ],
    },
    {
      id: 'riasec', label: 'RIASEC', dimensions: [
        ['Realistic', 44], ['Investigative', 78], ['Artistic', 70], ['Social', 58], ['Enterprising', 57], ['Conventional', 52],
      ],
    },
    {
      id: 'work-values', label: 'Work values', dimensions: [
        ['Intrinsic', 71], ['Extrinsic', 46], ['Lifestyle', 62], ['Relationships', 59], ['Prestige', 48], ['Independence', 74], ['Security', 66], ['Growth', 82],
      ],
    },
    {
      id: 'career-signals', label: 'Career signals', dimensions: [
        ['Technical depth', 67], ['Learning orientation', 76], ['Leadership', 55], ['Problem solving', 80],
      ],
    },
  ],
  careers: {
    ux: {
      id: 'ux', name: 'UX Designer', image: 'pa-proof-ux-wireframes',
      alt: 'Hands drawing a wireframe on paper beside work materials',
      copy: 'The same profile makes a different relationship with exploratory, user-centred design work.',
      emphasis: ['Openness', 'Artistic', 'Relationships'],
      alignment: [68, 63, 72, 73, 46, 41, 82, 88, 64, 76, 70, 56, 65, 55, 67, 72, 74, 60, 57, 70, 52, 74, 68],
    },
    software: {
      id: 'software', name: 'Software Engineer', image: 'pa-career-software-engineer',
      alt: 'Developer working at a computer in a software environment',
      copy: 'The profile stays visible while its relationship shifts toward technical depth and structured problem solving.',
      emphasis: ['Conscientiousness', 'Technical depth', 'Problem solving'],
      alignment: [71, 82, 48, 54, 56, 62, 86, 47, 45, 54, 78, 74, 55, 61, 60, 78, 72, 71, 68, 58, 88, 86, 91],
    },
  },
  context: [
    ['Education', 'Human-centred design'], ['Field', 'Digital products'], ['Skills', 'Research · prototyping · systems thinking'], ['Professional goal', 'Explore career direction'],
  ],
  methods: methodology,
};

