import React, { useEffect, useRef, useState } from 'react';
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
const LINK='/signup?next=%2Fassessment%2Fstart';

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
        scope.querySelectorAll('[data-reveal]').forEach(el=>gsap.fromTo(el,{y:35,opacity:0},{
          y:0,opacity:1,duration:.85,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}
        }));
      },scope);
      return ()=>ctx.revert();
    });
    return ()=>mm.revert();
  },[ref]);
}

function Cover({chapter,eyebrow,lines,image,alt,description,position='center',children,variant=''}) {
  return <section className={'vt-cover vt-cover--'+variant} data-transition-actor="marketing-cover">
    <div className="vt-cover-media">
      <img className="vt-cover-photo" src={image} alt={alt} style={{objectPosition:position}} fetchPriority="high" />
    </div>
    <div className="vt-cover-shade" aria-hidden="true"/>
    <div className="vt-cover-kicker"><span>{eyebrow}</span><span>{chapter} / 07</span></div>
    <div className="vt-cover-copy">
      <h1>{lines.map((line,i)=><span key={i}>{line}</span>)}</h1>
      <p>{description}</p>
      {children}
    </div>
    <div className="vt-cover-bottom"><span>01—A / THE HUMAN TRACE</span><span>SCROLL TO FOLLOW THE RECORD ↓</span></div>
  </section>;
}

function SourceNote({dark=false}) {
  return <aside className={'vt-source-note'+(dark?' vt-source-note--dark':'')} aria-label="Illustrative source response">
    <span className="vt-micro">EVIDENCE RECORD / 01—A</span>
    <blockquote>“{STATEMENT}”</blockquote>
    <small>ILLUSTRATIVE RESPONSE. NOT A COMPLETE ASSESSMENT RESULT.</small>
  </aside>;
}

function NextChapter({to,number,title,subtitle,image}) {
  return <CinemaLink className="vt-next" to={to}>
    <img src={image} loading="lazy" alt="" />
    <div className="vt-next-shade"/>
    <div className="vt-next-content"><span className="vt-micro">NEXT CHAPTER / {number}</span><strong>{title}</strong><span>{subtitle}</span></div>
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
    <Cover chapter="02" eyebrow="FROM RESPONSE TO READING" lines={['FOLLOW','ONE ANSWER.']} image={PHOTO.detail} alt="A person's hand moves a pencil across an architectural drawing" description="A source record keeps its origin while evidence, models and professional context are examined." position="55% 45%" variant="how"/>
    <div className="vt-essay-intro" data-reveal><span className="vt-micro">THE CAUSAL JOURNEY</span><h2>Before the inference,<br/><em>there is a source.</em></h2><p>A single answer can suggest questions worth asking. A scored profile requires sufficient independent evidence.</p></div>
    <div className="vt-how-sequence">
      <aside className="vt-how-fixed">
        <img src={PHOTO.source} loading="lazy" alt="Hands drafting a technical plan" />
        <div className="vt-how-fixed-shade"/><SourceNote dark/>
      </aside>
      <div className="vt-how-steps">
        {steps.map((step,i)=><article key={step.id} className="vt-how-step" id={'step-'+step.id} data-reveal>
          <div className="vt-micro">0{i+1} / {step.name}</div>
          <h2>{step.title}</h2><p>{step.description}</p>
          {i===1&&<div className="vt-clause-pair"><span>“I clarify the constraints first,”</span><span>“then choose the smallest reversible step.”</span></div>}
          {i===2&&<div className="vt-framework-small">{PUBLIC_CONTENT.home.models.list.slice(0,4).map(x=><span key={x.id}>{x.name}</span>)}</div>}
          {i===3&&<div className="vt-weight-tracks">{weights.map(w=><div key={w.id}><span>{w.label}</span><strong>{w.percentage}%</strong><i style={{width:w.percentage*3+'%'}}/></div>)}</div>}
        </article>)}
      </div>
    </div>
    <section className="vt-quiet-end" data-reveal><span className="vt-micro">THE RECORD REMAINS INSPECTABLE</span><h2>No single response<br/>becomes a verdict.</h2><p>Inputs, inferred dimensions, explicit weights and limitations belong to separate stages of the record.</p><CinemaLink className="vt-text-link" to="/methodology">Examine the methodology ↗</CinemaLink></section>
    <NextChapter to="/career-intelligence" number="03" title="THE OCCUPATIONAL FIELD." subtitle="The same evidence meets different working conditions." image={PHOTO.precision}/>
  </PageFrame>;
}

