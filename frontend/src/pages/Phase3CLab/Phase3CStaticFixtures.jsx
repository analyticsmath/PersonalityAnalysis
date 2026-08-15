import { useMemo, useState } from 'react';
import { heroMedia, heroTypeTreatments, nextWorldIndex, PHASE3C_LAB_DISCLAIMER, profileData, workWorlds } from './labData';

function Arrow({ direction = 'right' }) {
  return (
    <svg className={`phase3c-arrow phase3c-arrow--${direction}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h15M14 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WorldMedia({ world, className = '', compact = false }) {
  if (world.pending) {
    return (
      <div className={`phase3c-world-media phase3c-world-media--pending ${className}`.trim()} aria-label="Build media pending">
        <span>MEDIA PENDING — DO NOT SHIP</span>
      </div>
    );
  }
  return (
    <figure className={`phase3c-world-media ${className}`.trim()}>
      <img src={world.media} alt="" loading={compact ? 'lazy' : 'eager'} />
      <figcaption>RESEARCH CANDIDATE</figcaption>
    </figure>
  );
}

export function HeroFixture({ typeTreatment, onTypeTreatment }) {
  const treatment = heroTypeTreatments.find((item) => item.id === typeTreatment) || heroTypeTreatments[1];
  return (
    <section
      className="phase3c-hero"
      id="hero"
      style={{ '--phase3c-hero-weight': treatment.weight, '--phase3c-hero-stretch': treatment.stretch }}
      aria-labelledby="phase3c-hero-title"
    >
      <header className="phase3c-lab-header">
        <a href="#hero" className="phase3c-lab-header__brand">Personality Assessor <span>Phase 3C lab</span></a>
        <nav aria-label="Lab sections">
          <a href="#worlds">Work Worlds</a>
          <a href="#profile">Profile</a>
          <a href="#motion">Motion</a>
        </nav>
      </header>
      <div className="phase3c-hero__content">
        <div className="phase3c-hero__copy">
          <p className="phase3c-hero__context">Visual + motion research lab</p>
          <h1 id="phase3c-hero-title">Your work leaves evidence.</h1>
          <p>See how the decisions, constraints and artefacts in your work become a more precise profile of how you operate.</p>
          <div className="phase3c-hero__actions">
            <a href="#worlds" className="phase3c-button">Inspect the composition</a>
            <a href="#type" className="phase3c-text-action">Compare type</a>
          </div>
        </div>
        <figure className="phase3c-hero__architecture">
          <img src={heroMedia.architecture} alt="Architect working over a site plan" />
        </figure>
        <figure className="phase3c-hero__professional">
          <img src={heroMedia.professional} alt="Professional working at a laptop with documents" />
        </figure>
      </div>
      <div className="phase3c-type-selector" id="type" aria-label="Hero typography research controls">
        <span>Hero treatment</span>
        <div role="group" aria-label="Hero width and weight treatment">
          {heroTypeTreatments.map((item) => (
            <button type="button" aria-pressed={treatment.id === item.id} key={item.id} onClick={() => onTypeTreatment(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TypographyFixture() {
  return (
    <section className="phase3c-section phase3c-type-lab" aria-labelledby="phase3c-type-title">
      <div className="phase3c-section__heading">
        <p className="phase3c-section__index">01</p>
        <div>
          <h2 id="phase3c-type-title">Mona Sans 2 type fixture</h2>
          <p>Local variable face, including width and optical sizing in the hero control.</p>
        </div>
      </div>
      <div className="phase3c-type-cases">
        <p className="phase3c-type-cases__display">Your work leaves evidence.</p>
        <p className="phase3c-type-cases__worlds">Build <span>/</span> Investigate <span>/</span> Make <span>/</span> Shape <span>/</span> Structure <span>/</span> Collaborate</p>
        <p className="phase3c-type-cases__question">When a project changes direction after you've already started, what do you usually do first?</p>
        <div className="phase3c-type-cases__data"><span>Openness 76</span><span>Autonomy 82</span><span>Systems Architect 88%</span></div>
        <nav className="phase3c-type-cases__mobile-nav" aria-label="Mobile navigation sample"><span>Profile</span><span>Explore</span><span>Progress</span><span>Account</span></nav>
      </div>
    </section>
  );
}

export function WorkWorldsFixture() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeWorld = workWorlds[activeIndex];
  const previousWorld = workWorlds[nextWorldIndex(activeIndex, -1)];
  const followingWorld = workWorlds[nextWorldIndex(activeIndex, 1)];
  const setRelativeWorld = (direction) => setActiveIndex((index) => nextWorldIndex(index, direction));

  return (
    <section className="phase3c-work-worlds" id="worlds" aria-labelledby="phase3c-worlds-title">
      <div className="phase3c-work-worlds__heading">
        <p className="phase3c-section__index">02</p>
        <h2 id="phase3c-worlds-title">Work Worlds</h2>
        <p>One active world remains readable alongside spatial context.</p>
      </div>
      <div className="phase3c-work-worlds__stage">
        <div className="phase3c-work-worlds__sliver phase3c-work-worlds__sliver--previous" aria-hidden="true">
          <WorldMedia world={previousWorld} compact />
        </div>
        <WorldMedia world={activeWorld} className="phase3c-work-worlds__active-media" />
        <aside className="phase3c-work-worlds__copy">
          <p>Active environment</p>
          <h3>{activeWorld.name}</h3>
          <p>{activeWorld.copy}</p>
          <div className="phase3c-world-controls" aria-label="Work Worlds navigation">
            <button type="button" onClick={() => setRelativeWorld(-1)} aria-label="Previous Work World"><Arrow direction="left" /> Previous</button>
            <span aria-live="polite">{activeIndex + 1} / {workWorlds.length}</span>
            <button type="button" onClick={() => setRelativeWorld(1)} aria-label="Next Work World">Next <Arrow /></button>
          </div>
        </aside>
        <div className="phase3c-work-worlds__sliver phase3c-work-worlds__sliver--next" aria-hidden="true">
          <WorldMedia world={followingWorld} compact />
        </div>
      </div>
      <details className="phase3c-rejected-current">
        <summary>Build comparison — REJECTED CURRENT</summary>
        <figure>
          <img src={workWorlds[0].rejectedMedia} alt="Current rejected developer image for Build" loading="lazy" />
          <figcaption>REJECTED CURRENT — not proposed for shipment</figcaption>
        </figure>
      </details>
    </section>
  );
}

const contextDescriptions = {
  C0: 'Context artifact established',
  C1: 'Evidence parsed around the artifact',
  C2: 'Relevant evidence isolates',
  C3: 'Question emerges from focused evidence',
  C4: 'Responses are available; nothing is selected',
  C5: 'User-selected response becomes visible',
  C6: 'Observed signal forms from the response',
  C7: 'Signal compacts toward the Living Profile',
};

export function ContextScene({ state, onStateChange, selectedResponse, onSelectResponse, className = '' }) {
  const contextState = state || 'C0';
  return (
    <div className={`phase3c-context-scene ${className}`.trim()} data-context-state={contextState}>
      <div className="phase3c-context-scene__controls" role="tablist" aria-label="Context storyboard states">
        {Object.keys(contextDescriptions).map((label) => (
          <button type="button" key={label} role="tab" aria-selected={contextState === label} onClick={() => onStateChange(label)}>
            {label}
          </button>
        ))}
      </div>
      <p className="phase3c-context-scene__state" aria-live="polite">{contextState} — {contextDescriptions[contextState]}</p>
      <div className="phase3c-context-scene__field">
        <figure className="phase3c-context-artifact">
          <img src={heroMedia.professional} alt="Professional context artifact with laptop and documents" />
          <figcaption>Context artefact: project notes, tools and working conditions</figcaption>
          <i className="phase3c-context-artifact__annotation phase3c-context-artifact__annotation--one">shifting brief</i>
          <i className="phase3c-context-artifact__annotation phase3c-context-artifact__annotation--two">independent analysis</i>
        </figure>
        <div className="phase3c-context-evidence" aria-label="Parsed evidence">
          <span>Constraints changed mid-project</span>
          <span>Initial approach already in progress</span>
        </div>
        <section className="phase3c-context-question" aria-labelledby="phase3c-context-question-title">
          <p>Adaptive assessment question</p>
          <h3 id="phase3c-context-question-title">When a project changes direction after you've already started, what do you usually do first?</h3>
          <div className="phase3c-context-responses" aria-label="Response choices">
            {['Map the changed constraints', 'Ask for the decision context', 'Test a small alternative'].map((response) => (
              <button
                type="button"
                key={response}
                aria-pressed={selectedResponse === response}
                onClick={() => onSelectResponse(response)}
              >
                {response}
              </button>
            ))}
          </div>
          {!selectedResponse ? <p className="phase3c-context-question__empty">No response selected.</p> : null}
        </section>
        <aside className="phase3c-context-signal" aria-live="polite">
          <p>Observed signal</p>
          <strong>{selectedResponse ? 'Constraint-led problem solving' : 'Awaiting a user response'}</strong>
          <span>{selectedResponse ? 'Handoff to Living Profile' : 'Scroll never selects an answer.'}</span>
        </aside>
      </div>
    </div>
  );
}

export function ContextStoryboardFixture() {
  const [state, setState] = useState('C0');
  const [selectedResponse, setSelectedResponse] = useState('');
  const handleResponse = (response) => {
    setSelectedResponse(response);
    setState('C5');
  };
  return (
    <section className="phase3c-section phase3c-context-lab" aria-labelledby="phase3c-context-title">
      <div className="phase3c-section__heading">
        <p className="phase3c-section__index">03</p>
        <div>
          <h2 id="phase3c-context-title">Context → Question → Signal</h2>
          <p>One persistent professional artefact makes evidence continuity inspectable.</p>
        </div>
      </div>
      <ContextScene state={state} onStateChange={setState} selectedResponse={selectedResponse} onSelectResponse={handleResponse} />
    </section>
  );
}

function MobileFrameHero() {
  return <div className="phase3c-mobile-frame__hero"><p>Visual + motion research lab</p><h3>Your work leaves evidence.</h3><img src={heroMedia.architecture} alt="" /><img src={heroMedia.professional} alt="" /></div>;
}

function MobileFrameWorld() {
  return <div className="phase3c-mobile-frame__world"><p>Work Worlds</p><WorldMedia world={workWorlds[0]} /><div><button type="button"><Arrow direction="left" /></button><strong>Build</strong><button type="button"><Arrow /></button></div></div>;
}

function MobileFrameProfile() {
  return <div className="phase3c-mobile-frame__profile"><p>Personality</p>{profileData.personality.slice(0, 4).map(([name, value]) => <div key={name}><span>{name}</span><i style={{ width: `${value}%` }} /><strong>{value}</strong></div>)}</div>;
}

function MobileFrameDashboard() {
  return <div className="phase3c-mobile-frame__dashboard"><p>0 completed assessments</p><h3>Begin with the work you can describe.</h3><span>CUSTOM ILLUSTRATION PENDING</span><button type="button">Start context intake</button></div>;
}

function MobileFrameQuestion() {
  return <div className="phase3c-mobile-frame__question"><p>Adaptive assessment</p><h3>When a project changes direction after you've already started, what do you usually do first?</h3>{['Map the changed constraints', 'Ask for the decision context', 'Test a small alternative'].map((item) => <button type="button" key={item}>{item}</button>)}</div>;
}

const mobileFrames = [
  ['hero', 'Hero', MobileFrameHero],
  ['worlds', 'Work Worlds', MobileFrameWorld],
  ['profile', 'Profile', MobileFrameProfile],
  ['dashboard', 'D0 dashboard', MobileFrameDashboard],
  ['question', 'Question', MobileFrameQuestion],
];

export function MobileFixtures() {
  const [active, setActive] = useState('hero');
  const ActiveFrame = useMemo(() => mobileFrames.find(([id]) => id === active)?.[2] || MobileFrameHero, [active]);
  return (
    <section className="phase3c-section phase3c-mobile-lab" aria-labelledby="phase3c-mobile-title">
      <div className="phase3c-section__heading">
        <p className="phase3c-section__index">07</p>
        <div>
          <h2 id="phase3c-mobile-title">390 × 844 mobile compositions</h2>
          <p>Dedicated touch-first frames; no desktop stack is used as the fixture.</p>
        </div>
      </div>
      <p className="phase3c-lab__disclaimer">{PHASE3C_LAB_DISCLAIMER}</p>
      <div className="phase3c-mobile-fixtures" data-testid="phase3c-mobile-fixtures">
        <div className="phase3c-mobile-fixtures__tabs" role="tablist" aria-label="Mobile fixtures">
          {mobileFrames.map(([id, label]) => <button type="button" key={id} role="tab" aria-selected={active === id} onClick={() => setActive(id)}>{label}</button>)}
        </div>
        <div className="phase3c-mobile-frame" role="tabpanel" aria-label={`${active} 390 by 844 fixture`}><ActiveFrame /></div>
      </div>
    </section>
  );
}

