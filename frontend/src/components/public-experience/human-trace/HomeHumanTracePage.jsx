import { useEffect, useRef } from 'react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { CinemaLink } from './CinematicPublicShell';
import { mountHomeHumanTrace } from './homeHumanTraceMotion';
import './homeHumanTrace.css';
import './homeHumanTracePolish.css';
import './homeRefinement.css';

const PHOTO = {
  human: '/media/public-experience/homeHeroContext',
  detail: '/media/public-experience/homeProcessDetail',
  creative: '/media/public-experience/careerCreativeHuman',
  research: '/media/public-experience/careerDeepInquiry',
  precision: '/media/public-experience/workworldPrecision',
  autonomy: '/media/public-experience/workworldAutonomy',
  collaboration: '/media/public-experience/careerCoordination',
  pressure: '/media/public-experience/workworldPressureHuman',
};

function Photo({ source, alt = '', priority = false, className = '' }) {
  return <picture className={className}>
    <source media="(max-width: 600px)" srcSet={`${source}-mobile-480.webp 480w, ${source}-mobile-960.webp 960w`} sizes="100vw" />
    <img src={`${source}-1440.webp`} srcSet={`${source}-720.webp 720w, ${source}-1440.webp 1440w, ${source}-1920.webp 1920w`} sizes="(max-width:900px) 100vw, 85vw" alt={alt} fetchPriority={priority ? 'high' : 'auto'} loading={priority ? 'eager' : 'lazy'} decoding="async" />
  </picture>;
}

const start = '/signup?next=%2Fassessment%2Fstart';

function Scene({ id, index, children, className = '' }) {
  return (
    <section
      className={`vt-home-scene vt-home-scene--${id} ${className}`}
      data-home-scene={index}
      data-home-scene-id={id}
    >
      {children}
    </section>
  );
}

