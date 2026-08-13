export const marketingDemo = {
  profile: {
    bigFive: [['Openness', 76], ['Conscientiousness', 68], ['Extraversion', 54], ['Agreeableness', 63], ['Emotional steadiness', 71]],
    riasec: [['Realistic', 56], ['Investigative', 78], ['Artistic', 70], ['Social', 51], ['Enterprising', 57], ['Conventional', 62]],
    values: [['Autonomy', 82], ['Mastery', 76], ['Purpose', 68], ['Collaboration', 59]],
    signals: [['Technical Depth', 74], ['Learning Orientation', 81], ['Leadership', 52], ['Problem Solving', 79]],
  },
};

const media = (file, folder, alt, position = '50% 50%') => ({ file, folder, alt, position });

export const publicMedia = {
  hero: [
    media('hero-h1', 'hero', 'Professional working at a computer in an office environment', '58% 52%'),
    media('hero-h2', 'hero', 'Professional working on an architectural model at a desk'),
    media('hero-h3', 'hero', 'Designer sketching with a laptop and tools'),
    media('hero-h4', 'hero', 'Scientists working at computers in a laboratory'),
    media('hero-h5', 'hero', 'Hands repairing an electronic device with a soldering iron'),
  ],
  worlds: [
    media('world-w1', 'worlds', 'Colleagues working together in a software office'),
    media('world-w2', 'worlds', 'Developer working across multiple computer monitors'),
    media('world-w3', 'worlds', 'Person sketching an idea on paper'),
    media('world-w4', 'worlds', 'Architect examining a wooden model'),
    media('world-w5', 'worlds', 'Hand holding a complex electronic circuit board'),
    media('world-w6', 'worlds', 'Professional presenting data to colleagues'),
    media('world-w7', 'worlds', 'Control room with monitors and chairs'),
    media('world-w8', 'worlds', 'Person studying in a modern learning environment'),
    media('world-w9', 'worlds', 'Professional working at a large workshop table'),
    media('world-w10', 'worlds', 'Late-night technical environment filled with monitors'),
  ],
  careers: [
    media('career-c1', 'careers', 'Software professional working at a computer'),
    media('career-c2', 'careers', 'Designer working through wireframes at a desk'),
    media('career-c3', 'careers', 'Professional reviewing documents at a desk'),
    media('career-c4', 'careers', 'Professional prioritising work at a whiteboard'),
    media('career-c5', 'careers', 'Engineer operating factory equipment'),
    media('career-c6', 'careers', 'Laboratory team looking at a computer screen'),
    media('career-c7', 'careers', 'Operations control room with monitors'),
    media('career-c8', 'careers', 'Creative professional working in a studio'),
  ],
  progress: [
    media('progress-p1', 'progress', 'Quiet empty workspace beside a window'),
    media('progress-p2', 'progress', 'Prototype being made with a 3D printer'),
    media('progress-p3', 'progress', 'Precision work in a workshop'),
    media('progress-p4', 'progress', 'Team reviewing project evidence on a desk'),
    media('progress-p5', 'progress', 'Team collaborating around a whiteboard'),
    media('progress-p6', 'progress', 'People working in a professional computer environment'),
  ],
  howItWorks: [
    media('hiw-1', 'how-it-works', 'Research library with a person working'),
    media('hiw-2', 'how-it-works', 'Professional reviewing charts at a desk'),
    media('hiw-3', 'how-it-works', 'Laptop used as design evidence'),
    media('hiw-4', 'how-it-works', 'Advanced scientific equipment in a laboratory'),
  ],
  auth: {
    login: media('auth-login', 'auth', 'Person working quietly at a desk'),
    signup: media('auth-signup', 'auth', 'Colleagues collaborating around a conference table'),
  },
};
