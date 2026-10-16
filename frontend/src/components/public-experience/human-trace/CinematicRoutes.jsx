import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import careersData from '../../../content/careers.json';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { CAREER_PRESENTATION_DISCLAIMER, CAREER_WORLDS } from './careerWorlds';
import { CinemaLink } from './CinematicPublicShell';

gsap.registerPlugin(ScrollTrigger);

const CAREER_RAIL_QUERY = '(min-width: 901px) and (min-height: 700px) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

const PATH = '/media/public-experience/cinematic/';
const PHOTO = {
  source: '/media/public-experience/digital/designer-1920.webp',
  detail: '/media/public-experience/digital/wireframe-1920.webp',
  precision: `${PATH}1645258044234-f4ba2655baf1.jpg`,
  autonomy: '/media/public-experience/digital/code-detail-1920.webp',
  shared: '/media/public-experience/digital/studio-1920.webp',
  collaboration: '/media/public-experience/digital/collaborate-1920.webp',
  pressure: `${PATH}1554863798-d89af6030d7d.jpg`,
  inquiry: '/media/public-experience/digital/code-detail-1920.webp',
  proof: '/media/public-experience/digital/wireframe-1920.webp',
  design: '/media/public-experience/digital/designer-1920.webp',
};

function Cover({ lines, image, alt, description, position = 'center', variant = '', family = 'context-media', transitionKey = 'working-context' }) {
  return (
    <section className={`vt-cover vt-cover--${variant}`}>
      <div className="vt-cover-media" data-transition-family={family} data-transition-key={transitionKey}>
        <img className="vt-cover-photo" src={image} alt={alt} style={{ objectPosition: position }} fetchPriority="high" />
        <div className="vt-cover-shade" aria-hidden="true" />
      </div>
      <div className="vt-cover-copy">
        <h1>{lines.map((line) => <span key={line}>{line}</span>)}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}

function NextChapter({ to, title, subtitle, image, family = 'context-media', transitionKey = 'working-context' }) {
  return (
    <CinemaLink className="vt-next" to={to} data-transition-family={family} data-transition-key={transitionKey}>
      <img src={image} loading="lazy" alt="" />
      <div className="vt-next-shade" aria-hidden="true" />
      <div className="vt-next-content"><strong>{title}</strong><span>{subtitle}</span></div>
      <span className="vt-next-arrow" aria-hidden="true">↗</span>
    </CinemaLink>
  );
}

function PageFrame({ children, className = '', rootRef }) {
  return <div ref={rootRef} className={`vt-route vt-route--${className}`}>{children}</div>;
}

function useHowTrace(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const stage = root.querySelector('[data-how-stage]');
    const steps = [...root.querySelectorAll('[data-how-step]')];
    if (!stage || !steps.length) return undefined;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 901px) and (prefers-reduced-motion:no-preference)', () => {
      const triggers = steps.map((step) => ScrollTrigger.create({
        trigger: step,
        start: 'top 58%',
        end: 'bottom 58%',
        onEnter: () => { stage.dataset.howState = step.dataset.howStep; },
        onEnterBack: () => { stage.dataset.howState = step.dataset.howStep; },
      }));
      return () => triggers.forEach((trigger) => trigger.kill());
    });
    return () => mm.revert();
  }, [rootRef]);
}

function HowMobileArtifact({ state }) {
  return (
    <div className={`vt-how-mobile-state vt-how-mobile-state--${state}`} aria-hidden="true">
      <span>Your response stays in context.</span>
      {state === 'isolate' && <div className="vt-how-mini-clauses"><i /><i /><i /></div>}
      {state === 'branch' && <div className="vt-how-mini-branch"><i /><i /><i /></div>}
      {state === 'weight' && <div className="vt-how-mini-mass"><i /><i /><i /><i /></div>}
      {state === 'recompose' && <div className="vt-how-mini-record" />}
    </div>
  );
}

