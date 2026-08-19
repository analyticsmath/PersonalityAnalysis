import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MediaPlane from '../motion/MediaPlane';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import { getSignupAcquisitionUrl } from '../../../utils/personality-v4/navigation';
import useCinematicScene from '../motion/useCinematicScene';
import { EVIDENCE_ROWS, OpeningQuestionFieldset } from './EvidenceChapter';

gsap.registerPlugin(ScrollTrigger);

const refreshAfterMediaDecode = (planes) => {
  let cancelled = false;
  let refreshFrame;
  const imageDecodes = planes
    .map((plane) => plane?.querySelector('img'))
    .filter(Boolean)
    .map((image) => (typeof image.decode === 'function' ? image.decode().catch(() => undefined) : Promise.resolve()));
  const fontsReady = typeof document !== 'undefined' && document.fonts?.ready
    ? document.fonts.ready
    : Promise.resolve();

  Promise.all([...imageDecodes, fontsReady]).then(() => {
    if (!cancelled) {
      refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  });

  return () => {
    cancelled = true;
    if (refreshFrame) window.cancelAnimationFrame(refreshFrame);
  };
};

export const OrientationChapter = () => {
  const stageRef = useRef(null);
  const mediaHostRef = useRef(null);
  const a01Ref = useRef(null);
  const a02Ref = useRef(null);
  const annotationsRef = useRef(null);
  const copyRef = useRef(null);
  const questionRef = useRef(null);

  const sectionRef = useCinematicScene(({ isDesktop, scope }) => {
    if (!isDesktop || !scope || !stageRef.current || !mediaHostRef.current) return undefined;

    const a01Image = a01Ref.current?.querySelector('img');
    const header = document.querySelector('.pa-v7-header');
    const annotations = annotationsRef.current?.querySelectorAll('.pa-opening__annotation') || [];

    gsap.set(a02Ref.current, { clipPath: 'inset(0 0 0 100%)', pointerEvents: 'none' });
    gsap.set(annotations, { autoAlpha: 0, y: 10 });
    gsap.set(questionRef.current, { autoAlpha: 0, y: 12, pointerEvents: 'none' });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 1.65)}`,
        pin: stageRef.current,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(mediaHostRef.current, {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.26,
        ease: 'none',
      }, 0.12)
      .to(a01Image, {
        scale: 1,
        yPercent: 0,
        duration: 0.26,
        ease: 'none',
      }, 0.12)
      .to(copyRef.current, {
        x: -28,
        opacity: 0.08,
        duration: 0.26,
        ease: 'none',
      }, 0.12)
      .to(a02Ref.current, {
        clipPath: 'inset(0 0 0 0%)',
        duration: 0.4,
        ease: 'none',
      }, 0.32)
      .to(annotations, {
        autoAlpha: 1,
        y: 0,
        stagger: 0.035,
        duration: 0.2,
        ease: 'none',
      }, 0.62)
      .set(questionRef.current, { autoAlpha: 1, pointerEvents: 'auto' }, 0.74)
      .to(questionRef.current, {
        y: 0,
        duration: 0.16,
        ease: 'none',
      }, 0.74);

    const nextChapter = scope.nextElementSibling;
    const headerTrigger = header && nextChapter
      ? ScrollTrigger.create({
        trigger: nextChapter,
        start: 'top top+=64',
        end: 'bottom top+=64',
        toggleClass: { targets: header, className: 'pa-v7-header--opening-dark' },
        invalidateOnRefresh: true,
      })
      : null;
    const cancelRefresh = refreshAfterMediaDecode([a01Ref.current, a02Ref.current]);

    return () => {
      cancelRefresh();
      headerTrigger?.kill();
      timeline.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="pa-opening pa-v7-chapter-orientation" aria-labelledby="pa-opening-title">
      <div ref={stageRef} className="pa-opening__stage">
        <div ref={mediaHostRef} className="pa-opening__media-host">
          <figure ref={a01Ref} className="pa-opening__plane pa-opening__plane--a01">
            <MediaPlane
              asset={MEDIA_ASSETS_V7.a01}
              alt="A blurred profile seen through textured glass."
              objectPosition="51% 38%"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              sizes="(min-width: 901px) 78vw, 100vw"
            />
          </figure>

          <figure ref={a02Ref} className="pa-opening__plane pa-opening__plane--a02">
            <MediaPlane
              asset={MEDIA_ASSETS_V7.a02}
              alt="A figure pressing both hands against textured glass."
              objectPosition="50% 42%"
              loading="eager"
              fetchPriority="low"
              decoding="async"
              sizes="(min-width: 901px) 78vw, 100vw"
            />
          </figure>

          <div ref={annotationsRef} className="pa-opening__annotations">
            {EVIDENCE_ROWS.map((row, index) => (
              <p key={row.label} className={`pa-opening__annotation pa-opening__annotation--${index + 1}`}>
                {row.label} — {row.value}
              </p>
            ))}
          </div>
        </div>

        <div ref={copyRef} className="pa-opening__copy">
          <h1 id="pa-opening-title" className="pa-opening__title">
            <span>See the professional</span>
            <span>patterns behind</span>
            <span>your decisions.</span>
          </h1>
          <p className="pa-opening__lead">
            An adaptive assessment that keeps personality, vocational interests and work values separate—then shows how they relate.
          </p>
          <div className="pa-opening__actions">
            <Link to={getSignupAcquisitionUrl()} className="pa-v7-btn pa-v7-btn--ink">Build my profile</Link>
            <Link to="/how-it-works" className="pa-v7-btn pa-v7-btn--outline-ink">How it works</Link>
          </div>
        </div>

        <form ref={questionRef} className="pa-opening__question" aria-label="Example adaptive question">
          <OpeningQuestionFieldset />
        </form>
      </div>
    </section>
  );
};

export default OrientationChapter;
