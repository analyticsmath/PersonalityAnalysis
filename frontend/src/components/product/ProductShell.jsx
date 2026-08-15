import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  FiBarChart2,
  FiCompass,
  FiFileText,
  FiGrid,
  FiLogOut,
  FiPlay,
  FiShield,
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useActiveFlowSessionQuery } from '../../hooks/useAssessmentFlow';
import { readAssessmentFlowState } from '../../utils/assessmentFlowStorage';
import '../../styles/product-shell.css';

const getInitials = (name = '') => {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export default function ProductShell({
  children,
  title = 'Personality Assessor',
  actions = null,
}) {
  const auth = useAuth();
  const navigate = useNavigate();
  const activeFlowSessionQuery = useActiveFlowSessionQuery();

  const rawFlowSession = activeFlowSessionQuery.data?.session || null;
  const localFlowState = readAssessmentFlowState(auth.userId);
  const activeSessionId = rawFlowSession?.sessionId || localFlowState?.sessionId || null;
  const activeSessionStage = rawFlowSession?.stage || localFlowState?.stage || 'questionnaire';

  const isSessionActive = Boolean(
    activeSessionId &&
      activeSessionStage !== 'result' &&
      activeSessionStage !== 'completed'
  );

  const userName = auth.user?.name || auth.name || 'User';
  const initials = getInitials(userName);

  const handleAssessmentClick = (e) => {
    e.preventDefault();
    if (isSessionActive) {
      if (activeSessionStage === 'behavior') {
        navigate(`/assessment/behavior?session=${activeSessionId}`);
      } else {
        navigate(`/assessment/test?session=${activeSessionId}`);
      }
    } else {
      navigate('/assessment/start');
    }
  };

  const handleLogout = () => {
    if (auth.logout) {
      auth.logout();
    }
    navigate('/login');
  };

  return (
    <div className="product-shell">
      {/* ── Desktop Sidebar (Phase 4: 224px, True Neutral Dark #0B0B0B) ── */}
      <aside className="product-sidebar" aria-label="Product Navigation">
        <div className="product-sidebar__head">
          <Link to="/" className="product-sidebar__brand">
            Personality Assessor
          </Link>
        </div>

        <nav className="product-sidebar__nav">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `product-sidebar__link ${isActive ? 'is-active' : ''}`
            }
          >
            <FiGrid className="product-sidebar__icon" />
            <span>Overview</span>
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `product-sidebar__link ${isActive ? 'is-active' : ''}`
            }
          >
            <FiBarChart2 className="product-sidebar__icon" />
            <span>Analytics</span>
          </NavLink>

          <a
            href="/assessment/start"
            onClick={handleAssessmentClick}
            className="product-sidebar__link"
          >
            {isSessionActive ? (
              <>
                <FiCompass className="product-sidebar__icon" />
                <span>Resume Assessment</span>
              </>
            ) : (
              <>
                <FiPlay className="product-sidebar__icon" />
                <span>Start Assessment</span>
              </>
            )}
          </a>

          <NavLink
            to="/account/privacy"
            className={({ isActive }) =>
              `product-sidebar__link ${isActive ? 'is-active' : ''}`
            }
          >
            <FiShield className="product-sidebar__icon" />
            <span>Account &amp; Privacy</span>
          </NavLink>

          <NavLink
            to="/methodology"
            className={({ isActive }) =>
              `product-sidebar__link ${isActive ? 'is-active' : ''}`
            }
          >
            <FiFileText className="product-sidebar__icon" />
            <span>Methodology</span>
          </NavLink>
        </nav>

        <div className="product-sidebar__footer">
          <div className="product-sidebar__user">
            <div className="product-user-avatar" aria-hidden="true">
              {initials}
            </div>
            <span className="product-user-name" title={userName}>
              {userName}
            </span>
          </div>
          <button
            type="button"
            className="product-sidebar__logout-btn"
            onClick={handleLogout}
            aria-label="Sign out of account"
          >
            <FiLogOut className="product-sidebar__icon" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* ── Workspace / Content Area ── */}
      <div className="product-workspace">
        <header className="product-topbar">
          <div className="product-topbar__title-area">
            <h1 className="product-topbar__title">{title}</h1>
          </div>
          <div className="product-topbar__actions">
            {actions}
          </div>
        </header>

        <main className="product-content-area">
          {children}
        </main>
      </div>

      {/* ── Mobile Bottom Navigation (App-like, safe-area-aware) ── */}
      <nav className="product-mobile-nav" aria-label="Mobile Navigation">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `product-mobile-nav__link ${isActive ? 'is-active' : ''}`
          }
        >
          <FiGrid className="product-mobile-nav__icon" />
          <span>Overview</span>
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `product-mobile-nav__link ${isActive ? 'is-active' : ''}`
          }
        >
          <FiBarChart2 className="product-mobile-nav__icon" />
          <span>Analytics</span>
        </NavLink>

        <a
          href="/assessment/start"
          onClick={handleAssessmentClick}
          className="product-mobile-nav__link"
        >
          {isSessionActive ? (
            <>
              <FiCompass className="product-mobile-nav__icon" />
              <span>Resume</span>
            </>
          ) : (
            <>
              <FiPlay className="product-mobile-nav__icon" />
              <span>Assess</span>
            </>
          )}
        </a>

        <NavLink
          to="/account/privacy"
          className={({ isActive }) =>
            `product-mobile-nav__link ${isActive ? 'is-active' : ''}`
          }
        >
          <FiShield className="product-mobile-nav__icon" />
          <span>Privacy</span>
        </NavLink>
      </nav>
    </div>
  );
}
