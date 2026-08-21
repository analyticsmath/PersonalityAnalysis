import React from 'react';
import { Link } from 'react-router-dom';

export const HomeChangeChapter = () => {
  return (
    <section className="pa-home-change" aria-label="Change Over Time">
      <div className="pa-v7-grid">
        <div style={{ gridColumn: '1 / -1' }} className="pa-home-change__inner">
          <div className="pa-home-change__copy">
            <h2 className="pa-home-change__h2">
              The record can change when the evidence changes.
            </h2>
            <p className="pa-home-change__body">
              Assessment history and trend views let later evidence sit beside earlier readings. Stable patterns can stay visible while new context changes the picture.
            </p>
            <div>
              <Link to="/progress" className="pa-btn-primary">
                See how progress works
              </Link>
            </div>
          </div>

          <div className="pa-home-change__comparison">
            <div className="pa-change-card pa-change-card--earlier">
              <span className="pa-change-card__tag">Earlier Evidence</span>
              <p className="pa-change-card__statement">
                "I avoid ambiguous ownership because it makes delivery harder to control."
              </p>
            </div>

            <div className="pa-change-card pa-change-card--revised">
              <span className="pa-change-card__tag">Revised Reading with New Context</span>
              <p className="pa-change-card__statement">
                "Structure still matters. Newer evidence now also supports greater tolerance for ambiguity."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeChangeChapter;
