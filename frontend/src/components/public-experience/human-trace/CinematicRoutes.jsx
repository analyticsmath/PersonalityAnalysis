import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import careersData from '../../../content/careers.json';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { CinemaLink } from './CinematicPublicShell';

gsap.registerPlugin(ScrollTrigger);
const PATH='/media/public-experience/cinematic/';
const PHOTO={
  source:PATH+'1503387762-592deb58ef4e.jpg',
  detail:PATH+'1649688066810-59a394fc0fef.jpg',
  precision:PATH+'1645258044234-f4ba2655baf1.jpg',
  autonomy:PATH+'1742440710402-721332ea7898.jpg',
  shared:PATH+'1590649681928-4b179f773bd5.jpg',
  pressure:PATH+'1554863798-d89af6030d7d.jpg',
  inquiry:PATH+'1576141546153-3e04370b5ff7.jpg',
  proof:PATH+'1745845289797-913815100704.jpg',
  design:PATH+'1759884247144-53d52c31f859.jpg'
};
const STATEMENT='I clarify the constraints first, then choose the smallest reversible step.';

function usePageChoreography(ref) {
  useEffect(()=>{
    const scope=ref.current;
    if(!scope) return;
    const mm=gsap.matchMedia();
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)',()=>{
      const ctx=gsap.context(()=>{
        const image=scope.querySelector('.vt-cover-photo');
        if(image) gsap.fromTo(image,{scale:1.04,yPercent:-2},{
          scale:1.17,yPercent:7,ease:'none',scrollTrigger:{trigger:scope.querySelector('.vt-cover'),start:'top top',end:'bottom top',scrub:1,invalidateOnRefresh:true}
        });
        const cover = scope.querySelector('.vt-cover');
        const title = scope.querySelector('.vt-cover h1');
        if (title) gsap.fromTo(title, {y: 48, clipPath:'inset(0 0 100% 0)'}, {y:0,clipPath:'inset(0)',duration:1.05,ease:'power3.out'});
        if (cover) gsap.to(scope.querySelector('.vt-cover-copy'), {
          yPercent:-12,ease:'none',scrollTrigger:{trigger:cover,start:'top top',end:'bottom top',scrub:.7}
        });
        scope.querySelectorAll('[data-reveal]').forEach(el=> {
          const heading = el.querySelector('h2');
          if (heading) gsap.fromTo(heading,{y:32,clipPath:'inset(0 0 100% 0)'},{
            y:0,clipPath:'inset(0)',duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 87%',once:true}
          });
        });
      },scope);
      return ()=>ctx.revert();
    });
    return ()=>mm.revert();
  },[ref]);
}

function Cover({lines,image,alt,description,position='center',children,variant=''}) {
  return <section className={'vt-cover vt-cover--'+variant} data-transition-actor="marketing-cover">
    <div className="vt-cover-media" data-transition-media>
      <img className="vt-cover-photo" src={image} alt={alt} style={{objectPosition:position}} fetchPriority="high" />
    </div>
    <div className="vt-cover-shade" aria-hidden="true"/>
    <div className="vt-cover-copy">
      <h1>{lines.map((line,i)=><span key={i}>{line}</span>)}</h1>
      <p>{description}</p>
      {children}
    </div>
    <div className="vt-cover-bottom"><span>Scroll to explore ↓</span></div>
  </section>;
}

function SourceNote({dark=false}) {
  return <aside className={'vt-source-note'+(dark?' vt-source-note--dark':'')} aria-label="Illustrative source response">

    <blockquote>“{STATEMENT}”</blockquote>
    <small>Illustrative response. NOT A COMPLETE ASSESSMENT RESULT.</small>
  </aside>;
}

function NextChapter({to,title,subtitle,image}) {
  return <CinemaLink className="vt-next" to={to} data-transition-media>
    <img src={image} loading="lazy" alt="" />
    <div className="vt-next-shade"/>
    <div className="vt-next-content"><strong>{title}</strong><span>{subtitle}</span></div>
    <span className="vt-next-arrow" aria-hidden="true">↗</span>
  </CinemaLink>;
}

function PageFrame({children,className=''}) {
  const ref=useRef(null);
  usePageChoreography(ref);
  return <div ref={ref} className={'vt-route vt-route--'+className}>{children}</div>;
}

