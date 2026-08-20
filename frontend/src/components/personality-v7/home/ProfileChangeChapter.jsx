import React from 'react';
import { gsap } from 'gsap';
import MediaPlane from '../motion/MediaPlane';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import useCinematicScene from '../motion/useCinematicScene';

export const ProfileChangeChapter = () => {
  const sceneRef = useCinematicScene(({ scope }) => {
    const timeline = gsap.timeline({ scrollTrigger: { trigger: scope, start: 'top 70%', end: 'bottom 45%', scrub: true } });
    timeline.fromTo('.pa-evidence-path__later', { autoAlpha: 0, xPercent: 18 }, { autoAlpha: 1, xPercent: 0, duration: .55 })
      .to('.pa-evidence-path__earlier', { autoAlpha: .18, xPercent: -8, duration: .35 }, .2)
      .fromTo('.pa-evidence-path__line', { scaleX: 0 }, { scaleX: 1, duration: .55 }, 0);
  }, []);
  return <section ref={sceneRef} className="pa-evidence-path" aria-labelledby="evidence-path-title"><div className="pa-evidence-path__intro"><h2 id="evidence-path-title">A profile can change when the evidence changes.</h2><p>A new role, project, or response can invite a reading to be revisited.</p></div><div className="pa-evidence-path__field"><figure className="pa-evidence-path__earlier"><MediaPlane asset={MEDIA_ASSETS_V7.a05} alt="Earlier evidence field" /><figcaption>Evidence added</figcaption></figure><div className="pa-evidence-path__middle"><i className="pa-evidence-path__line" /><span>Reading revisited</span></div><figure className="pa-evidence-path__later"><MediaPlane asset={MEDIA_ASSETS_V7.a06} alt="Later evidence field" /><figcaption>Career reflection</figcaption></figure></div></section>;
};
export default ProfileChangeChapter;
