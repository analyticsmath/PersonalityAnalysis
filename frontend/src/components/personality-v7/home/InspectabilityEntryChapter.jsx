import React from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import MediaPlane from '../motion/MediaPlane';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import { getSignupAcquisitionUrl } from '../../../utils/personality-v4/navigation';
import EditorialFooter from '../chrome/EditorialFooter';
import useCinematicScene from '../motion/useCinematicScene';

const statements = ['Start with context you choose to provide.', 'Answer the questions you choose to answer.', 'Keep the readings distinct when you inspect them.', 'Use the links and controls available to understand the record.'];
export const InspectabilityEntryChapter = () => {
  const sceneRef = useCinematicScene(({ scope }) => gsap.fromTo('.pa-boundary-field__statement', { autoAlpha: .28, y: 16 }, { autoAlpha: 1, y: 0, stagger: .16, scrollTrigger: { trigger: scope, start: 'top 70%', end: 'bottom 55%', scrub: true } }), []);
  return <section ref={sceneRef} className="pa-boundary-and-ending" aria-labelledby="boundary-title"><div className="pa-boundary-field"><MediaPlane asset={MEDIA_ASSETS_V7.a08} alt="Two hands approaching across a textured wall" /><div className="pa-boundary-field__copy"><h2 id="boundary-title">The record should have clear boundaries.</h2><div className="pa-boundary-field__path">{statements.map((statement) => <p className="pa-boundary-field__statement" key={statement}>{statement}</p>)}</div><nav aria-label="Learn more about the record"><Link to="/methodology">Methodology</Link><Link to="/trust">Trust</Link><Link to="/privacy">Privacy</Link></nav></div></div><div className="pa-terminal-cta"><h2>Build a profile you can question.</h2><p>Begin with the work you already know and return whenever the context changes.</p><Link to={getSignupAcquisitionUrl()} className="pa-v7-btn pa-v7-btn--ink">Build my profile</Link></div><EditorialFooter /></section>;
};
export default InspectabilityEntryChapter;