export function HowCinematicPage() {
  const steps=PUBLIC_CONTENT.how.movements;
  const weights=PUBLIC_CONTENT.home.calibration.weights;
  return <PageFrame className="how">
    <Cover lines={['From your answers.','To your perspective.']} image={PHOTO.detail} alt="A person's hand moves a pencil across an architectural drawing" description="Understand how your responses contribute to a profile of your personality, interests and work values." position="55% 45%" variant="how"/>
    <div className="vt-essay-intro" data-reveal><h2>Before the inference,<br/><em>there is a source.</em></h2><p>A single answer can suggest questions worth asking. A scored profile requires sufficient independent evidence.</p></div>
    <div className="vt-how-sequence">
      <aside className="vt-how-fixed">
        <img src={PHOTO.source} loading="lazy" alt="Hands drafting a technical plan" />
        <div className="vt-how-fixed-shade"/><SourceNote dark/>
      </aside>
      <div className="vt-how-steps">
        {steps.map((step,i)=><article key={step.id} className="vt-how-step" id={'step-'+step.id} data-reveal>

          <h2>{step.title}</h2><p>{step.description}</p>
          {i===1&&<div className="vt-clause-pair"><span>“I clarify the constraints first,”</span><span>“then choose the smallest reversible step.”</span></div>}
          {i===2&&<div className="vt-framework-small">{PUBLIC_CONTENT.home.models.list.slice(0,4).map(x=><span key={x.id}>{x.name}</span>)}</div>}
          {i===3&&<div className="vt-weight-tracks">{weights.map(w=><div key={w.id}><span>{w.label}</span><strong>{w.percentage}%</strong><i style={{width:w.percentage*3+'%'}}/></div>)}</div>}
        </article>)}
      </div>
    </div>
    <section className="vt-quiet-end" data-reveal><h2>No single response<br/>becomes a verdict.</h2><p>Inputs, inferred dimensions, explicit weights and limitations belong to separate stages of the record.</p><CinemaLink className="vt-text-link" to="/methodology">Examine the methodology ↗</CinemaLink></section>
    <NextChapter to="/career-intelligence" title="Explore your possibilities." subtitle="The same evidence meets different working conditions." image={PHOTO.precision}/>
  </PageFrame>;
}

const mediaForRole=(key)=>{
  if(/designer|frontend|product_manager/.test(key))return PHOTO.design;
  if(/data|machine_learning|cybersecurity|business_analyst/.test(key))return PHOTO.inquiry;
  if(/success|program_manager/.test(key))return PHOTO.shared;
  if(/power_systems|control_systems|automation|devops/.test(key))return PHOTO.precision;
  if(/electrical|embedded/.test(key))return PHOTO.precision;
  return PHOTO.autonomy;
};
export function CareerCinematicPage(){
  const keys=Object.keys(careersData);
  const [key,setKey]=useState(keys[0]);
  const refs=useRef([]);
  const role=careersData[key];

  const changeByKeyboard=(event,i)=>{
    if(!['ArrowUp','ArrowDown','Home','End'].includes(event.key))return;
    event.preventDefault();
    const next=event.key==='Home'?0:event.key==='End'?keys.length-1:(i+(event.key==='ArrowDown'?1:-1)+keys.length)%keys.length;
    setKey(keys[next]);refs.current[next]?.focus();
  };
  return <PageFrame className="career">
    <Cover lines={['Find work','that speaks to you.']} image={PHOTO.precision} alt="A craftsperson at work in a precise manufacturing environment" description="Explore the skills, interests and conditions behind different careers. Give your next move a clearer context." position="55% center" variant="career"/>
    <div className="vt-essay-intro vt-essay-intro--dark" data-reveal><h2>Environments change.<br/><em>The questions change.</em></h2><p>Choose an occupation. Explore the skills and foundational disciplines represented in its canonical profile. This is not a recommendation for a specific person.</p></div>
    <section className="vt-career-explorer" aria-label="Explore 17 occupations">
      <div className="vt-career-list">
        <div role="tablist" aria-label="Occupational profiles" aria-orientation="vertical">{keys.map((k,i)=>
          <button key={k} ref={el=>refs.current[i]=el} id={'vt-role-tab-'+k} role="tab" aria-controls="vt-career-detail" aria-selected={key===k} tabIndex={key===k?0:-1} onClick={()=>setKey(k)} onKeyDown={e=>changeByKeyboard(e,i)} className={key===k?'is-selected':''}>{careersData[k].title}<span aria-hidden="true">↗</span></button>
        )}</div>
      </div>
      <div className="vt-career-display" id="vt-career-detail" role="tabpanel" aria-labelledby={'vt-role-tab-'+key} tabIndex={0}>
        <div className="vt-career-photography" data-transition-media key={key}><img src={mediaForRole(key)} alt={'Illustrative professional working context for '+role.title}/></div>
        <div className="vt-career-portrait-shade"/>
        <div className="vt-career-inspection">

          <h2>{role.title}</h2>
          <div className="vt-career-inspection-grid">
            <div><strong>Core capabilities</strong><p>{role.skills.slice(0,5).join(' · ')}</p></div>
            <div><strong>Foundational domains</strong><p>{role.subjects.slice(0,4).join(' · ')}</p></div>
          </div>
          <small>Occupational requirements. Not a personal career-fit score.</small>
        </div>
      </div>
    </section>
    <section className="vt-quiet-end" data-reveal><h2>Look beyond<br/>a job title.</h2><p>Interests, skills, work values, personality, education and goals contribute differently to the complete calculation. See the exact weights rather than assuming a mysterious match.</p><CinemaLink className="vt-text-link" to="/methodology">Explore the scoring model ↗</CinemaLink></section>
    <NextChapter to="/progress" title="See what changes." subtitle="Return to the same record over time." image={PHOTO.shared}/>
  </PageFrame>;
}

