import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import MagneticTarget from '../motion/MagneticTarget';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';

export const DECISION_CHOICES = [
  { id: 'c1', text: 'Clarify responsibilities before committing work.', desktopPos: { left: '4%', top: '8%' } },
  { id: 'c2', text: 'Start a small test and learn from it.', desktopPos: { left: '34%', top: '29%' } },
  { id: 'c3', text: 'Bring the teams together and align priorities.', desktopPos: { left: '8%', top: '55%' } },
  { id: 'c4', text: 'Choose a direction and adjust as evidence arrives.', desktopPos: { left: '40%', top: '76%' } },
];

/**
 * HOME DECISION SCENE STATE MAP
 * 0%   - Rear environmental plane (homeSharedContext) establishes situational work atmosphere.
 * 25%  - Evidence statement is centered. 4 demonstration choices distributed asymmetrically across field.
 * 50%  - On choice selection: chosen item migrates toward evidence axis, receives Oxblood marker.
 * 75%  - Unselected choices recede in opacity (.22).
 * 100% - Selected payload flows directly into the Transformation sequence.
 */
export const HomeDecisionChapter = ({ selectedChoice, onSelectChoice }) => {
  const choicesContainerRef = useRef(null);
  const choiceItemsRef = useRef([]);
  const sharedContextAsset = MEDIA_ASSETS_V7.homeSharedContext;

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!choicesContainerRef.current) return;

    choiceItemsRef.current.forEach((el, idx) => {
      if (!el) return;
      const choice = DECISION_CHOICES[idx];
      const isSelected = selectedChoice?.id === choice.id;

      if (prefersReduced) {
        el.style.opacity = selectedChoice ? (isSelected ? '1' : '0.25') : '1';
        return;
      }

      if (selectedChoice) {
        if (isSelected) {
          gsap.to(el, {
            x: isMobile ? 0 : 12,
            y: isMobile ? 0 : 16,
            scale: 1.03,
            opacity: 1,
            duration: 0.46,
            ease: 'power3.inOut',
          });
        } else {
          gsap.to(el, {
            x: isMobile ? 0 : (idx % 2 === 0 ? -22 : 22),
            y: isMobile ? 0 : (idx < 2 ? -18 : 18),
            scale: 0.96,
            opacity: 0.22,
            duration: 0.46,
            ease: 'power3.inOut',
          });
        }
      } else {
        gsap.to(el, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    });
  }, [selectedChoice]);

  return (
    <section
      id="context-decision-chapter"
      className="pa-home-decision"
      aria-label="Contextual Decision"
      data-tone="light"
    >
      {/* Rear Environmental Plane (Collaborative Work Surface) */}
      <div className="pa-home-decision__bg-media" aria-hidden="true">
        <picture>
          <source type="image/avif" srcSet={sharedContextAsset.avifSrcSet} sizes="(min-width: 901px) 50vw, 100vw" />
          <source type="image/webp" srcSet={sharedContextAsset.webpSrcSet} sizes="(min-width: 901px) 50vw, 100vw" />
          <img
            src={sharedContextAsset.source}
            alt=""
            width={sharedContextAsset.intrinsicDimensions.width}
            height={sharedContextAsset.intrinsicDimensions.height}
            className="pa-home-decision__bg-img"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>

      <div className="pa-v7-grid pa-home-decision__grid">
        {/* Left 5 Columns: Question Prompt */}
        <div className="pa-home-decision__prompt">
          <h2 className="pa-heading-major pa-home-decision__h2">
            Context comes first.
          </h2>
          <p className="pa-home-decision__question">
            A project has a fixed deadline, unclear ownership and two teams waiting on a decision. What would you do first?
          </p>
          <p className="pa-home-decision__note">
            This public example is illustrative. Your answer becomes an evidence object that contributes to several distinct readings below.
          </p>
        </div>

        {/* Right 6–7 Columns: Orbiting/Staggered Choices */}
        <fieldset ref={choicesContainerRef} className="pa-home-decision__choices">
          <legend className="pa-home-decision__legend">
            Choose your primary action in this scenario
          </legend>

          {DECISION_CHOICES.map((choice, idx) => {
            const isSelected = selectedChoice?.id === choice.id;
            return (
              <MagneticTarget
                key={choice.id}
                maxDisplacement={8}
                className="pa-home-decision__choice-wrapper"
              >
                <label
                  ref={(node) => (choiceItemsRef.current[idx] = node)}
                  htmlFor={`decision-radio-${choice.id}`}
                  className={`pa-choice-item ${isSelected ? 'pa-choice-item--selected' : ''}`}
                  style={{
                    '--choice-left': choice.desktopPos.left,
                    '--choice-top': choice.desktopPos.top,
                  }}
                >
                  <input
                    type="radio"
                    id={`decision-radio-${choice.id}`}
                    name="contextual-decision-choice"
                    value={choice.id}
                    checked={isSelected}
                    onChange={() => onSelectChoice(choice)}
                    className="pa-choice-item__radio"
                  />
                  <span className="pa-choice-item__num" aria-hidden="true">
                    0{idx + 1}
                  </span>
                  <span className="pa-choice-item__label">{choice.text}</span>
                </label>
              </MagneticTarget>
            );
          })}
        </fieldset>
      </div>
    </section>
  );
};

export default HomeDecisionChapter;