export function HowCinematicPage() {
  const rootRef = useRef(null);
  const steps = PUBLIC_CONTENT.how.movements;
  const weights = PUBLIC_CONTENT.home.calibration.weights;
  const copy = [
    ['Start with your own words.', 'Your response stays with the question and the situation it describes.'],
    ['Notice what matters.', 'Parts of an answer may point to different habits of thinking and acting. One answer is a starting point, not a conclusion.'],
    ['Look from more than one angle.', 'Personality, interests and work values describe different parts of the picture. Each needs enough evidence.'],
    ['See what contributes.', 'Career comparisons use explicit weights for interests, skills, values, traits, education and goals. You can inspect the calculation.'],
    ['Bring the picture together.', 'Your professional profile connects the interpretation to its evidence and keeps its limits visible.'],
  ];

  useHowTrace(rootRef);

  return (
    <PageFrame className="how" rootRef={rootRef}>
      <Cover lines={['From your answers.', 'To your perspective.']} image={PHOTO.detail} alt="A website wireframe sketched on paper" description="Understand how your responses contribute to a profile of your personality, interests and work values." position="55% 45%" variant="how" family="human-trace" transitionKey="source-response" />

      <div className="vt-essay-intro"><h2>Before the inference,<br/><em>there is a source.</em></h2><p>A single answer can suggest questions worth asking. A scored profile requires sufficient independent evidence.</p></div>

      <div className="vt-how-sequence">
        <aside className="vt-how-fixed">
          <div className="vt-how-trace-stage" data-how-stage data-how-state="capture" data-transition-family="human-trace" data-transition-key="source-response">
            <figure className="vt-how-context"><img src={PHOTO.source} alt="A designer considering an interface in context" loading="lazy" /><div aria-hidden="true" /></figure>
            <p className="vt-how-source-card">Your response stays connected to the question and situation it describes.</p>
            <div className="vt-how-clause-stage" aria-hidden="true"><span>Response</span><span>Context</span><span>Evidence</span><span>Interpretation</span><span>Limit</span></div>
            <div className="vt-how-branch-stage" aria-hidden="true"><span>Big Five</span><span>RIASEC</span><span>Work Values</span></div>
            <div className="vt-how-weight-stage" aria-hidden="true">{weights.map((weight) => <i key={weight.id} style={{ '--weight': weight.percentage }}><b>{weight.percentage}%</b><span>{weight.label}</span></i>)}</div>
            <div className="vt-how-record-stage" aria-hidden="true"><strong>Source retained.</strong><strong>Weights explicit.</strong><strong>Limits visible.</strong></div>
            
          </div>
        </aside>

        <div className="vt-how-steps">
          {steps.map((step, index) => (
            <article key={step.id} className="vt-how-step" data-how-step={step.id} id={`step-${step.id}`}>
              <HowMobileArtifact state={step.id} />
              <h2>{copy[index][0]}</h2>
              <p>{copy[index][1]}</p>
              {step.id === 'branch' && <div className="vt-framework-small">{PUBLIC_CONTENT.home.models.list.slice(0, 3).map((model) => <span key={model.id}>{model.name}</span>)}</div>}
              {step.id === 'weight' && <div className="vt-weight-legend">{weights.map((weight) => <span key={weight.id}>{weight.label} <b>{weight.percentage}%</b></span>)}</div>}
            </article>
          ))}
        </div>
      </div>

      <section className="vt-quiet-end"><h2>No single response<br/>becomes a verdict.</h2><p>Inputs, inferred dimensions, explicit weights and limitations belong to separate stages of the record.</p><CinemaLink className="vt-text-link" to="/methodology">Examine the methodology ↗</CinemaLink></section>
      <NextChapter to="/career-intelligence" title="Explore your possibilities." subtitle="The same evidence meets different working conditions." image={PHOTO.precision} family="human-trace" transitionKey="source-response" />
    </PageFrame>
  );
}

const displayRequirement = (value) => ({
  javascript: 'JavaScript', typescript: 'TypeScript', 'node.js': 'Node.js', react: 'React', 'html/css': 'HTML & CSS',
  apis: 'APIs', 'api design': 'API design', sql: 'SQL', nosql: 'NoSQL', python: 'Python', 'c++': 'C++',
  'ci/cd': 'CI/CD', aws: 'AWS', 'ux design': 'UX design', 'ui design': 'UI design',
}[value] || value.charAt(0).toUpperCase() + value.slice(1));

const mediaForRole = (key, fallback) => {
  if (/designer|frontend|product_manager/.test(key)) return PHOTO.design;
  if (/software|backend|data|machine_learning|cybersecurity|business_analyst|devops/.test(key)) return PHOTO.inquiry;
  if (/success|program_manager/.test(key)) return PHOTO.shared;
  if (/power_systems|control_systems|automation|electrical|embedded/.test(key)) return PHOTO.precision;
  return fallback || PHOTO.autonomy;
};