export function ProgressCinematicPage(){
  const [split,setSplit]=useState(55);
  const content=PUBLIC_CONTENT.progress;
  return <PageFrame className="progress">
    <Cover lines={['A little distance.','A different view.']} image={PHOTO.autonomy} alt="A person working independently in a wood-lined study environment" description={content.hero.support} position="center 52%" variant="progress"/>
    <div className="vt-essay-intro" data-reveal><h2>Time adds context.<br/><em>It does not erase.</em></h2><p>Compare illustrative working environments. A genuine personal change requires at least two complete assessment records.</p></div>
    <section className="vt-time-comparison" aria-label="Illustrative timeline comparator">
      <div className="vt-time-stage" style={{'--split':split+'%'}}>
        <img src={PHOTO.autonomy} loading="lazy" alt="Illustrative baseline solo workspace" className="vt-time-image" />
        <div className="vt-time-mask"><img src={PHOTO.shared} loading="lazy" alt="Illustrative later collaborative workspace" className="vt-time-image" /></div>
        <span className="vt-time-tag vt-time-tag--left">Independent work</span><span className="vt-time-tag vt-time-tag--right">Working together</span>
        <div className="vt-time-divider" aria-hidden="true"><span>↔</span></div>
      </div>
      <div className="vt-time-controls"><label htmlFor="vt-longitudinal-slider">Compare the working environments</label><input id="vt-longitudinal-slider" type="range" min="5" max="95" value={split} onChange={e=>setSplit(Number(e.target.value))} aria-valuetext={split+' percent of the later illustrative environment'} /><output>{split}%</output></div>
    </section>
    <section className="vt-longitudinal-text">
      <article data-reveal><h2>{content.stabilityFinding}</h2><p>Without an earlier record, there is nothing reliable to compare. Source and context must remain available for later inspection.</p></article>
      <article data-reveal><h2>{content.adaptationFinding}</h2><p>Later conditions can alter the interpretation. Neither photograph represents the assessment history of a real person.</p></article>
    </section>
    <div className="vt-dark-quote" data-reveal><SourceNote dark/><p>One continuous source. Different contexts. No fabricated timeline.</p></div>
    <NextChapter to="/trust" title="See the evidence." subtitle="Every interpretation starts somewhere." image={PHOTO.proof}/>
  </PageFrame>;
}

export function TrustCinematicPage(){
  const steps=PUBLIC_CONTENT.trust.recordStateSteps;
  const [active,setActive]=useState(0);
  const step=steps[active];
  return <PageFrame className="trust">
    <Cover lines={['Nothing useful','without trust.']} image={PHOTO.proof} alt="Hands examining and arranging physical printed materials" description="See the evidence behind an interpretation. Understand its limits. Keep control of your information." variant="trust"/>
    <div className="vt-essay-intro" data-reveal><h2>Inspect the reading.<br/><em>Then its origin.</em></h2><p>Five stages explain the journey from a contextual answer to a professional comparison. Sample inputs are illustrative, not diagnoses.</p></div>
    <section className="vt-trust-inspection" aria-label="Explore the evidence chain">
      <div className="vt-trust-original"><img src={PHOTO.detail} loading="lazy" alt="Close-up of drafting material that represents source documentation"/><div><blockquote>“{STATEMENT}”</blockquote></div></div>
      <div className="vt-trust-data">
        <h2>{step.name}</h2><strong>{step.title}</strong><p>{step.description}</p>
        <div className="vt-trust-step-buttons" role="group" aria-label="Select provenance stage">{steps.map((s,i)=><button key={s.id} className={i===active?'is-selected':''} aria-pressed={i===active} onClick={()=>setActive(i)}>{s.name}</button>)}</div>
        <p className="vt-trust-note">An illustrative provenance demonstration. The underlying system must pass validity and evidence-sufficiency checks.</p>
      </div>
    </section>
    <section className="vt-rights" data-reveal><div><h2>Your record.<br/>Your controls.</h2><p>Review export, transparency and account-removal actions in their authenticated contexts.</p></div><div className="vt-rights-list">{PUBLIC_CONTENT.trust.rightsActions.map(r=><article key={r.id}><div><h3>{r.label}</h3><p>{r.description}</p><CinemaLink className="vt-text-link" to={r.link}>Review this control ↗</CinemaLink></div></article>)}</div></section>
    <NextChapter to="/methodology" title="Understand the method." subtitle="The models, formulas and their limits." image={PHOTO.inquiry}/>
  </PageFrame>;
}

