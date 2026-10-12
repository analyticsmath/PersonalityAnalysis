import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { filmCSS, filmMarkup } from './filmContent';
import { mountHumanTrace } from './filmMotion';

/**
 * Standalone, DOM-first public marketing experience. The shadow boundary
 * prevents cinematic composition styles from affecting the application.
 */
export function HumanTraceFilm() {
  const host = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const shadow = (host.current.shadowRoot || host.current.attachShadow({ mode: 'open' }));
    const style = document.createElement('style');
    style.textContent = filmCSS;
    const viewport = document.createElement('div');
    viewport.className = 'vt-film-body';
    viewport.innerHTML = filmMarkup;
    shadow.append(style, viewport);
    const cleanup = mountHumanTrace(shadow, navigate);
    return () => {
      cleanup?.();
      shadow.replaceChildren();
    };
  }, [navigate]);
  return <div ref={host} className="vt-human-trace-host" data-creative-iteration="08" />;
}

export default HumanTraceFilm;
