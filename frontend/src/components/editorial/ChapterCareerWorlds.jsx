// frontend/src/components/editorial/ChapterCareerWorlds.jsx
// Personality Assessor — Chapter 4: Black Interactive Career Worlds (Section 10 & 24 Contract)

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { EDITORIAL_CONTENT } from '../../content/editorial/editorialContent';
import { EDITORIAL_MEDIA_ASSETS } from '../../content/editorial/editorialMedia';
import '../../styles/editorial/editorial-careers.css';

export default function ChapterCareerWorlds() {
  const { chapterTag, headline, lead } = EDITORIAL_CONTENT.careers;
  const careerItems = EDITORIAL_MEDIA_ASSETS.careers.slice(0, 5);

  const [activeCareerIndex, setActiveCareerIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState(0);

  const sectionRef = useRef(null);
  const floatingCardRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef(null);

  const activeCareer = careerItems[activeCareerIndex] || careerItems[0];

  // Smooth lerp animation loop for pointer-following floating card
  const animateFloatingCard = useCallback(() => {
    if (!floatingCardRef.current || !sectionRef.current) return;

    // Damped linear interpolation
    const ease = 0.12;
    currentPosRef.current.x += (mousePosRef.current.x - currentPosRef.current.x) * ease;
    currentPosRef.current.y += (mousePosRef.current.y - currentPosRef.current.y) * ease;

    const x = currentPosRef.current.x;
    const y = currentPosRef.current.y;
    const tilt = ((x / (sectionRef.current.offsetWidth || 1000)) - 0.5) * 6; // -3deg to +3deg

    floatingCardRef.current.style.transform = `translate3d(${x - 190}px, ${y - 125}px, 0) rotate(${tilt}deg)`;

    if (typeof window !== 'undefined') {
      rafIdRef.current = window.requestAnimationFrame(animateFloatingCard);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      rafIdRef.current = window.requestAnimationFrame(animateFloatingCard);
    }
    return () => {
      if (rafIdRef.current && typeof window !== 'undefined') {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [animateFloatingCard]);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleRowMouseEnter = (index, e) => {
    setActiveCareerIndex(index);
    setIsHovered(true);
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      // Initialize position directly on first enter
      if (!isHovered) {
        currentPosRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handleRowMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMobileRowClick = (index) => {
    setMobileExpandedIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section
      ref={sectionRef}
      className="ed-chapter-container"
      onMouseMove={handleMouseMove}
      aria-labelledby="careers-headline"
    >
      <div className="ed-careers-section">
        {/* Chapter Header */}
        <div className="ed-careers__header">
          <span className="ed-tag ed-tag--inverse">{chapterTag}</span>
          <h2 id="careers-headline" className="ed-careers__headline">
            {headline}
          </h2>
          <p className="ed-careers__lead">
            {lead}
          </p>
        </div>

        {/* 5 Career Rows */}
        <div className="ed-careers__list" role="list">
          {careerItems.map((career, idx) => {
            const isDesktopActive = isHovered && activeCareerIndex === idx;
            const isMobileActive = mobileExpandedIndex === idx;

            return (
              <div
                key={career.id}
                className={`ed-careers__row ${isDesktopActive ? 'ed-careers__row--active' : ''} ${
                  isMobileActive ? 'ed-careers__row--mobile-active' : ''
                }`}
                onMouseEnter={(e) => handleRowMouseEnter(idx, e)}
                onMouseLeave={handleRowMouseLeave}
                onClick={() => handleMobileRowClick(idx)}
                role="listitem"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleMobileRowClick(idx);
                  }
                }}
              >
                <div className="ed-careers__row-header">
                  <div className="ed-careers__row-main">
                    <div className="ed-careers__row-title">{career.name}</div>
                    <div className="ed-careers__row-cue">{career.domain} · {career.cue}</div>
                  </div>

                  <div className="ed-careers__row-arrow" aria-hidden="true">
                    ↗
                  </div>
                </div>

                {/* Mobile Inline Expanded State (Touch UX) */}
                <div
                  className="ed-careers__mobile-preview"
                  aria-hidden={!isMobileActive}
                >
                  <div className="ed-careers__mobile-img-wrap">
                    <img
                      src={career.image}
                      alt={career.name}
                      className="ed-careers__mobile-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="ed-careers__mobile-details">
                    <p className="ed-careers__mobile-tagline">{career.tagline}</p>
                    <div className="ed-careers__floating-traits">
                      {career.traits.map((t) => (
                        <span key={t} className="ed-careers__floating-trait-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Dynamic Floating Career Image Card (~90% photographic surface) */}
        <div
          ref={floatingCardRef}
          className={`ed-careers__floating-card ${
            isHovered ? 'ed-careers__floating-card--visible' : ''
          }`}
          aria-hidden="true"
        >
          <img
            src={activeCareer.image}
            alt=""
            className="ed-careers__floating-img"
          />
          <div className="ed-careers__floating-overlay">
            <div className="ed-careers__floating-title">{activeCareer.name}</div>
            <div className="ed-careers__floating-tagline">{activeCareer.tagline}</div>
            <div className="ed-careers__floating-traits">
              {activeCareer.traits.map((t) => (
                <span key={t} className="ed-careers__floating-trait-pill">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '36px', display: 'flex', justifyContent: 'flex-end' }}>
          <Link to="/career-intelligence" className="ed-btn ed-btn--ghost-inverse">
            Explore all career paths →
          </Link>
        </div>
      </div>
    </section>
  );
}