const mediaForRole=(key)=>{
  if(/designer|frontend|product_manager/.test(key))return PHOTO.design;
  if(/data|machine_learning|cybersecurity|business_analyst/.test(key))return PHOTO.inquiry;
  if(/success|program_manager/.test(key))return PHOTO.shared;
  if(/power_systems|control_systems|automation|devops/.test(key))return PHOTO.pressure;
  if(/electrical|embedded/.test(key))return PHOTO.precision;
  return PHOTO.autonomy;
};
export function CareerCinematicPage(){
  const keys=Object.keys(careersData);
  const [key,setKey]=useState(keys[0]);
  const refs=useRef([]);
  const role=careersData[key];
  const chosen=keys.indexOf(key);
  const changeByKeyboard=(event,i)=>{
    if(!['ArrowUp','ArrowDown','Home','End'].includes(event.key))return;
    event.preventDefault();
    const next=event.key==='Home'?0:event.key==='End'?keys.length-1:(i+(event.key==='ArrowDown'?1:-1)+keys.length)%keys.length;
    setKey(keys[next]);refs.current[next]?.focus();
  };
  return <PageFrame className="career">
    <Cover chapter="03" eyebrow="CAREER INTELLIGENCE" lines={['FIT IS','A FIELD.']} image={PHOTO.precision} alt="A craftsperson at work in a precise manufacturing environment" description="Explore occupational conditions, capabilities and interests. No career can be reduced to a single ranking." position="55% center" variant="career"/>
    <div className="vt-essay-intro vt-essay-intro--dark" data-reveal><span className="vt-micro">17 CANONICAL PROFILES / NO PERSONAL SCORES</span><h2>Environments change.<br/><em>The questions change.</em></h2><p>Choose an occupation. Explore the skills and foundational disciplines represented in its canonical profile. This is not a recommendation for a specific person.</p></div>
    <section className="vt-career-explorer" aria-label="Explore 17 occupations">
      <div className="vt-career-list"><span className="vt-micro">SELECT A WORKING CONTEXT / {String(keys.length).padStart(2,'0')} PROFILES</span>
        <div role="tablist" aria-label="Occupational profiles" aria-orientation="vertical">{keys.map((k,i)=>
          <button key={k} ref={el=>refs.current[i]=el} id={'vt-role-tab-'+k} role="tab" aria-controls="vt-career-detail" aria-selected={key===k} tabIndex={key===k?0:-1} onClick={()=>setKey(k)} onKeyDown={e=>changeByKeyboard(e,i)} className={key===k?'is-selected':''}><span>{String(i+1).padStart(2,'0')}</span>{careersData[k].title}<span aria-hidden="true">↗</span></button>
        )}</div>
      </div>
      <div className="vt-career-display" id="vt-career-detail" role="tabpanel" aria-labelledby={'vt-role-tab-'+key} tabIndex={0}>
        <div className="vt-career-photography" key={key}><img src={mediaForRole(key)} alt={'Illustrative professional working context for '+role.title}/></div>
        <div className="vt-career-portrait-shade"/>
        <div className="vt-career-inspection">
          <span className="vt-micro">OCCUPATIONAL STUDY / {String(chosen+1).padStart(2,'0')}</span>
          <h2>{role.title}</h2>
          <div className="vt-career-inspection-grid">
            <div><strong>Core capabilities</strong><p>{role.skills.slice(0,5).join(' · ')}</p></div>
            <div><strong>Foundational domains</strong><p>{role.subjects.slice(0,4).join(' · ')}</p></div>
          </div>
          <small>CANONICAL PROFILE DATA. NOT AN INDIVIDUAL CAREER-FIT SCORE.</small>
        </div>
      </div>
    </section>
    <section className="vt-quiet-end" data-reveal><span className="vt-micro">CONTEXT IS NOT DESTINY</span><h2>Look beyond<br/>a job title.</h2><p>Interests, skills, work values, personality, education and goals contribute differently to the complete calculation. See the exact weights rather than assuming a mysterious match.</p><CinemaLink className="vt-text-link" to="/methodology">Explore the scoring model ↗</CinemaLink></section>
    <NextChapter to="/progress" number="04" title="WHAT CHANGED?" subtitle="Return to the same record over time." image={PHOTO.shared}/>
  </PageFrame>;
}

