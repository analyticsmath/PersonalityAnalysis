import { useEffect, useRef } from 'react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { CinemaLink } from './CinematicPublicShell';
import { mountHomeHumanTrace } from './homeHumanTraceMotion';
import './homeHumanTrace.css';
import './homeHumanTracePolish.css';

const PHOTO = {
  human: '/media/public-experience/digital/designer-1920.webp',
  precision: '/media/public-experience/digital/wireframe-1920.webp',
  autonomy: '/media/public-experience/digital/code-detail-1920.webp',
  collaboration: '/media/public-experience/digital/collaborate-1920.webp',
  pressure: '/media/public-experience/digital/studio-1920.webp',
  proof: '/media/public-experience/digital/wireframe-1920.webp',
};

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
      <div className="vt-home-film-track" data-home-track>
        <div className="vt-home-film-stage" data-home-stage>
          <figure
            className="vt-home-world-media"
            data-home-world-media
            data-transition-family="context-media"
            data-transition-key="working-context"
          >
            <img src={PHOTO.human} alt="A product designer developing interface ideas at work" fetchPriority="high" />
            <div className="vt-home-world-media__veil" aria-hidden="true" />
          </figure>

          <div
            className="vt-home-source-actor"
            data-home-source-actor
            data-transition-family="human-trace"
            data-transition-key="source-response"
          >
            <p>Your answer keeps its question and context.</p>
          </div>

          <div className="vt-home-scroll-cue" data-home-scroll-cue aria-hidden="true">
            <span>Scroll to see how an answer is assessed</span>
            <span>↓</span>
          </div>

          <div className="vt-home-scenes">
            <Scene id="human" index={0}>
              <div className="vt-home-human-copy">
                <h1><span>Understand</span><span>what drives you.</span></h1>
                <div className="vt-home-human-bottom">
                  <p>Your personality. Your priorities. A clearer direction for the work ahead.</p>
                  <CinemaLink className="vt-primary vt-home-primary" to={start}>Discover your profile <span aria-hidden="true">↗</span></CinemaLink>
                </div>
              </div>
            </Scene>

            <Scene id="source" index={1}>
              <div className="vt-home-source-copy">
                <h2>One answer<br/>is not one result.</h2>
                <p>{home.worldEntry.prompt}</p>
                <small>A single response can suggest questions worth asking. A scored profile requires sufficient independent evidence.</small>
              </div>
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
                    <img src={[PHOTO.precision, PHOTO.autonomy, PHOTO.collaboration, PHOTO.pressure][idx]} alt="" loading="lazy" />
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
                <img src={PHOTO.human} alt="The same professional context used as a baseline reference" loading="lazy" />
                <div className="vt-home-time-frame__later" data-home-time-later><img src={PHOTO.collaboration} alt="A later collaborative work context used as an illustrative comparison" loading="lazy" /></div>
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
                {['Result', 'Calculation', 'Evidence', 'Source'].map((label, idx) => (
                  <div key={label} className="vt-home-provenance-step" data-home-provenance-step={idx}>
                    <strong>{label}</strong><i aria-hidden="true" />
                  </div>
                ))}
                <p>Your answer keeps its question and context.</p>
              </div>
            </Scene>

            <Scene id="record" index={7}>
              <div className="vt-home-record-copy">
                <h2>Build a profile<br/><em>that keeps its evidence.</em></h2>
                <p>{home.finale.support}</p>
                <div className="vt-home-record-actions">
                  <CinemaLink className="vt-primary" to={start}>Build my profile <span aria-hidden="true">↗</span></CinemaLink>
                  <CinemaLink className="vt-text-link" to="/how-it-works">Follow one answer ↗</CinemaLink>
                </div>
              </div>
              <div className="vt-home-record-object" data-home-record-object data-transition-family="human-trace" data-transition-key="evidence-record">
                <p className="vt-home-record-object__statement">Responses, results and career comparisons stay connected to their evidence.</p>
                <div className="vt-home-record-object__meta"><span>Source retained</span><span>Weights explicit</span><span>Limits visible</span></div>
              </div>
            </Scene>
          </div>
        </div>
      </div>

      <section className="vt-home-afterword" aria-label="How the assessment works">
        <div><h2>See how one answer<br/>shapes a career comparison.</h2></div>
        <CinemaLink className="vt-text-link" to="/how-it-works" data-transition-family="human-trace" data-transition-key="source-response">See the assessment process ↗</CinemaLink>
      </section>
    </div>
  );
}

export default HomeHumanTracePage;