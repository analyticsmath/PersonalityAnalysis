import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { navigateCinematic } from './routeNavigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import './cinematicRoutes.css';

const NAV = [
  ['/','The beginning'], ['/how-it-works','How it works'],
  ['/career-intelligence','Career intelligence'], ['/progress','Progress'],
  ['/trust','Trust & evidence'], ['/methodology','Methodology'], ['/privacy','Privacy']
];
const Navigation = createContext(null);
const CinemaScroll = createContext(position=>window.scrollTo({top:position,behavior:"auto"}));
export const useCinemaScroll = () => useContext(CinemaScroll);
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// startViewTransition, transition.ready.catch and interruption handling live in routeNavigation.
const navigateSafely = (navigate, path, origin) => navigateCinematic(navigate, path, origin);

export function CinemaLink({ to, children, className, onClick, ...props }) {
  const go = useContext(Navigation);
  const navigate = useNavigate();
  const handler = useCallback((event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (typeof onClick === 'function') onClick(event);
    if (event.defaultPrevented) return;
    if (to.startsWith('#')) return;
    event.preventDefault();
    (go || ((path, origin) => navigateSafely(navigate, path, origin)))(to, event.currentTarget);
  }, [go, navigate, to, onClick]);
  return <a href={to} className={className} onClick={handler} {...props}>{children}</a>;
}

export function CinematicPublicShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollEngine = useRef(null);
  const scrollTo = useCallback(position => {
    if (scrollEngine.current) scrollEngine.current.scrollTo(position,{duration:.65});
    else window.scrollTo({top:position,behavior:reduced()?"auto":"smooth"});
  },[]);
  const trigger = useRef(null);
  const drawer = useRef(null);
  const go = useCallback((path, origin) => navigateSafely(navigate, path, origin), [navigate]);

  useEffect(() => {
    const mm=gsap.matchMedia();
    mm.add('(pointer:fine) and (prefers-reduced-motion:no-preference)',()=>{
      const lenis = new Lenis({ duration: .85, syncTouch: false });
      scrollEngine.current = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      const tick = time => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      return () => { gsap.ticker.remove(tick); lenis.destroy(); scrollEngine.current=null; };
    });
    return ()=>mm.revert();
  }, [location.pathname]);

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
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    scrollEngine.current?.stop();
    const routeMain = document.getElementById('cinema-main');
    routeMain.inert = true;
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
    return () => { document.body.style.overflow = previousOverflow; routeMain.inert = false; scrollEngine.current?.start(); document.removeEventListener('keydown', key); (trigger.current || previous)?.focus(); };
  }, [menuOpen]);

  return <CinemaScroll.Provider value={scrollTo}><Navigation.Provider value={go}>
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
          <button type="button" ref={trigger} className="vt-index-button" aria-haspopup="dialog" aria-controls="vt-site-index" aria-expanded={menuOpen} onClick={()=>setMenuOpen(true)}>Menu <span aria-hidden="true">+</span></button>
        </div>
      </header>
      <main id="cinema-main" key={location.pathname} tabIndex={-1} className="vt-route-main">
        <Outlet />
      </main>
      <footer className="vt-footer vt-grand-footer">
        <div className="vt-footer-invitation"><h2>A clearer view.<br/>A considered next move.</h2><CinemaLink className="vt-primary" to="/signup?next=%2Fassessment%2Fstart">Discover your profile <span aria-hidden="true">↗</span></CinemaLink></div>
        <nav aria-label="Footer navigation">{NAV.slice(1).map(([to,label])=><CinemaLink to={to} key={to}>{label}</CinemaLink>)}<CinemaLink to="/login">Sign in</CinemaLink></nav>
        <CinemaLink className="vt-footer-wordmark" to="/" aria-label="Personality Assessor home"><span>Personality</span><span>Assessor</span></CinemaLink>
        <div className="vt-footer-bottom"><span>Professional insight. Not a clinical diagnosis.</span><span>By Valtum Studio</span></div>
      </footer>
      {menuOpen && <div className="vt-index-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setMenuOpen(false);}}>
        <aside id="vt-site-index" ref={drawer} role="dialog" aria-modal="true" aria-label="Site index" className="vt-index-drawer">
          <div className="vt-index-header"><span>Personality Assessor</span><button type="button" onClick={()=>setMenuOpen(false)}>CLOSE ×</button></div>
          <nav aria-label="Complete site index">{NAV.map(([to,label])=>
            <CinemaLink key={to} to={to} onClick={()=>setMenuOpen(false)} className={location.pathname===to?'is-active':''}>{label}<span aria-hidden="true">↗</span></CinemaLink>)}</nav>
          <div className="vt-index-foot"><p>Understand your personality. Explore the work ahead.</p></div>
        </aside>
      </div>}
    </div>
  </Navigation.Provider></CinemaScroll.Provider>;
}
export default CinematicPublicShell;