export function ProgressCinematicPage(){
  const [split,setSplit]=useState(55);
  const content=PUBLIC_CONTENT.progress;
  return <PageFrame className="progress">
    <Cover chapter="04" eyebrow="LONGITUDINAL CONTEXT" lines={['WHAT','CHANGED?']} image={PHOTO.autonomy} alt="A person working independently in a wood-lined study environment" description={content.hero.support} position="center 52%" variant="progress"/>
    <div className="vt-essay-intro" data-reveal><span className="vt-micro">BASELINE / LATER CONDITIONS</span><h2>Time adds context.<br/><em>It does not erase.</em></h2><p>Compare illustrative working environments. A genuine personal change requires at least two complete assessment records.</p></div>
    <section className="vt-time-comparison" aria-label="Illustrative timeline comparator">
      <div className="vt-time-stage" style={{'--split':split+'%'}}>
        <img src={PHOTO.autonomy} loading="lazy" alt="Illustrative baseline solo workspace" className="vt-time-image" />
        <div className="vt-time-mask"><img src={PHOTO.shared} loading="lazy" alt="Illustrative later collaborative workspace" className="vt-time-image" /></div>
        <span className="vt-time-tag vt-time-tag--left">BASELINE CONTEXT</span><span className="vt-time-tag vt-time-tag--right">LATER CONTEXT</span>
        <div className="vt-time-divider" aria-hidden="true"><span>↔</span></div>
      </div>
      <div className="vt-time-controls"><label htmlFor="vt-longitudinal-slider">MOVE THROUGH THE CHANGE IN CONTEXT</label><input id="vt-longitudinal-slider" type="range" min="5" max="95" value={split} onChange={e=>setSplit(Number(e.target.value))} aria-valuetext={split+' percent of the later illustrative environment'} /><output>{split}%</output></div>
    </section>
    <section className="vt-longitudinal-text">
      <article data-reveal><span className="vt-micro">01 / PRESERVE THE BASELINE</span><h2>{content.stabilityFinding}</h2><p>Without an earlier record, there is nothing reliable to compare. Source and context must remain available for later inspection.</p></article>
      <article data-reveal><span className="vt-micro">02 / READ THE CHANGE</span><h2>{content.adaptationFinding}</h2><p>Later conditions can alter the interpretation. Neither photograph represents the assessment history of a real person.</p></article>
    </section>
    <div className="vt-dark-quote" data-reveal><SourceNote dark/><p>One continuous source. Different contexts. No fabricated timeline.</p></div>
    <NextChapter to="/trust" number="05" title="FOLLOW THE EVIDENCE." subtitle="Every interpretation starts somewhere." image={PHOTO.proof}/>
  </PageFrame>;
}

