import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MediaPlane from '../motion/MediaPlane';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v7/publicContent';
import { getSignupAcquisitionUrl } from '../../../utils/personality-v4/navigation';
const assets = [MEDIA_ASSETS_V7.a03, MEDIA_ASSETS_V7.a04, MEDIA_ASSETS_V7.a05, MEDIA_ASSETS_V7.a06, MEDIA_ASSETS_V7.a02];
export const CareerIntelligenceIndex = () => { const worlds = PUBLIC_CONTENT.home.careerWorlds.worlds; const [active, setActive] = useState(0); const world = worlds[active]; return <section className="pa-career-index" aria-labelledby="career-index-title"><header><h1 id="career-index-title">Explore the conditions where work can make sense.</h1><p>Role worlds are prompts for reflection, not a prediction or a matching score.</p></header><div className="pa-career-index__body"><div className="pa-career-index__list" role="tablist" aria-label="Career environments">{worlds.map((item, index) => <button key={item.id} role="tab" aria-selected={active === index} onClick={() => setActive(index)}>{item.name}<span>{item.theme}</span></button>)}</div><article className="pa-career-index__preview" role="tabpanel"><MediaPlane asset={assets[active]} priority={active === 0} alt={`Career environment: ${world.name}`} /><div><h2>{world.name}</h2><p>{world.statement}</p><Link to={getSignupAcquisitionUrl()}>Begin with your context</Link></div></article></div></section>; };
export default CareerIntelligenceIndex;