export function HomeHumanTracePage() {
  const rootRef = useRef(null);
  const home = PUBLIC_CONTENT.home;

  useEffect(() => mountHomeHumanTrace(rootRef.current), []);

  return (
    <div ref={rootRef} className="vt-home-experience" data-home-experience>
      <section className="vt-home-opening" data-home-opening aria-label="Understand what drives you">
        <div className="vt-home-opening-stage">
          <figure className="vt-home-opening-media" data-opening-media data-transition-family="context-media" data-transition-key="working-context">
            <Photo source={PHOTO.human} alt="A maker working with equipment beside a sunlit workshop window" priority />
          </figure>
          <figure className="vt-home-opening-detail" data-opening-detail aria-hidden="true"><Photo source={PHOTO.detail} /></figure>
            <div className="vt-home-opening-copy">
              <div className="vt-home-human-copy">
                <h1><span>Understand</span><span>what drives you.</span></h1>
                <div className="vt-home-human-bottom">
                  <p>Your personality. Your priorities. A clearer direction for the work ahead.</p>
                  <CinemaLink className="vt-primary vt-home-primary" to={start}>Discover your profile <span aria-hidden="true">↗</span></CinemaLink>
                </div>
              </div>
            </div>


          <div className="vt-home-opening-cue" aria-hidden="true">Discover what shapes your working life <span>↓</span></div>
        </div>
      </section>

      <section className="vt-home-perspectives" data-home-perspectives aria-label="More than a personality type">
        <div className="vt-home-perspectives-stage">
          <div className="vt-home-perspectives-photos" aria-hidden="true">
            <figure><Photo source={PHOTO.creative} /></figure>
            <figure><Photo source={PHOTO.research} /></figure>
            <figure><Photo source={PHOTO.collaboration} /></figure>
          </div>
          <h2 aria-label="You are more than a type. Understand the patterns. Explore the possibilities.">
            {'You are more than a type. Understand the patterns. Explore the possibilities.'.split(' ').map((word, i) => <span className="vt-home-reveal-word" aria-hidden="true" key={i}>{word}{' '}</span>)}
          </h2>
          <p>Personality, interests and values bring different parts of your working life into focus.</p>
        </div>
      </section>

      <div className="vt-home-film-track" data-home-track>
        <div className="vt-home-film-stage" data-home-stage>
          <div
            className="vt-home-source-actor"
            data-home-source-actor
            data-transition-family="human-trace"
            data-transition-key="source-response"
          >
            <p>Your answer keeps its question and context.</p>
          </div>

          <div className="vt-home-scenes">
            <Scene id="source" index={1}>
              <div className="vt-home-source-copy">
                <h2>Start with you.<br/>Keep the context.</h2>
                <p>{home.worldEntry.prompt}</p>
                <small>A single response can suggest questions worth asking. A scored profile requires sufficient independent evidence.</small>
              </div>
              <figure className="vt-home-source-photo"><Photo source={PHOTO.detail} alt="An architect reviewing plans and material swatches" /></figure>
              <div className="vt-home-source-mobile" data-transition-family="human-trace" data-transition-key="source-response">
                <p>Your answer keeps its question and context.</p>
              </div>
            </Scene>

            <Scene id="branch" index={2}>
              <div className="vt-home-branch-copy">
                <h2>One response.<br/><em>More than one reading.</em></h2>
                <p>Keep the source intact while different models ask different questions of it.</p>
              </div>
              <div className="vt-home-branch-field" aria-label="Three perspectives derived from a preserved response">
                <svg className="vt-home-branch-lines" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true">
                  <path data-home-branch-path d="M500 250 C400 250 330 110 170 110" />
                  <path data-home-branch-path d="M500 250 C520 250 650 250 820 250" />
                  <path data-home-branch-path d="M500 250 C410 300 360 410 190 405" />
                </svg>
                <div className="vt-home-branch-core"><strong>Your response, kept in context.</strong></div>
                {home.models.list.slice(0, 3).map((model, idx) => (
                  <article key={model.id} className={`vt-home-branch-node vt-home-branch-node--${idx + 1}`}>
                    <h3>{model.name}</h3>
                    <p>{model.shortDescription}</p>
                  </article>
                ))}
              </div>
            </Scene>

            <Scene id="worlds" index={3}>
              <div className="vt-home-worlds-heading">
                <h2>Your profile.<br/><em>In the context of work.</em></h2>
                <p>Explore the working conditions behind the roles you compare.</p>
              </div>
              <div className="vt-home-worlds" data-home-worlds>
                {home.workworlds.conditions.map((world, idx) => (
                  <article key={world.id} className="vt-home-world" data-home-world={idx}>
                    <Photo source={[PHOTO.precision, PHOTO.autonomy, PHOTO.collaboration, PHOTO.pressure][idx]} alt={["Two colleagues working with precision equipment", "A maker working independently at her studio table", "Colleagues exchanging ideas around a workspace", "An operator monitoring a broadcast control room"][idx]} />
                    <div className="vt-home-world__shade" aria-hidden="true" />
                    <div className="vt-home-world__copy">
                                            <h3>{world.name}</h3>
                      <p>{world.interpretation}</p>
                    </div>
                  </article>
                ))}
                <nav className="vt-home-world-index" aria-label="Working conditions">
                  {home.workworlds.conditions.map((world, idx) => <span key={world.id} data-home-world-label={idx}>{world.name}</span>)}
                </nav>
              </div>
            </Scene>

            <Scene id="weight" index={4}>
              <div className="vt-home-weight-copy">
                <h2>Not every signal<br/><em>counts the same.</em></h2>
                <p>{home.calibration.lead}</p>
              </div>
              <div className="vt-home-mass" aria-label="Deterministic career contribution weights">
                {home.calibration.weights.map((weight) => (
                  <div key={weight.id} className="vt-home-mass__item" style={{ '--mass': weight.percentage }} data-home-mass>
                    <strong>{weight.percentage}%</strong>
                    <span>{weight.label}</span>
                  </div>
                ))}
              </div>
              <p className="vt-home-weight-note">Fixed contribution weights. No black-box adjustment to the final career-fit formula.</p>
            </Scene>

            <Scene id="time" index={5}>
              <div className="vt-home-time-copy">
                <h2>What changed.<br/><em>What held.</em></h2>
                <p>{home.timeExposure.support}</p>
              </div>
              <div className="vt-home-time-frame" data-home-time-frame>
                <Photo source={PHOTO.autonomy} alt="An independent working context, illustrating an earlier record" />
                <div className="vt-home-time-frame__later" data-home-time-later><Photo source={PHOTO.collaboration} alt="A collaborative working context, illustrating changing responsibilities" /></div>
                <div className="vt-home-time-frame__axis" aria-hidden="true" />
                <span className="vt-home-time-frame__label vt-home-time-frame__label--a">Earlier record</span>
                <span className="vt-home-time-frame__label vt-home-time-frame__label--b">Later context</span>
              </div>
            </Scene>

            <Scene id="provenance" index={6}>
              <div className="vt-home-provenance-copy">
                <h2>Show me where<br/><em>that came from.</em></h2>
                <p>{home.trace.support}</p>
              </div>
              <div className="vt-home-provenance-record" data-transition-family="human-trace" data-transition-key="evidence-record">
                {[
                  ['Result', 'The profile or career comparison you can review.'],
                  ['Calculation', 'The published weights used in career comparisons.'],
                  ['Evidence', 'The assessment dimensions behind the result.'],
                  ['Source', 'The answer and question that supplied the evidence.'],
                ].map(([label, description], idx) => (
                  <div key={label} className="vt-home-provenance-step" data-home-provenance-step={idx}>
                    <strong>{label}</strong><p>{description}</p>
                  </div>
                ))}
                <p>Your answer keeps its question and context.</p>
              </div>
            </Scene>


          </div>
        </div>
      </div>

      <section className="vt-home-book-track" data-home-book-track aria-label="Build an evidence-based profile">
        <div className="vt-home-book-stage">
          <div className="vt-home-book-copy">
            <h2>A profile you<br/>can look into.</h2>
            <p>{home.finale.support}</p>
            <CinemaLink className="vt-primary" to={start}>Build my profile <span aria-hidden="true">↗</span></CinemaLink>
          </div>
          <div className="vt-home-book" data-home-book>
            <div className="vt-home-book-page">
              <h3>Understand the pattern.</h3>
              <p>Explore personality dimensions, occupational interests and the conditions you value at work.</p>
              <h3>Keep the context.</h3>
              <p>Review the evidence behind a career comparison, then revisit your profile as your responsibilities change.</p>
              <CinemaLink className="vt-text-link" to="/how-it-works">Explore the assessment ↗</CinemaLink>
            </div>
            <div className="vt-home-book-cover" data-home-book-cover aria-hidden="true">
              <Photo source={PHOTO.creative} />
              <div><span>Your working life,<br/>in perspective.</span><span>Personality Assessor</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="vt-home-afterword" aria-label="How the assessment works">
        <div><h2>See how one answer<br/>shapes a career comparison.</h2></div>
        <CinemaLink className="vt-text-link" to="/how-it-works" data-transition-family="human-trace" data-transition-key="source-response">See the assessment process ↗</CinemaLink>
      </section>
    </div>
  );
}

export default HomeHumanTracePage;