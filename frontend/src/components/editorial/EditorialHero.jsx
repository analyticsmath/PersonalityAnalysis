// frontend/src/components/editorial/EditorialHero.jsx
// Personality Assessor — Reference A Hero Composition Authority

import React from 'react';
import { Link } from 'react-router-dom';
import EditorialHeader from './EditorialHeader';
import { EDITORIAL_MEDIA_ASSETS } from '../../content/editorial/editorialMedia';
import { EDITORIAL_CONTENT } from '../../content/editorial/editorialContent';
import '../../styles/editorial/editorial-hero.css';

export default function EditorialHero() {
  const { actor1, actor2, actor3, actor4, actor5, actor6, actor7 } = EDITORIAL_MEDIA_ASSETS.hero;
  const { headline, lead, microControl, communityLabel, ctaPrimary } = EDITORIAL_CONTENT.hero;

  const scrollToAdaptive = (e) => {
    e.preventDefault();
    const target = document.getElementById('adaptive-chapter');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="ed-hero-section" aria-labelledby="hero-headline">
      {/* Integrated 74px Nav Header */}
      <EditorialHeader />

      {/* Centered Oversized Bold Sans Headline */}
      <div className="ed-hero__text-block">
        <h1 id="hero-headline" className="ed-hero__headline">
          {headline}
        </h1>
        <p className="ed-hero__lead">
          {lead}
        </p>
      </div>

      {/* Visual Field — Reference A 7-Actor Staggered Masonry Composition */}
      <div className="ed-hero__visual-field">
        {/* Upper-Left Circular Micro-Interaction */}
        <a
          href="#adaptive-chapter"
          onClick={scrollToAdaptive}
          className="ed-hero__micro-action"
          aria-label="See how adaptive questions work"
        >
          <div className="ed-hero__micro-dial">
            <svg className="ed-hero__micro-svg" viewBox="0 0 100 100">
              <path
                id="heroTextCircle"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text fontSize="10.5" fontWeight="700" letterSpacing="2.2" fill="#111827">
                <textPath href="#heroTextCircle">
                  {microControl} · {microControl} ·
                </textPath>
              </text>
            </svg>
            <div className="ed-hero__micro-arrow" aria-hidden="true">
              ↓
            </div>
          </div>
        </a>

        {/* Upper-Right Avatar Community Cluster */}
        <div className="ed-hero__community-cluster">
          <div className="ed-hero__avatar-stack" aria-hidden="true">
            <div className="ed-hero__avatar-circle">
              <img src="/media/personality-v3/actors/student-640.webp" alt="" />
            </div>
            <div className="ed-hero__avatar-circle">
              <img src="/media/personality-v3/actors/developer-640.webp" alt="" />
            </div>
            <div className="ed-hero__avatar-circle">
              <img src="/media/personality-v3/actors/scientist-640.webp" alt="" />
            </div>
          </div>
          <span className="ed-hero__community-text">{communityLabel}</span>
        </div>

        {/* Desktop 7-Actor Masonry Grid */}
        <div className="ed-hero__masonry-grid">
          {/* Column 1: Left Stack */}
          <div className="ed-hero__col-left-stack">
            <div className="ed-hero__actor-card ed-hero__actor-card--1">
              <img
                src={actor1.src}
                srcSet={actor1.srcSet}
                sizes="(max-width: 1440px) 18vw, 240px"
                alt={actor1.title}
                className="ed-hero__actor-img"
                loading="eager"
              />
            </div>
            <div className="ed-hero__actor-card ed-hero__actor-card--2">
              <img
                src={actor2.src}
                srcSet={actor2.srcSet}
                sizes="(max-width: 1440px) 18vw, 240px"
                alt={actor2.title}
                className="ed-hero__actor-img"
                loading="eager"
              />
            </div>
          </div>

          {/* Column 2: Center-Left Tall Portrait */}
          <div className="ed-hero__col-center-left">
            <div className="ed-hero__actor-card ed-hero__actor-card--3">
              <img
                src={actor3.src}
                srcSet={actor3.srcSet}
                sizes="(max-width: 1440px) 22vw, 320px"
                alt={actor3.title}
                className="ed-hero__actor-img"
                loading="eager"
              />
            </div>
          </div>

          {/* Column 3: Center Protagonist */}
          <div className="ed-hero__col-center">
            <div className="ed-hero__actor-card ed-hero__actor-card--4">
              <img
                src={actor4.src}
                srcSet={actor4.srcSet}
                sizes="(max-width: 1440px) 26vw, 380px"
                alt={actor4.title}
                className="ed-hero__actor-img"
                loading="eager"
              />
            </div>
          </div>

          {/* Column 4: Center-Right Tall Portrait */}
          <div className="ed-hero__col-center-right">
            <div className="ed-hero__actor-card ed-hero__actor-card--5">
              <img
                src={actor5.src}
                srcSet={actor5.srcSet}
                sizes="(max-width: 1440px) 22vw, 320px"
                alt={actor5.title}
                className="ed-hero__actor-img"
                loading="eager"
              />
            </div>
          </div>

          {/* Column 5: Right Stack */}
          <div className="ed-hero__col-right-stack">
            <div className="ed-hero__actor-card ed-hero__actor-card--6">
              <img
                src={actor6.src}
                srcSet={actor6.srcSet}
                sizes="(max-width: 1440px) 18vw, 240px"
                alt={actor6.title}
                className="ed-hero__actor-img"
                loading="eager"
              />
            </div>
            <div className="ed-hero__actor-card ed-hero__actor-card--7">
              <img
                src={actor7.src}
                srcSet={actor7.srcSet}
                sizes="(max-width: 1440px) 18vw, 240px"
                alt={actor7.title}
                className="ed-hero__actor-img"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Lower Integrated CTA */}
        <div className="ed-hero__integrated-cta-wrap">
          <Link to="/assessment/start" className="ed-hero__cta-btn">
            {ctaPrimary}
          </Link>
        </div>
      </div>

      {/* Mobile Hero Montage (390x844 Independent Layout) */}
      <div className="ed-hero__mobile-composition">
        <div className="ed-hero__mobile-montage">
          <div className="ed-hero__mobile-primary-card">
            <img
              src={actor4.src}
              alt={actor4.title}
              className="ed-hero__actor-img"
              loading="eager"
            />
          </div>
          <div className="ed-hero__mobile-secondary-stack">
            <div className="ed-hero__mobile-sec-card">
              <img
                src={actor5.src}
                alt={actor5.title}
                className="ed-hero__actor-img"
                loading="eager"
              />
            </div>
            <div className="ed-hero__mobile-sec-card">
              <img
                src={actor6.src}
                alt={actor6.title}
                className="ed-hero__actor-img"
                loading="eager"
              />
            </div>
          </div>
        </div>

        <div className="ed-hero__mobile-cta-wrap">
          <Link to="/assessment/start" className="ed-btn ed-btn--primary ed-hero__mobile-cta-btn">
            {ctaPrimary}
          </Link>
        </div>
      </div>
    </section>
  );
}
