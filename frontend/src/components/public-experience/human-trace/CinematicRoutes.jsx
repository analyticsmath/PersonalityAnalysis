import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import careersData from '../../../content/careers.json';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { useScrollSequence } from './useScrollSequence';
import { CinemaLink } from './CinematicPublicShell';

gsap.registerPlugin(ScrollTrigger);
const PATH='/media/public-experience/cinematic/';
const PHOTO={
  source:'/media/public-experience/digital/designer-1920.webp',
  detail:'/media/public-experience/digital/wireframe-1920.webp',
  precision:PATH+'1645258044234-f4ba2655baf1.jpg',
  autonomy:'/media/public-experience/digital/code-detail-1920.webp',
  shared:'/media/public-experience/digital/studio-1920.webp',
  collaboration:'/media/public-experience/digital/collaborate-1920.webp',
  pressure:PATH+'1554863798-d89af6030d7d.jpg',
  inquiry:'/media/public-experience/digital/code-detail-1920.webp',
  proof:'/media/public-experience/digital/wireframe-1920.webp',
  design:'/media/public-experience/digital/designer-1920.webp'
};
// Scored profiles remain subject to evidence-sufficiency checks.
const RECORD_STATEMENT='Your responses remain part of the record.';

function usePageChoreography(ref) {
  useEffect(()=>{
    const scope=ref.current;
    if(!scope) return;
    const mm=gsap.matchMedia();
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)',()=>{
      const ctx=gsap.context(()=>{
        const image=scope.querySelector('.vt-cover-photo');
        if(image) gsap.fromTo(image,{scale:1.04,yPercent:-2},{
          scale:1.17,yPercent:7,ease:'none',scrollTrigger:{trigger:scope.querySelector('.vt-cover'),start:'top top',end:'bottom top',scrub:.35,invalidateOnRefresh:true}
        });
        const cover = scope.querySelector('.vt-cover');
        const title = scope.querySelector('.vt-cover h1');
        if (title && !document.documentElement.dataset.cinematicTransition) gsap.fromTo(title, {y: 48, clipPath:'inset(0 0 100% 0)'}, {y:0,clipPath:'inset(0)',duration:1.05,ease:'power3.out'});
        if (cover) gsap.to(scope.querySelector('.vt-cover-copy'), {
          yPercent:-12,ease:'none',scrollTrigger:{trigger:cover,start:'top top',end:'bottom top',scrub:.3}
        });
        scope.querySelectorAll('.vt-next').forEach(chapter=>{
          gsap.fromTo(chapter,{clipPath:'inset(8% 5% 0)'},{clipPath:'inset(0)',ease:'none',scrollTrigger:{trigger:chapter,start:'top 90%',end:'top 25%',scrub:.22}});
          gsap.fromTo(chapter.querySelector('img'),{scale:1.15,yPercent:-4},{scale:1.15,yPercent:4,ease:'none',scrollTrigger:{trigger:chapter,start:'top bottom',end:'bottom top',scrub:.25}});
        });
        const methodScenes=[...scope.querySelectorAll('[data-method-scene]')];
        if(methodScenes.length){
          let current=0;
          const show=index=>{
            if(index===current)return;
            const previous=methodScenes[current],next=methodScenes[index];current=index;
            gsap.killTweensOf(methodScenes);
            methodScenes.forEach(scene=>{scene.classList.remove('is-current');scene.setAttribute('aria-hidden',String(scene!==next));gsap.set(scene,{opacity:scene===previous?1:0,zIndex:0});});
            gsap.set(previous,{zIndex:1});gsap.set(next,{opacity:1,zIndex:2});
            gsap.fromTo(next,{clipPath:'inset(100% 0 0)'},{clipPath:'inset(0)',duration:.65,ease:'power3.inOut',onComplete:()=>{if(methodScenes[current]===next)gsap.set(previous,{opacity:0});}});
          };
          scope.querySelectorAll('[data-method-step]').forEach((step,index)=>ScrollTrigger.create({trigger:step,start:'top 58%',end:'bottom 58%',onEnter:()=>show(index),onEnterBack:()=>show(index)}));
        }
        const comparator=scope.querySelector('.vt-time-stage');
        if(comparator) gsap.fromTo(comparator.querySelectorAll('img'),{scale:1.1,yPercent:-3},{scale:1.1,yPercent:3,ease:'none',scrollTrigger:{trigger:comparator,start:'top bottom',end:'bottom top',scrub:.25}});
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
  return <aside className={'vt-source-note'+(dark?' vt-source-note--dark':'')} aria-label="Your response and its interpretation">

    <p className="vt-record-statement">{RECORD_STATEMENT}</p>
    <small>Read the interpretation alongside its evidence and limits.</small>
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
  const copy=[
    ['Start with your own words.','Your response stays with the question and the situation it describes.'],
    ['Notice what matters.','Parts of an answer may point to different habits of thinking and acting. One answer is a starting point, not a conclusion.'],
    ['Look from more than one angle.','Personality, interests and work values describe different parts of the picture. Each needs enough evidence.'],
    ['See what contributes.','Career comparisons use explicit weights for interests, skills, values, traits, education and goals. You can inspect the calculation.'],
    ['Bring the picture together.','Your professional profile connects the interpretation to its evidence and keeps its limits visible.']
  ];
  const methodImages=[PHOTO.detail,PHOTO.source,PHOTO.collaboration,PHOTO.inquiry,PHOTO.source];
  return <PageFrame className="how">
    <Cover lines={['From your answers.','To your perspective.']} image={PHOTO.detail} alt="A website wireframe sketched on paper" description="Understand how your responses contribute to a profile of your personality, interests and work values." position="55% 45%" variant="how"/>
    <div className="vt-essay-intro" data-reveal><h2>Before the inference,<br/><em>there is a source.</em></h2><p>A single answer can suggest questions worth asking. A scored profile requires sufficient independent evidence.</p></div>
    <div className="vt-how-sequence">
      <aside className="vt-how-fixed">
        <div className="vt-method-gallery">{methodImages.map((image,i)=><figure key={i} data-method-scene={i} className={i===0?'is-current':''} aria-hidden={i!==0}><img src={image} loading="lazy" alt={['A wireframe preserves the structure behind an idea','A designer considers an interface in context','Different people bring different views to the same work','Software makes a calculation inspectable','The original working context returns to the profile'][i]}/></figure>)}</div>
        <div className="vt-how-fixed-shade"/><SourceNote dark/>
      </aside>
      <div className="vt-how-steps">
        {steps.map((step,i)=><article key={step.id} className="vt-how-step" data-method-step={i} id={'step-'+step.id} data-reveal>

          <h2>{copy[i][0]}</h2><p>{copy[i][1]}</p>
          {i===1&&<div className="vt-clause-pair"><span>Your words and their context</span><span>The patterns they may suggest</span></div>}
          {i===2&&<div className="vt-framework-small">{PUBLIC_CONTENT.home.models.list.slice(0,3).map(x=><span key={x.id}>{x.name}</span>)}</div>}
          {i===3&&<div className="vt-weight-tracks">{weights.map(w=><div key={w.id}><span>{w.label}</span><strong>{w.percentage}%</strong><i style={{width:w.percentage*3+'%'}}/></div>)}</div>}
        </article>)}
      </div>
    </div>
    <section className="vt-quiet-end" data-reveal><h2>No single response<br/>becomes a verdict.</h2><p>Inputs, inferred dimensions, explicit weights and limitations belong to separate stages of the record.</p><CinemaLink className="vt-text-link" to="/methodology">Examine the methodology ↗</CinemaLink></section>
    <NextChapter to="/career-intelligence" title="Explore your possibilities." subtitle="The same evidence meets different working conditions." image={PHOTO.precision}/>
  </PageFrame>;
}

const displayRequirement=value=>({
  'javascript':'JavaScript', 'typescript':'TypeScript', 'node.js':'Node.js', 'react':'React', 'html/css':'HTML & CSS',
  'apis':'APIs', 'api design':'API design', 'sql':'SQL', 'nosql':'NoSQL', 'python':'Python', 'c++':'C++',
  'ci/cd':'CI/CD', 'aws':'AWS', 'ux design':'UX design', 'ui design':'UI design',
}[value] || value.charAt(0).toUpperCase()+value.slice(1));
const ROLE_KEYS=Object.keys(careersData);
const mediaForRole=(key)=>{
  if(/designer|frontend|product_manager/.test(key))return PHOTO.design;
  if(/software|backend|data|machine_learning|cybersecurity|business_analyst/.test(key))return PHOTO.inquiry;
  if(/success|program_manager/.test(key))return PHOTO.shared;
  if(/devops/.test(key))return PHOTO.inquiry;
  if(/power_systems|control_systems|automation/.test(key))return PHOTO.precision;
  if(/electrical|embedded/.test(key))return PHOTO.precision;
  return PHOTO.autonomy;
};
export function CareerCinematicPage(){
  const keys=ROLE_KEYS;
  const [key,setKey]=useState(keys[0]);
  const sequence=useRef(null);
  const onSelect=useCallback(index=>setKey(ROLE_KEYS[index]),[]);
  const {controller,driven}=useScrollSequence(sequence,ROLE_KEYS.length,onSelect,"career");
  const refs=useRef([]);

  const changeByKeyboard=(event,i)=>{
    if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();
    const next=event.key==='Home'?0:event.key==='End'?keys.length-1:(i+(['ArrowDown','ArrowRight'].includes(event.key)?1:-1)+keys.length)%keys.length;
    controller.current.select(next);refs.current[next]?.focus({preventScroll:true});
  };
  return <PageFrame className="career">
    <Cover lines={['Find work','that speaks to you.']} image={PHOTO.design} alt="A product designer sketching a digital interface" description="Explore the skills, interests and conditions behind different careers. Give your next move a clearer context." position="55% center" variant="career"/>
    <div className="vt-essay-intro vt-essay-intro--dark" data-reveal><h2>Environments change.<br/><em>The questions change.</em></h2><p>Scroll through the work and the capabilities it calls for. These profiles describe occupations. A personal comparison needs your completed assessment.</p></div>
    <section ref={sequence} className="vt-career-explorer vt-career-sequence" aria-label="Explore 17 occupations">
      <div className="vt-career-stage" data-sequence-stage>
        <div className="vt-career-index"><p className="vt-scroll-invitation">Scroll to explore the work <span aria-hidden="true">↓</span></p><div className="vt-career-index-window" data-sequence-index-window>
          <div className="vt-career-index-belt" data-sequence-index role="tablist" aria-label="Occupational profiles" aria-orientation="vertical">{keys.map((k,i)=><button key={k} ref={el=>refs.current[i]=el} id={'vt-role-tab-'+k} role="tab" aria-controls="vt-career-detail" aria-selected={key===k} tabIndex={key===k?0:-1} onClick={()=>controller.current.select(i)} onKeyDown={e=>changeByKeyboard(e,i)} className={key===k?'is-selected':''}>{careersData[k].title}<span aria-hidden="true">↗</span></button>)}</div>
        </div></div>
        <div className="vt-career-display" id="vt-career-detail" role="tabpanel" aria-labelledby={'vt-role-tab-'+key} tabIndex={0}>
          <div className="vt-career-photo-window"><div className="vt-career-photo-belt" data-sequence-belt>{keys.map(k=>{
            const role=careersData[k];
            return <figure data-sequence-panel key={k} aria-hidden={driven?key!==k:undefined} className={key===k?'is-selected':''}>
              <div className="vt-career-image-frame" data-transition-media={key===k?"":undefined}><img src={mediaForRole(k)} loading="lazy" alt={'Illustrative professional working context for '+role.title}/></div>
              <figcaption className="vt-career-inspection"><h2>{role.title}</h2><div className="vt-career-inspection-grid"><div><strong>What the work calls for</strong><p>{role.skills.slice(0,5).map(displayRequirement).join(' · ')}</p></div><div><strong>Knowledge behind the work</strong><p>{role.subjects.slice(0,4).map(displayRequirement).join(' · ')}</p></div></div><small>Occupational requirements. Not a personal career-fit score.</small></figcaption>
            </figure>;
          })}</div></div>
        </div>
      </div>
    </section>
    <section className="vt-quiet-end" data-reveal><h2>Look beyond<br/>a job title.</h2><p>Your interests, skills, values and experience each contribute to a career comparison. Explore how the calculation brings them together.</p><CinemaLink className="vt-text-link" to="/methodology">Explore the scoring model ↗</CinemaLink></section>
    <NextChapter to="/progress" title="See what changes." subtitle="Return to the same record over time." image={PHOTO.shared}/>
  </PageFrame>;
}

export function ProgressCinematicPage(){
  const [split,setSplit]=useState(55);
  const content=PUBLIC_CONTENT.progress;
  return <PageFrame className="progress">
    <Cover lines={['A little distance.','A different view.']} image={PHOTO.autonomy} alt="A developer concentrating on work at a laptop" description={content.hero.support} position="center 52%" variant="progress"/>
    <div className="vt-essay-intro" data-reveal><h2>Time adds context.<br/><em>It does not erase.</em></h2><p>Compare illustrative working environments. A genuine personal change requires at least two complete assessment records.</p></div>
    <section className="vt-time-comparison" aria-label="Illustrative timeline comparator">
      <div className="vt-time-stage" style={{'--split':split+'%'}}>
        <img src={PHOTO.autonomy} loading="lazy" alt="Illustrative baseline solo workspace" className="vt-time-image" />
        <div className="vt-time-mask"><img src={PHOTO.collaboration} loading="lazy" alt="Illustrative later collaborative workspace" className="vt-time-image" /></div>
        <span className="vt-time-tag vt-time-tag--left">Independent work</span><span className="vt-time-tag vt-time-tag--right">Working together</span>
        <div className="vt-time-divider" aria-hidden="true"><span>↔</span></div>
      </div>
      <div className="vt-time-controls"><label htmlFor="vt-longitudinal-slider">Compare the working environments</label><input id="vt-longitudinal-slider" type="range" min="5" max="95" value={split} onChange={e=>setSplit(Number(e.target.value))} aria-valuetext={split+' percent independent work, '+(100-split)+' percent working together'} /><output>{split}% independent</output></div>
    </section>
    <section className="vt-longitudinal-text">
      <article data-reveal><h2>{content.stabilityFinding}</h2><p>Without an earlier record, there is nothing reliable to compare. Source and context must remain available for later inspection.</p></article>
      <article data-reveal><h2>{content.adaptationFinding}</h2><p>Later conditions can alter the interpretation. Neither photograph represents the assessment history of a real person.</p></article>
    </section>
    <div className="vt-dark-quote" data-reveal><SourceNote dark/><p>Keep the earlier context in view. Understand what a later record adds.</p></div>
    <NextChapter to="/trust" title="See the evidence." subtitle="Every interpretation starts somewhere." image={PHOTO.proof}/>
  </PageFrame>;
}

const TRUST_READINGS={
  supplied:['Your response, in context.','The words you entered remain the starting point. They stay with the question and the situation they describe.'],
  inferred:['An interpretation, with limits.','Personality and interest dimensions describe patterns across your responses. Scored dimensions need enough evidence; one answer is not a result.'],
  calculated:['A calculation you can inspect.','Career comparisons bring interests, skills, values, traits, education and goals together through explicit weights.'],
  compared:['Different work. Different demands.','Explore engineering, design and analytical roles against their own capabilities and foundational domains.'],
  controlled:['Your information. Your choice.','Review your responses, export your record and manage deletion through the controls in your account.'],
};
export function TrustCinematicPage(){
  const steps=PUBLIC_CONTENT.trust.recordStateSteps;
  const [active,setActive]=useState(0);
  const sequence=useRef(null);
  const {controller,driven}=useScrollSequence(sequence,steps.length,setActive,"trust");
  return <PageFrame className="trust">
    <Cover lines={['Insight.','With its evidence.']} image={PHOTO.proof} alt="An interface wireframe showing the thinking behind an idea" description="See the evidence behind an interpretation. Understand its limits. Keep control of your information." variant="trust"/>
    <div className="vt-essay-intro" data-reveal><h2>Inspect the reading.<br/><em>Then its origin.</em></h2><p>Follow the stages from a contextual answer to a professional comparison. Each stage has a different purpose and a different limit.</p></div>
    <section ref={sequence} className="vt-trust-sequence" aria-label="Explore the evidence chain">
      <div className="vt-trust-stage" data-sequence-stage><div className="vt-trust-panel-window"><div className="vt-trust-belt" data-sequence-belt>
        {steps.map((step,i)=><article className="vt-trust-inspection" data-sequence-panel key={step.id} aria-hidden={driven?active!==i:undefined}>
          <div className="vt-trust-original" data-transition-media={active===i?"":undefined}><img src={[PHOTO.detail,PHOTO.design,PHOTO.inquiry,PHOTO.collaboration,PHOTO.source][i]} loading="lazy" alt={['A website wireframe showing the structure of an idea','A designer considering the details of an interface','A developer working with software','Colleagues sharing a digital working environment','A designer reviewing their own digital work'][i]}/><span className="vt-trust-scene-title" aria-hidden="true">{step.name}</span><div><p className="vt-record-statement">{[RECORD_STATEMENT,'An interpretation begins with context.','See what contributes to the calculation.','A direction deserves more than one perspective.','Your record remains yours to inspect.'][i]}</p></div></div>
          <div className="vt-trust-data"><h2>{step.name}</h2><strong>{TRUST_READINGS[step.id][0]}</strong><p>{TRUST_READINGS[step.id][1]}</p></div>
        </article>)}
      </div></div><div className="vt-trust-step-buttons" role="group" aria-label="Select provenance stage">{steps.map((step,i)=><button key={step.id} className={i===active?'is-selected':''} aria-pressed={i===active} onClick={()=>controller.current.select(i)}>{step.name}</button>)}</div></div>
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
    <Cover lines={['Understand','the thinking.']} image={PHOTO.inquiry} alt="A developer writing software on a laptop" description="Explore the models behind your profile and the factors behind a career comparison." variant="method"/>
    <div className="vt-method-intro" data-reveal><h2>Methods must be<br/><em>visible.</em></h2><p>{PUBLIC_CONTENT.methodology.hero.support}</p></div>
    <div className="vt-monograph"><div className="vt-monograph-index">{sectionKeys.map(k=><a href={'#method-'+k} key={k}>{sections[k].title}</a>)}</div><div className="vt-monograph-articles">{sectionKeys.map(k=><article id={'method-'+k} key={k} data-reveal><h2>{sections[k].title}</h2><p>{sections[k].description}</p><MethodDetail name={k} item={sections[k]}/></article>)}</div></div>
    <div className="vt-method-verdict"><h2>Professional insight.<br/><em>Not clinical diagnosis.</em></h2><p>{sections.limits.description}</p><CinemaLink className="vt-text-link" to="/trust">Inspect the evidence chain ↗</CinemaLink></div>
    <NextChapter to="/privacy" title="Your information. Your choice." subtitle="Plain-language governance and account controls." image={PHOTO.detail}/>
  </PageFrame>;
}
export function PrivacyCinematicPage(){
  const data=PUBLIC_CONTENT.privacy;
  return <PageFrame className="privacy">
    <Cover lines={['Your information.','Your choice.']} image={PHOTO.detail} alt="A website wireframe with handwritten planning notes" description={data.hero.support} variant="privacy"/>
    <div className="vt-privacy-brief" data-reveal><h2>Make it<br/><em>understandable.</em></h2><p>Read the policies below and open your account controls when you are signed in. This text describes the published product policy.</p></div>
    <section className="vt-privacy-document"><nav aria-label="Policy table of contents">{data.sections.map(s=><a href={'#'+s.id} key={s.id}>{s.title}</a>)}</nav><div>{data.sections.map(s=><article key={s.id} id={s.id} data-reveal><h2>{s.title}</h2><p>{s.content}</p></article>)}</div></section>
    <section className="vt-method-verdict"><h2>Your record remains<br/><em>inspectable.</em></h2><CinemaLink className="vt-text-link" to="/account/privacy">Open privacy controls ↗</CinemaLink></section>
    <NextChapter to="/" title="A clearer direction." subtitle="The story begins with one source response." image={PHOTO.source}/>
  </PageFrame>;
}