export function TrustCinematicPage(){
  const steps=PUBLIC_CONTENT.trust.recordStateSteps;
  const [active,setActive]=useState(0);
  const step=steps[active];
  return <PageFrame className="trust">
    <Cover chapter="05" eyebrow="SOURCE & PROVENANCE" lines={['SHOW','THE SOURCE.']} image={PHOTO.proof} alt="Hands examining and arranging physical printed materials" description="Follow what was supplied, what was inferred, what was calculated, and what remains under your control." variant="trust"/>
    <div className="vt-essay-intro" data-reveal><span className="vt-micro">THE EVIDENCE NEVER DISAPPEARS</span><h2>Inspect the reading.<br/><em>Then its origin.</em></h2><p>Five stages explain the journey from a contextual answer to a professional comparison. Sample inputs are illustrative, not diagnoses.</p></div>
    <section className="vt-trust-inspection" aria-label="Explore the evidence chain">
      <div className="vt-trust-original"><img src={PHOTO.detail} loading="lazy" alt="Close-up of drafting material that represents source documentation"/><div><span className="vt-micro">ORIGINAL RECORD / ILLUSTRATIVE</span><blockquote>“{STATEMENT}”</blockquote></div></div>
      <div className="vt-trust-data"><span className="vt-micro">CURRENT LAYER / {String(active+1).padStart(2,'0')} OF 05</span>
        <h2>{step.name}</h2><strong>{step.title}</strong><p>{step.description}</p>
        <div className="vt-trust-step-buttons" role="group" aria-label="Select provenance stage">{steps.map((s,i)=><button key={s.id} className={i===active?'is-selected':''} aria-pressed={i===active} onClick={()=>setActive(i)}><span>{String(i+1).padStart(2,'0')}</span>{s.name}</button>)}</div>
        <p className="vt-trust-note">An illustrative provenance demonstration. The underlying system must pass validity and evidence-sufficiency checks.</p>
      </div>
    </section>
    <section className="vt-rights" data-reveal><div><span className="vt-micro">CONTROL & RESPONSIBILITY</span><h2>Your record.<br/>Your controls.</h2><p>Review export, transparency and account-removal actions in their authenticated contexts.</p></div><div className="vt-rights-list">{PUBLIC_CONTENT.trust.rightsActions.map((r,i)=><article key={r.id}><span>0{i+1}</span><div><h3>{r.label}</h3><p>{r.description}</p><CinemaLink className="vt-text-link" to={r.link}>Review this control ↗</CinemaLink></div></article>)}</div></section>
    <NextChapter to="/methodology" number="06" title="HOW IT WORKS." subtitle="The models, formulas and their limits." image={PHOTO.inquiry}/>
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
    <Cover chapter="06" eyebrow="METHODS & LIMITS" lines={['NO BLACK','BOX.']} image={PHOTO.inquiry} alt="A professional examining a complex technical workspace" description="Distinct psychometric frameworks, transparent career-fit weights, and explicit validity thresholds." variant="method"/>
    <div className="vt-method-intro" data-reveal><span className="vt-micro">A RECORD IS ONLY AS SOUND AS ITS EVIDENCE</span><h2>Methods must be<br/><em>visible.</em></h2><p>{PUBLIC_CONTENT.methodology.hero.support}</p></div>
    <div className="vt-monograph"><div className="vt-monograph-index"><span className="vt-micro">CONTENTS / 08 TOPICS</span>{sectionKeys.map((k,i)=><a href={'#method-'+k} key={k}><span>{String(i+1).padStart(2,'0')}</span>{sections[k].title}</a>)}</div><div className="vt-monograph-articles">{sectionKeys.map((k,i)=><article id={'method-'+k} key={k} data-reveal><div className="vt-micro">0{i+1} / {sections[k].role}</div><h2>{sections[k].title}</h2><p>{sections[k].description}</p><MethodDetail name={k} item={sections[k]}/></article>)}</div></div>
    <div className="vt-method-verdict"><span className="vt-micro">BOUNDARY OF THE SYSTEM</span><h2>Professional insight.<br/><em>Not clinical diagnosis.</em></h2><p>{sections.limits.description}</p><CinemaLink className="vt-text-link" to="/trust">Inspect the evidence chain ↗</CinemaLink></div>
    <NextChapter to="/privacy" number="07" title="YOUR DATA. YOUR TERMS." subtitle="Plain-language governance and account controls." image={PHOTO.detail}/>
  </PageFrame>;
}
export function PrivacyCinematicPage(){
  const data=PUBLIC_CONTENT.privacy;
  return <PageFrame className="privacy">
    <Cover chapter="07" eyebrow="GOVERNANCE & CONTROL" lines={['YOUR DATA.','YOUR TERMS.']} image={PHOTO.detail} alt="A professional examining the details of a physical draft" description={data.hero.support} variant="privacy"/>
    <div className="vt-privacy-brief" data-reveal><span className="vt-micro">PLAIN-LANGUAGE PRIVACY</span><h2>Make it<br/><em>understandable.</em></h2><p>Read the policies below and open your account controls when you are signed in. This text describes the published product policy.</p></div>
    <section className="vt-privacy-document"><nav aria-label="Policy table of contents"><span className="vt-micro">INDEX / 06 SECTIONS</span>{data.sections.map((s,i)=><a href={'#'+s.id} key={s.id}><span>{String(i+1).padStart(2,'0')}</span>{s.title}</a>)}</nav><div>{data.sections.map((s,i)=><article key={s.id} id={s.id} data-reveal><span className="vt-micro">POLICY / 0{i+1}</span><h2>{s.title}</h2><p>{s.content}</p></article>)}</div></section>
    <section className="vt-method-verdict"><span className="vt-micro">ACCOUNT CONTROLS</span><h2>Your record remains<br/><em>inspectable.</em></h2><CinemaLink className="vt-text-link" to="/account/privacy">Open privacy controls ↗</CinemaLink></section>
    <NextChapter to="/" number="01" title="BACK TO THE BEGINNING." subtitle="The story begins with one source response." image={PHOTO.source}/>
  </PageFrame>;
}
