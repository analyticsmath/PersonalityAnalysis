import React from 'react';
import { Link } from 'react-router-dom';
import MediaPlane from '../motion/MediaPlane';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v7/publicContent';
const rows = [['Data source', 'Professional context and responses are provided by the person completing the assessment.'], ['Separate readings', 'Different frameworks are kept distinct so their roles can be inspected.'], ['User controls', 'Available account controls and policy links explain the options around a record.'], ['Privacy', 'Read the policy for the terms that apply to information and account controls.']];
export const TrustLedger = () => <section className="pa-trust-field" aria-labelledby="trust-field-title"><header><h1 id="trust-field-title">Every result should show its work.</h1><p>A calm view of what enters the record and where to inspect its boundaries.</p></header><MediaPlane asset={MEDIA_ASSETS_V7.a08} priority alt="Two hands approaching across a textured wall" /><div className="pa-trust-field__rows">{rows.map(([title, body]) => <article key={title}><h2>{title}</h2><p>{body}</p></article>)}</div><nav><Link to="/privacy">Read privacy policy</Link><Link to="/methodology">Read methodology</Link><Link to={PUBLIC_CONTENT.trust.controls.privacyControlsLink}>Manage privacy controls</Link></nav></section>;
export default TrustLedger;