const sectionKeys=['bigFive','riasec','workValues','behavioralSignals','careerWeights','validityStates','aiNarrative','limits'];
function MethodDetail({name,item}){
  if(name==='bigFive') return <div className="vt-method-chip-field">{item.dimensions.map(d=><span key={d}>{d}</span>)}</div>;
  if(name==='riasec') return <div className="vt-method-chip-field">{item.orbit.map(d=><span key={d}>{d}</span>)}</div>;
  if(name==='workValues')return <div className="vt-method-chip-field">{item.priorities.map(d=><span key={d}>{d}</span>)}</div>;
  if(name==='behavioralSignals')return <div className="vt-method-chip-field">{item.patterns.map(d=><span key={d}>{d}</span>)}</div>;
  if(name==='careerWeights')return <div className="vt-method-weights">{PUBLIC_CONTENT.home.calibration.weights.map(w=><div key={w.id}><span>{w.label}</span><b>{w.percentage}%</b><i style={{width:w.percentage*3+'%'}}/></div>)}</div>;
  if(name==='validityStates')return <div className="vt-method-chip-field">{['valid','partial','insufficient_data'].map(x=><code key={x}>{x}</code>)}</div>;
  return null;
}
export function MethodologyCinematicPage(){
  const sections=PUBLIC_CONTENT.methodology.sections;
  return <PageFrame className="method">
    <Cover lines={['Understand','the thinking.']} image={PHOTO.inquiry} alt="A professional examining a complex technical workspace" description="Explore the models behind your profile and the factors behind a career comparison." variant="method"/>
    <div className="vt-method-intro" data-reveal><h2>Methods must be<br/><em>visible.</em></h2><p>{PUBLIC_CONTENT.methodology.hero.support}</p></div>
    <div className="vt-monograph"><div className="vt-monograph-index">{sectionKeys.map(k=><a href={'#method-'+k} key={k}>{sections[k].title}</a>)}</div><div className="vt-monograph-articles">{sectionKeys.map(k=><article id={'method-'+k} key={k} data-reveal><h2>{sections[k].title}</h2><p>{sections[k].description}</p><MethodDetail name={k} item={sections[k]}/></article>)}</div></div>
    <div className="vt-method-verdict"><h2>Professional insight.<br/><em>Not clinical diagnosis.</em></h2><p>{sections.limits.description}</p><CinemaLink className="vt-text-link" to="/trust">Inspect the evidence chain ↗</CinemaLink></div>
    <NextChapter to="/privacy" title="Your information. Your choice." subtitle="Plain-language governance and account controls." image={PHOTO.detail}/>
  </PageFrame>;
}
export function PrivacyCinematicPage(){
  const data=PUBLIC_CONTENT.privacy;
  return <PageFrame className="privacy">
    <Cover lines={['Your information.','Your choice.']} image={PHOTO.detail} alt="A professional examining the details of a physical draft" description={data.hero.support} variant="privacy"/>
    <div className="vt-privacy-brief" data-reveal><h2>Make it<br/><em>understandable.</em></h2><p>Read the policies below and open your account controls when you are signed in. This text describes the published product policy.</p></div>
    <section className="vt-privacy-document"><nav aria-label="Policy table of contents">{data.sections.map(s=><a href={'#'+s.id} key={s.id}>{s.title}</a>)}</nav><div>{data.sections.map(s=><article key={s.id} id={s.id} data-reveal><h2>{s.title}</h2><p>{s.content}</p></article>)}</div></section>
    <section className="vt-method-verdict"><h2>Your record remains<br/><em>inspectable.</em></h2><CinemaLink className="vt-text-link" to="/account/privacy">Open privacy controls ↗</CinemaLink></section>
    <NextChapter to="/" title="A clearer direction." subtitle="The story begins with one source response." image={PHOTO.source}/>
  </PageFrame>;
}
