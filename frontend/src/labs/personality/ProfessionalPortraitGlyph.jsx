import { useId, useMemo, useState } from 'react';

const bounds = 620;
const edgeInset = 42;
const content = bounds - edgeInset * 2;

function inset(value) {
  return 15 + ((value / 100) * 62);
}

function buildGlyph(values) {
  const groups = [5, 6, 8, 4];
  const path = [`M ${edgeInset} ${edgeInset}`];
  const hits = [];
  let cursor = 0;
  const addTop = (count) => {
    const size = content / count;
    for (let index = 0; index < count; index += 1) {
      const start = edgeInset + (size * index);
      const end = start + size;
      const middle = start + (size / 2);
      const depth = inset(values[cursor][1]);
      path.push(`L ${start + size * 0.22} ${edgeInset} L ${middle} ${edgeInset + depth} L ${end - size * 0.22} ${edgeInset}`);
      hits.push({ index: cursor, d: `M ${start + size * 0.22} ${edgeInset} L ${middle} ${edgeInset + depth} L ${end - size * 0.22} ${edgeInset}` });
      cursor += 1;
    }
  };
  const addRight = (count) => {
    const size = content / count;
    for (let index = 0; index < count; index += 1) {
      const start = edgeInset + (size * index);
      const end = start + size;
      const middle = start + (size / 2);
      const depth = inset(values[cursor][1]);
      path.push(`L ${bounds - edgeInset} ${start + size * 0.22} L ${bounds - edgeInset - depth} ${middle} L ${bounds - edgeInset} ${end - size * 0.22}`);
      hits.push({ index: cursor, d: `M ${bounds - edgeInset} ${start + size * 0.22} L ${bounds - edgeInset - depth} ${middle} L ${bounds - edgeInset} ${end - size * 0.22}` });
      cursor += 1;
    }
  };
  const addBottom = (count) => {
    const size = content / count;
    for (let index = 0; index < count; index += 1) {
      const end = bounds - edgeInset - (size * index);
      const start = end - size;
      const middle = start + (size / 2);
      const depth = inset(values[cursor][1]);
      path.push(`L ${end - size * 0.22} ${bounds - edgeInset} L ${middle} ${bounds - edgeInset - depth} L ${start + size * 0.22} ${bounds - edgeInset}`);
      hits.push({ index: cursor, d: `M ${end - size * 0.22} ${bounds - edgeInset} L ${middle} ${bounds - edgeInset - depth} L ${start + size * 0.22} ${bounds - edgeInset}` });
      cursor += 1;
    }
  };
  const addLeft = (count) => {
    const size = content / count;
    for (let index = 0; index < count; index += 1) {
      const end = bounds - edgeInset - (size * index);
      const start = end - size;
      const middle = start + (size / 2);
      const depth = inset(values[cursor][1]);
      path.push(`L ${edgeInset} ${end - size * 0.22} L ${edgeInset + depth} ${middle} L ${edgeInset} ${start + size * 0.22}`);
      hits.push({ index: cursor, d: `M ${edgeInset} ${end - size * 0.22} L ${edgeInset + depth} ${middle} L ${edgeInset} ${start + size * 0.22}` });
      cursor += 1;
    }
  };
  addTop(groups[0]); addRight(groups[1]); addBottom(groups[2]); addLeft(groups[3]);
  return { path: `${path.join(' ')} Z`, hits };
}

export default function ProfessionalPortraitGlyph({ portrait, target, formation = false, compact = false }) {
  const [active, setActive] = useState(null);
  const id = useId().replace(/:/g, '');
  const values = useMemo(() => portrait.flatMap((group) => group.dimensions), [portrait]);
  const profile = useMemo(() => buildGlyph(values), [values]);
  const targetValues = useMemo(() => target ? values.map(([name], index) => [name, target[index]]) : null, [target, values]);
  const targetShape = useMemo(() => targetValues ? buildGlyph(targetValues) : null, [targetValues]);
  const detail = active === null ? null : values[active];

  return <div className={`portrait-glyph ${formation ? 'portrait-glyph--formation' : ''} ${compact ? 'portrait-glyph--compact' : ''}`}>
    <svg viewBox={`0 0 ${bounds} ${bounds}`} role="img" aria-labelledby={`${id}-title ${id}-desc`}>
      <title id={`${id}-title`}>Professional Portrait Glyph</title>
      <desc id={`${id}-desc`}>A single geometric form whose twenty-three perimeter cuts represent the demonstration personality dimensions.</desc>
      <defs>
        <clipPath id={`${id}-clip`}><path d={profile.path} /></clipPath>
      </defs>
      {formation && <image href="/media/personality/work/pa-work-02-software-overhead-1200.webp" x="0" y="0" width={bounds} height={bounds} preserveAspectRatio="xMidYMid slice" clipPath={`url(#${id}-clip)`} />}
      <path className="portrait-glyph__profile" d={profile.path} />
      {targetShape && <path className="portrait-glyph__target" d={targetShape.path} />}
      {profile.hits.map(({ index, d }) => <path
        className={`portrait-glyph__hit ${active === index ? 'is-active' : ''}`}
        d={d}
        key={values[index][0]}
        tabIndex="0"
        role="button"
        aria-label={`${values[index][0]}: ${values[index][1]} of 100`}
        onMouseEnter={() => setActive(index)}
        onMouseLeave={() => setActive(null)}
        onFocus={() => setActive(index)}
        onBlur={() => setActive(null)}
      />)}
    </svg>
    <span className="portrait-glyph__group portrait-glyph__group--top">Big Five</span>
    <span className="portrait-glyph__group portrait-glyph__group--right">RIASEC</span>
    <span className="portrait-glyph__group portrait-glyph__group--bottom">Work values</span>
    <span className="portrait-glyph__group portrait-glyph__group--left">Career signals</span>
    <p className="portrait-glyph__detail" aria-live="polite">{detail ? `${detail[0]} — ${detail[1]} / 100` : 'Explore the perimeter'}</p>
    <ul className="sr-only">{values.map(([name, value]) => <li key={name}>{name}: {value} of 100</li>)}</ul>
  </div>;
}