function useCareerWorldTimeline(rootRef, setActiveWorld) {
  useEffect(() => {
    const root = rootRef.current;
    const track = root?.querySelector('[data-career-world-track]');
    const rail = track?.querySelector('.vt-career-world-stack');
    if (!track || !rail) return undefined;

    const mm = gsap.matchMedia();
    mm.add(CAREER_RAIL_QUERY, () => {
      const lastWorld = CAREER_WORLDS.length - 1;
      let previous = -1;
      let settledWorld = 0;
      const syncSettledWorld = (progress) => {
        const value = Math.max(0, Math.min(1, progress));
        if (value <= 0.02) {
          settledWorld = 0;
          return;
        }
        if (value >= 0.98) {
          settledWorld = lastWorld;
          return;
        }
        const nearest = Math.round(value * lastWorld);
        if (Math.abs(value - nearest / lastWorld) <= 0.025) settledWorld = nearest;
      };
      const boundedProgress = (progress) => {
        const rawPosition = Math.max(0, Math.min(1, progress)) * lastWorld;
        return Math.max(settledWorld - 1, Math.min(settledWorld + 1, rawPosition));
      };
      const boundedSnapStop = (progress) => {
        const requested = Math.round(Math.max(0, Math.min(1, progress)) * lastWorld);
        const allowed = Math.max(settledWorld - 1, Math.min(settledWorld + 1, requested));
        return allowed / lastWorld;
      };
      const render = (progress) => {
        const position = boundedProgress(progress);
        const index = Math.round(position);
        rail.style.transform = 'translate3d(' + (-position * 20) + '%, 0, 0)';

        if (index !== previous) {
          previous = index;
          setActiveWorld(index);
        }
      };

      render(0);
      const trigger = ScrollTrigger.create({
        trigger: track,
        start: 'top 84px',
        end: 'bottom bottom',
        scrub: 0.7,
        snap: {
          snapTo: boundedSnapStop,
          duration: { min: 0.72, max: 1.0 },
          delay: 0.18,
          ease: 'power2.out',
        },
        invalidateOnRefresh: true,
        onUpdate: (self) => render(self.progress),
        onSnapComplete: (self) => { settledWorld = Math.round(self.progress * lastWorld); },
        onRefresh: (self) => {
          syncSettledWorld(self.progress);
          render(self.progress);
        },
      });

      return () => {
        trigger.kill();
        rail.style.removeProperty('transform');
      };
    });
    return () => mm.revert();
  }, [rootRef, setActiveWorld]);
}
export function CareerCinematicPage() {
  const rootRef = useRef(null);
  const [activeWorld, setActiveWorld] = useState(0);
  const [horizontalWorlds, setHorizontalWorlds] = useState(
    () => window.matchMedia(CAREER_RAIL_QUERY).matches
  );
  const [selectedByWorld, setSelectedByWorld] = useState(() => Object.fromEntries(CAREER_WORLDS.map((world) => [world.id, world.roleKeys[0]])));
  const roleRefs = useRef({});

  useCareerWorldTimeline(rootRef, setActiveWorld);

  useEffect(() => {
    const media = window.matchMedia(CAREER_RAIL_QUERY);
    const update = (event) => setHorizontalWorlds(event.matches);
    update(media);
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  const handleRoleKeyDown = (event, world, roleIndex) => {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const direction = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1;
    const next = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? world.roleKeys.length - 1
        : (roleIndex + direction + world.roleKeys.length) % world.roleKeys.length;
    const roleKey = world.roleKeys[next];
    setSelectedByWorld((current) => ({ ...current, [world.id]: roleKey }));
    roleRefs.current[`${world.id}:${roleKey}`]?.focus({ preventScroll: true });
  };

  return (
    <PageFrame className="career" rootRef={rootRef}>
      <Cover lines={['Find work', 'that speaks to you.']} image={PHOTO.design} alt="A product designer sketching a digital interface" description="Explore the skills, interests and conditions behind different careers. Give your next move a clearer context." position="55% center" variant="career" family="context-media" transitionKey="career-world" />

      <div className="vt-essay-intro vt-essay-intro--dark"><h2>Environments change.<br/><em>The questions change.</em></h2><p>Explore 17 careers across five working environments. Each environment brings together related roles, the conditions that suit them and the trade-offs to consider.</p></div>

      <section className="vt-career-worlds-track" data-career-world-track aria-label="Working environments">
        <div className="vt-career-worlds-stage">
          <div className="vt-career-world-index" aria-hidden="true">
            {CAREER_WORLDS.map((world, index) => <span key={world.id} className={activeWorld === index ? 'is-active' : ''}>{world.name}</span>)}
          </div>

          <div className="vt-career-world-viewport">
            <div className="vt-career-world-stack">
            {CAREER_WORLDS.map((world, worldIndex) => {
              const selectedKey = selectedByWorld[world.id];
              const selectedRole = careersData[selectedKey] || careersData[world.roleKeys[0]];
              return (
                <article
                  key={world.id}
                  className={`vt-career-world${activeWorld === worldIndex ? ' is-active' : ''}`}
                  data-career-world={world.id}
                  aria-hidden={horizontalWorlds ? activeWorld !== worldIndex : undefined}
                  inert={horizontalWorlds && activeWorld !== worldIndex ? true : undefined}
                >
                  <div className={`vt-career-world-media vt-career-world-media--${world.physics}`} data-transition-family="context-media" data-transition-key="career-world">
                    <img src={mediaForRole(selectedKey, world.media)} alt={`Illustrative working context for ${selectedRole.title}`} loading={worldIndex === 0 ? 'eager' : 'lazy'} />
                    <div className="vt-career-world-media__shade" aria-hidden="true" />
                  </div>

                  <div className="vt-career-world-copy">
                    <h2>{world.name}</h2>
                    <strong>{world.thesis}</strong>
                    <p>{world.description}</p>
                    <p className="vt-career-world-tradeoff">{world.tension}</p>
                  </div>

                  <div className="vt-career-role-field">
                    <div className="vt-career-role-tabs" role="tablist" aria-label={`${world.name} occupations`}>
                      {world.roleKeys.map((roleKey, roleIndex) => {
                        const role = careersData[roleKey];
                        const selected = selectedKey === roleKey;
                        return (
                          <button
                            key={roleKey}
                            ref={(node) => { roleRefs.current[`${world.id}:${roleKey}`] = node; }}
                            type="button"
                            role="tab"
                            aria-selected={selected}
                            tabIndex={selected ? 0 : -1}
                            className={selected ? 'is-selected' : ''}
                            onClick={() => setSelectedByWorld((current) => ({ ...current, [world.id]: roleKey }))}
                            onKeyDown={(event) => handleRoleKeyDown(event, world, roleIndex)}
                          >{role.title}<span aria-hidden="true">↗</span></button>
                        );
                      })}
                    </div>

                    <div className="vt-career-role-detail" role="tabpanel" aria-live="polite">
                      <h3>{selectedRole.title}</h3>
                      <div><strong>Core skills</strong><p>{selectedRole.skills.slice(0, 5).map(displayRequirement).join(' · ')}</p></div>
                      <div><strong>Related knowledge</strong><p>{selectedRole.subjects.slice(0, 4).map(displayRequirement).join(' · ')}</p></div>
                      <small>Occupational requirements. Not a personal career-fit score.</small>
                    </div>
                  </div>
                </article>
              );
            })}
            </div>
          </div>
        </div>
      </section>

      <p className="vt-career-disclaimer">{CAREER_PRESENTATION_DISCLAIMER}</p>
      <section className="vt-quiet-end"><h2>Look beyond<br/>a job title.</h2><p>Your interests, skills, values and experience each contribute to a career comparison. Explore how the calculation brings them together.</p><CinemaLink className="vt-text-link" to="/methodology">Explore the scoring model ↗</CinemaLink></section>
      <NextChapter to="/progress" title="See what changes." subtitle="Return to the same record over time." image={PHOTO.shared} family="context-media" transitionKey="career-world" />
    </PageFrame>
  );
}

export function ProgressCinematicPage() {
  const [split, setSplit] = useState(55);
  const content = PUBLIC_CONTENT.progress;
  return (
    <PageFrame className="progress">
      <Cover lines={['A little distance.', 'A different view.']} image={PHOTO.autonomy} alt="A developer concentrating on work at a laptop" description={content.hero.support} position="center 52%" variant="progress" family="context-media" transitionKey="career-world" />
      <div className="vt-essay-intro"><h2>Time adds context.<br/><em>It does not erase.</em></h2><p>Compare illustrative working environments. A genuine personal change requires at least two complete assessment records.</p></div>

      <section className="vt-time-comparison" aria-label="Illustrative timeline comparator">
        <div className="vt-time-stage" style={{ '--split': `${split}%` }} data-transition-family="context-media" data-transition-key="career-world">
          <img src={PHOTO.autonomy} loading="lazy" alt="Illustrative baseline solo workspace" className="vt-time-image" />
          <div className="vt-time-mask"><img src={PHOTO.collaboration} loading="lazy" alt="Illustrative later collaborative workspace" className="vt-time-image" /></div>
          <span className="vt-time-tag vt-time-tag--left">Earlier record</span><span className="vt-time-tag vt-time-tag--right">Later context</span>
          <div className="vt-time-divider" aria-hidden="true"><span>↔</span></div>
        </div>
        <div className="vt-time-controls">
          <label htmlFor="vt-longitudinal-slider">Inspect the relationship between two illustrative contexts</label>
          <input id="vt-longitudinal-slider" type="range" min="5" max="95" value={split} onChange={(event) => setSplit(Number(event.target.value))} aria-valuetext={`Divider at ${split} percent across the comparison`} />
          
        </div>
      </section>

      <section className="vt-longitudinal-text">
        <article><h2>{content.stabilityFinding}</h2><p>Without an earlier record, there is nothing reliable to compare. Source and context must remain available for later inspection.</p></article>
        <article><h2>{content.adaptationFinding}</h2><p>Later conditions can alter the interpretation. Neither photograph represents the assessment history of a real person.</p></article>
      </section>
      <div className="vt-dark-quote"><p>Keep the earlier context in view. Understand what a later record adds.</p></div>
      <NextChapter to="/trust" title="See the evidence." subtitle="Every interpretation starts somewhere." image={PHOTO.proof} family="human-trace" transitionKey="evidence-record" />
    </PageFrame>
  );
}

const TRUST_READINGS = {
  supplied: ['Your response, in context.', 'The words you entered remain the starting point. They stay with the question and the situation they describe.'],
  inferred: ['An interpretation, with limits.', 'Personality and interest dimensions describe patterns across your responses. Scored dimensions need enough evidence; one answer is not a result.'],
  calculated: ['A calculation you can inspect.', 'Career comparisons bring interests, skills, values, traits, education and goals together through explicit weights.'],
  compared: ['Different work. Different demands.', 'Explore engineering, design and analytical roles against their own capabilities and foundational domains.'],
  controlled: ['Your information. Your choice.', 'Review your responses, export your record and manage deletion through the controls in your account.'],
};

function useTrustTimeline(rootRef, setActive) {
  useEffect(() => {
    const root = rootRef.current;
    const track = root?.querySelector('[data-trust-track]');
    if (!track) return undefined;
    const mm = gsap.matchMedia();
    mm.add('(min-width:901px) and (min-height:700px) and (pointer:fine) and (prefers-reduced-motion:no-preference)', () => {
      const lastStep = Math.max(1, track.querySelectorAll('.vt-trust-record__pipeline span').length - 1);
      let previous = -1;
      const render = (progress) => {
        const value = Math.max(0, Math.min(1, progress));
        const index = Math.round(value * lastStep);
        if (index !== previous) {
          previous = index;
          setActive(index);
        }
      };

      render(0);
      const trigger = ScrollTrigger.create({
        trigger: track,
        start: 'top 84px',
        end: 'bottom bottom',
        scrub: 0.48,
        invalidateOnRefresh: true,
        onUpdate: (self) => render(self.progress),
        onRefresh: (self) => render(self.progress),
      });
      return () => trigger.kill();
    });

    const mobileStates = [...track.querySelectorAll('.vt-trust-mobile-states article')];
    mm.add('(max-width:900px), (pointer:coarse)', () => {
      const triggers = mobileStates.map((article, index) => ScrollTrigger.create({
        trigger: article,
        start: 'top 62%',
        end: 'bottom 62%',
        onEnter: () => setActive(index),
        onEnterBack: () => setActive(index),
      }));
      return () => triggers.forEach((trigger) => trigger.kill());
    });

    return () => mm.revert();
  }, [rootRef, setActive]);
}
export function TrustCinematicPage() {
  const steps = PUBLIC_CONTENT.trust.recordStateSteps;
  const [active, setActive] = useState(0);
  const rootRef = useRef(null);
  useTrustTimeline(rootRef, setActive);

  return (
    <PageFrame className="trust" rootRef={rootRef}>
      <Cover lines={['Insight.', 'With its evidence.']} image={PHOTO.proof} alt="An interface wireframe showing the thinking behind an idea" description="See the evidence behind an interpretation. Understand its limits. Keep control of your information." variant="trust" family="human-trace" transitionKey="evidence-record" />
      <div className="vt-essay-intro"><h2>Inspect the reading.<br/><em>Then its origin.</em></h2><p>Follow the stages from a contextual answer to a professional comparison. Each stage has a different purpose and a different limit.</p></div>

      <section className="vt-trust-track" data-trust-track aria-label="Evidence stages">
        <div className="vt-trust-stage">
          <div className="vt-trust-record" data-transition-family="human-trace" data-transition-key="evidence-record">
            <p className="vt-trust-record__source">Your response stays connected to the question and situation it describes.</p>
            <div className="vt-trust-record__pipeline" aria-hidden="true">
              {steps.map((step, index) => <span key={step.id} className={index <= active ? 'is-active' : ''}>{step.name}</span>)}
            </div>
            <div key={steps[active].id} className="vt-trust-record__reading" aria-live="polite">
              <h2>{TRUST_READINGS[steps[active].id][0]}</h2>
              <p>{TRUST_READINGS[steps[active].id][1]}</p>
              <small>{steps[active].description}</small>
            </div>
          </div>

          <aside className="vt-trust-inspector">
            <ol>
              {steps.map((step, index) => (
                <li key={step.id} className={index === active ? 'is-selected' : ''} aria-current={index === active ? 'step' : undefined}>
                  <strong>{step.name}</strong><i aria-hidden="true" />
                </li>
              ))}
            </ol>
            <p>The sequence is explanatory. A single response alone is not a complete scored profile.</p>
          </aside>
        </div>

        <div className="vt-trust-mobile-states">
          {steps.map((step, index) => <article key={step.id} className={index === active ? 'is-active' : ''} aria-current={index === active ? 'step' : undefined}><h2>{TRUST_READINGS[step.id][0]}</h2><p>{TRUST_READINGS[step.id][1]}</p></article>)}
        </div>
      </section>

      <section className="vt-rights"><div><h2>Your record.<br/>Your controls.</h2><p>Review export, transparency and account-removal actions in their authenticated contexts.</p></div><div className="vt-rights-list">{PUBLIC_CONTENT.trust.rightsActions.map((right) => <article key={right.id}><h3>{right.label}</h3><p>{right.description}</p><CinemaLink className="vt-text-link" to={right.link}>Review this control ↗</CinemaLink></article>)}</div></section>
      <NextChapter to="/methodology" title="Understand the method." subtitle="The models, formulas and their limits." image={PHOTO.inquiry} family="quiet-editorial" transitionKey="method" />
    </PageFrame>
  );
}

const sectionKeys = ['bigFive', 'riasec', 'workValues', 'behavioralSignals', 'careerWeights', 'validityStates', 'aiNarrative', 'limits'];

function useMethodologyTrace(rootRef, setActive) {
  useEffect(() => {
    const root = rootRef.current;
    const articles = [...(root?.querySelectorAll('[data-method-section]') || [])];
    if (!articles.length) return undefined;

    const triggers = articles.map((article, index) => ScrollTrigger.create({
      trigger: article,
      start: 'top 58%',
      end: 'bottom 58%',
      onEnter: () => setActive(sectionKeys[index]),
      onEnterBack: () => setActive(sectionKeys[index]),
    }));

    return () => triggers.forEach((trigger) => trigger.kill());
  }, [rootRef, setActive]);
}

function MethodDetail({ name, item }) {
  if (name === 'bigFive') return <div className="vt-method-spectrum">{item.dimensions.map((dimension, index) => <span key={dimension} style={{ '--i': index }}>{dimension}</span>)}</div>;
  if (name === 'riasec') return <div className="vt-method-orbit">{item.orbit.map((dimension) => <span key={dimension}>{dimension}</span>)}</div>;
  if (name === 'workValues') return <div className="vt-method-chip-field">{item.priorities.map((dimension) => <span key={dimension}>{dimension}</span>)}</div>;
  if (name === 'behavioralSignals') return <div className="vt-method-chip-field">{item.patterns.map((dimension) => <span key={dimension}>{dimension}</span>)}</div>;
  if (name === 'careerWeights') return <div className="vt-method-weights">{PUBLIC_CONTENT.home.calibration.weights.map((weight) => <div key={weight.id}><span>{weight.label}</span><b>{weight.percentage}%</b><i style={{ width: `${weight.percentage * 3}%` }} /></div>)}</div>;
  if (name === 'validityStates') return <div className="vt-method-chip-field">{[['valid', 'Enough evidence'], ['partial', 'Partial evidence'], ['insufficient_data', 'More evidence needed']].map(([state, label]) => <span key={state}>{label}</span>)}</div>;
  if (name === 'aiNarrative') return (
    <div className="vt-method-ai-boundary">
      <section><h3>Scoring</h3><strong>Deterministic formula</strong><p>Profile and CV processing may provide structured inputs. AI does not replace the formula.</p></section>
      <section><h3>Narrative interpretation</h3><strong>Optional AI support</strong><p>Generative AI may help interpret narrative context.</p></section>
    </div>
  );
  if (name === 'limits') return (
    <dl className="vt-method-limits">
      <div><dt>Can support</dt><dd>Professional self-reflection and career planning</dd></div>
      <div><dt>Does not provide</dt><dd>Clinical diagnosis, medical evaluation, or psychiatric assessment</dd></div>
    </dl>
  );
  return null;
}

export function MethodologyCinematicPage() {
  const sections = PUBLIC_CONTENT.methodology.sections;
  const [activeSection, setActiveSection] = useState(sectionKeys[0]);
  const rootRef = useRef(null);
  useMethodologyTrace(rootRef, setActiveSection);

  return (
    <PageFrame className="method" rootRef={rootRef}>
      <Cover lines={['Understand', 'the thinking.']} image={PHOTO.inquiry} alt="A developer writing software on a laptop" description="Explore the models behind your profile and the factors behind a career comparison." variant="method" family="quiet-editorial" transitionKey="method" />
      <div className="vt-method-intro"><h2>Methods must be<br/><em>visible.</em></h2><p>{PUBLIC_CONTENT.methodology.hero.support}</p></div>
      <div className="vt-monograph">
        <nav className="vt-monograph-index" aria-label="Methodology sections">{sectionKeys.map((key) => <a href={`#method-${key}`} key={key} className={activeSection === key ? 'is-active' : ''} aria-current={activeSection === key ? 'location' : undefined}>{sections[key].title}</a>)}</nav>
        <div className="vt-monograph-articles">{sectionKeys.map((key) => <article id={`method-${key}`} key={key} data-method-section={key} className={activeSection === key ? 'is-active' : ''}><h2>{sections[key].title}</h2><p>{sections[key].description}</p><MethodDetail name={key} item={sections[key]} /></article>)}</div>
      </div>
      <div className="vt-method-verdict"><h2>Professional insight.<br/><em>Not clinical diagnosis.</em></h2><p>{sections.limits.description}</p><CinemaLink className="vt-text-link" to="/trust">Inspect the evidence chain ↗</CinemaLink></div>
      <NextChapter to="/privacy" title="Your information. Your choice." subtitle="Plain-language governance and account controls." image={PHOTO.detail} family="quiet-editorial" transitionKey="privacy" />
    </PageFrame>
  );
}

export function PrivacyCinematicPage() {
  const data = PUBLIC_CONTENT.privacy;
  return (
    <PageFrame className="privacy">
      <Cover lines={['Your information.', 'Your choice.']} image={PHOTO.detail} alt="A website wireframe with handwritten planning notes" description={data.hero.support} variant="privacy" family="quiet-editorial" transitionKey="privacy" />
      <div className="vt-privacy-brief"><h2>Make it<br/><em>understandable.</em></h2><p>Read the published product policy below and open your account controls when you are signed in.</p></div>
      <section className="vt-privacy-document">
        <nav aria-label="Policy table of contents">{data.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}</nav>
        <div>{data.sections.map((section) => <article key={section.id} id={section.id}><h2>{section.title}</h2><p>{section.content}</p></article>)}</div>
      </section>
      <section className="vt-method-verdict"><h2>Your record remains<br/><em>inspectable.</em></h2><CinemaLink className="vt-text-link" to="/account/privacy">Open privacy controls ↗</CinemaLink></section>
      <NextChapter to="/" title="A clearer direction." subtitle="Explore your personality, interests and work priorities." image={PHOTO.source} family="quiet-editorial" transitionKey="home" />
    </PageFrame>
  );
}
