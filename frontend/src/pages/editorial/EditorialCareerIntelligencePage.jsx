// frontend/src/pages/editorial/EditorialCareerIntelligencePage.jsx
// Personality Assessor — Career Intelligence Explorer Route

import React, { useState, useRef, useEffect, useCallback } from 'react';
import EditorialHeader from '../../components/editorial/EditorialHeader';
import EditorialFooter from '../../components/editorial/EditorialFooter';
import { EDITORIAL_MEDIA_ASSETS } from '../../content/editorial/editorialMedia';
import '../../styles/editorial/editorial-foundation.css';
import '../../styles/editorial/editorial-careers.css';
import '../../styles/editorial/editorial-routes.css';

export default function EditorialCareerIntelligencePage() {
  const allCareers = EDITORIAL_MEDIA_ASSETS.careers;
  const domains = ['All Domains', 'Engineering & Architecture', 'Vision & Prioritization', 'Behavior & Interface Synthesis', 'Empirical Rigor & Modeling', 'Execution & Reliability'];

  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [activeCareerIndex, setActiveCareerIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState(0);

  const filteredCareers = selectedDomain === 'All Domains'
    ? allCareers
    : allCareers.filter((c) => c.domain.includes(selectedDomain) || selectedDomain.includes(c.domain));

  const activeCareer = filteredCareers[activeCareerIndex] || filteredCareers[0] || allCareers[0];

  const sectionRef = useRef(null);
  const floatingCardRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef(null);

  const animateFloatingCard = useCallback(() => {
    if (!floatingCardRef.current || !sectionRef.current) return;

    const ease = 0.12;
    currentPosRef.current.x += (mousePosRef.current.x - currentPosRef.current.x) * ease;
    currentPosRef.current.y += (mousePosRef.current.y - currentPosRef.current.y) * ease;

    const x = currentPosRef.current.x;
    const y = currentPosRef.current.y;
    const tilt = ((x / (sectionRef.current.offsetWidth || 1000)) - 0.5) * 6;

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

  return (
    <div className="ed-route-page">
      <EditorialHeader />

      <div className="ed-chapter-container" style={{ marginTop: '24px' }}>
        <div className="ed-route-hero--dark" style={{ padding: 'clamp(40px, 5vw, 64px)' }}>
          <span className="ed-tag ed-tag--inverse">CAREER INTELLIGENCE &amp; MAPPING</span>
          <h1 className="ed-route-hero__headline ed-route-hero__headline--dark">
            Inspect role requirements, trade-offs, and growth stretches.
          </h1>
          <p className="ed-route-hero__lead ed-route-hero__lead--dark">
            Career matching without opaque scores. Hover over any role to explore required capabilities and cognitive demands.
          </p>

          {/* Domain Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '24px' }}>
            {domains.map((dom) => (
              <button
                key={dom}
                type="button"
                className="ed-btn ed-btn--ghost-inverse"
                style={{
                  padding: '8px 16px',
                  fontSize: '13px',
                  borderRadius: 'var(--ed-radius-pill)',
                  backgroundColor: selectedDomain === dom ? '#FFFFFF' : 'transparent',
                  color: selectedDomain === dom ? '#0B0B0B' : '#FFFFFF',
                  borderColor: selectedDomain === dom ? '#FFFFFF' : 'rgba(255,255,255,0.2)',
                }}
                onClick={() => {
                  setSelectedDomain(dom);
                  setActiveCareerIndex(0);
                }}
              >
                {dom}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main
        ref={sectionRef}
        className="ed-route-body"
        onMouseMove={handleMouseMove}
        style={{ position: 'relative' }}
      >
        <div className="ed-careers-section" style={{ backgroundColor: 'var(--ed-ink)' }}>
          <div className="ed-careers__list" role="list">
            {filteredCareers.map((career, idx) => {
              const isDesktopActive = isHovered && activeCareerIndex === idx;
              const isMobileActive = mobileExpandedIndex === idx;

              return (
                <div
                  key={career.id}
                  className={`ed-careers__row ${isDesktopActive ? 'ed-careers__row--active' : ''}`}
                  onMouseEnter={(e) => handleRowMouseEnter(idx, e)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => setMobileExpandedIndex(idx === mobileExpandedIndex ? -1 : idx)}
                  role="listitem"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setMobileExpandedIndex(idx === mobileExpandedIndex ? -1 : idx);
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

                  {/* Mobile Preview */}
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

          {/* Desktop Floating Image Card */}
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
        </div>
      </main>

      <EditorialFooter />
    </div>
  );
}
