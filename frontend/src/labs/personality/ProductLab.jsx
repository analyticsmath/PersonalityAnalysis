import React from 'react';
import MediaSurface from './MediaSurface';
import ProfessionalPortrait from './ProfessionalPortrait';
import './personality-labs.css';

export default function ProductLab() {
  return (
    <main className="pa-lab pa-product-lab">
      <a className="pa-skip-link" href="#product-content">Skip workspace navigation</a>
      <header className="pa-product-topbar"><a href="/__lab/personality-product">PERSONALITY<br />ASSESSOR</a><nav aria-label="Workspace"><a className="is-active" href="#product-content">Home</a><a href="#assessment">Assessment</a><a href="#careers">Careers</a><a href="#progress">Progress</a></nav><button type="button" aria-label="Open account menu">AN</button></header>
      <section id="product-content" className="pa-product-content">
        <div className="pa-product-intro"><p className="pa-eyebrow">HOME / FIRST VISIT</p><h1>Begin with the<br /><i>evidence you have.</i></h1><p>Build your first Professional Portrait from the context you choose to bring. Nothing is inferred until you complete the assessment.</p></div>
        <div className="pa-product-progress" aria-label="Professional Portrait is incomplete"><span>YOUR PROFESSIONAL PORTRAIT</span><strong>Not yet built</strong><p>Complete a first assessment to make patterns, alignment, and development options available here.</p><div className="pa-product-progress__line"><i /></div></div>
        <section className="pa-product-routes" aria-labelledby="start-profile-title"><div><p className="pa-eyebrow">START A PROFILE</p><h2 id="start-profile-title">Choose an entry point.</h2></div><div className="pa-route-list"><button type="button"><span>01</span><strong>Bring a CV</strong><em>Use your existing professional context as a starting signal.</em><b>→</b></button><button type="button"><span>02</span><strong>Build manually</strong><em>Add your role, experience, and intent directly.</em><b>→</b></button></div></section>
        <section className="pa-product-preview"><div className="pa-product-preview__media"><MediaSurface compact /></div><div><p className="pa-eyebrow">AFTER COMPLETION</p><h2>A portrait you can inspect, not just receive.</h2><ul><li>Evidence in context</li><li>Career alignment and gaps</li><li>A clear development path</li></ul><p className="pa-product-trust">Your profile remains private to your account. You decide what to add.</p></div><ProfessionalPortrait condensed /></section>
      </section>
    </main>
  );
}
