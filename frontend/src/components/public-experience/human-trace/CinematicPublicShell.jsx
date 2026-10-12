import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import './cinematicRoutes.css';

const NAV = [
  ['/','The beginning'], ['/how-it-works','How it works'],
  ['/career-intelligence','Career intelligence'], ['/progress','Progress'],
  ['/trust','Trust & evidence'], ['/methodology','Methodology'], ['/privacy','Privacy']
];
const Navigation = createContext(null);
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let activeRouteTransition = null;
function navigateSafely(navigate, path) {
  if (window.location.pathname === path.split('?')[0]) return;
  let applied = false;
  const update = () => {
    if (applied) return;
    applied = true;
    flushSync(() => navigate(path));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  if (document.startViewTransition && !reduced()) {
    try {
      activeRouteTransition?.skipTransition?.();
      const transition = document.startViewTransition(update);
      activeRouteTransition = transition;
      transition.ready.catch(() => {});
      transition.updateCallbackDone.catch(update);
      transition.finished.catch(() => {}).finally(() => {
        if (activeRouteTransition === transition) activeRouteTransition = null;
      });
      // Interruption/freeze safeguard: routing may never depend on an animation callback.
      window.setTimeout(update, 420);
    } catch { update(); }
  } else update();
}

export function CinemaLink({ to, children, className, onClick, ...props }) {
  const go = useContext(Navigation);
  const navigate = useNavigate();
  const handler = useCallback((event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (typeof onClick === 'function') onClick(event);
    if (event.defaultPrevented) return;
    if (to.startsWith('#')) return;
    event.preventDefault();
    (go || ((path) => navigateSafely(navigate, path)))(to);
  }, [go, navigate, to, onClick]);
  return <a href={to} className={className} onClick={handler} {...props}>{children}</a>;
}

export function CinematicPublicShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const trigger = useRef(null);
  const drawer = useRef(null);
  const go = useCallback(path => navigateSafely(navigate, path), [navigate]);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.activeElement;
    drawer.current?.querySelector('button')?.focus();
    const key = e => {
      if (e.key === 'Escape') setMenuOpen(false);
      if (e.key === 'Tab') {
        const controls = [...drawer.current.querySelectorAll('a,button')];
        const first = controls[0], last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('keydown', key); (trigger.current || previous)?.focus(); };
  }, [menuOpen]);

  return <Navigation.Provider value={go}>
    <div className="vt-cinema" data-cinematic-route={location.pathname}>
      <a className="vt-skip" href="#cinema-main">Skip to content</a>
      <div className="vt-top-progress" aria-hidden="true" />
      <header className={'vt-header' + (scrolled ? ' vt-header--scrolled' : '')}>
        <CinemaLink className="vt-brand" to="/">Personality<span>Assessor</span></CinemaLink>
        <nav className="vt-header-links" aria-label="Main site navigation">
          {NAV.slice(1,6).filter((_,i)=>[0,1,2,3].includes(i)).map(([to,label])=>
            <CinemaLink key={to} to={to} className={location.pathname===to?'is-active':''}>{label}</CinemaLink>)}
        </nav>
        <div className="vt-header-actions">
          <CinemaLink className="vt-primary" to="/signup?next=%2Fassessment%2Fstart">Build my profile <span aria-hidden="true">↗</span></CinemaLink>
          <button type="button" ref={trigger} className="vt-index-button" aria-haspopup="dialog" aria-controls="vt-site-index" aria-expanded={menuOpen} onClick={()=>setMenuOpen(true)}>INDEX <span aria-hidden="true">+</span></button>
        </div>
      </header>
      <main id="cinema-main" key={location.pathname} tabIndex={-1} className="vt-route-main">
        <Outlet />
      </main>
      <footer className="vt-footer">
        <div><strong>PERSONALITY ASSESSOR</strong><span>A professional record with its evidence attached.</span></div>
        <nav aria-label="Footer navigation">{NAV.map(([to,label])=><CinemaLink to={to} key={to}>{label}</CinemaLink>)}</nav>
        <span className="vt-footer-note">An analytical tool, not a clinical assessment. Photography illustrates environments.</span>
        <div className="vt-footer-studio">CREATIVE EXPERIENCE BY VALTUM STUDIO</div>
      </footer>
      {menuOpen && <div className="vt-index-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setMenuOpen(false);}}>
        <aside id="vt-site-index" ref={drawer} role="dialog" aria-modal="true" aria-label="Site index" className="vt-index-drawer">
          <div className="vt-index-header"><span>THE EVIDENCE JOURNEY / NAVIGATION</span><button type="button" onClick={()=>setMenuOpen(false)}>CLOSE ×</button></div>
          <nav aria-label="Complete site index">{NAV.map(([to,label],idx)=>
            <CinemaLink key={to} to={to} onClick={()=>setMenuOpen(false)} className={location.pathname===to?'is-active':''}><span>0{idx+1}</span>{label}<span aria-hidden="true">↗</span></CinemaLink>)}</nav>
          <div className="vt-index-foot"><span>01—A / THE HUMAN TRACE</span><p>One response travels across contexts. The source stays visible.</p></div>
        </aside>
      </div>}
    </div>
  </Navigation.Provider>;
}
export default CinematicPublicShell;
