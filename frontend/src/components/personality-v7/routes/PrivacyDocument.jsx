import React from 'react';
import { PUBLIC_CONTENT } from '../../../content/personality-v7/publicContent';
export const PrivacyDocument = () => { const data = PUBLIC_CONTENT.privacy; return <section className="pa-privacy-document" aria-labelledby="privacy-title"><header><h1 id="privacy-title">{data.title}</h1><p>{data.lead}</p></header><nav aria-label="Privacy document sections">{data.sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</nav><div>{data.sections.map((section) => <section id={section.id} key={section.id}><h2>{section.title}</h2><p>{section.content}</p></section>)}</div></section>; };
export default PrivacyDocument;
