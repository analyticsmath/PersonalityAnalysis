import { useId, useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { PHASE3C_LAB_DISCLAIMER, profileData } from './labData';

const profileLenses = [
  ['personality', 'Personality'],
  ['riasec', 'Vocational Interests'],
  ['values', 'Work Values'],
  ['signals', 'Career Signals'],
];

const compactNumber = (value) => `${value}`;

function LabDisclaimer() {
  return <p className="phase3c-lab__disclaimer">{PHASE3C_LAB_DISCLAIMER}</p>;
}

function NumericTable({ title, rows }) {
  return (
    <details className="phase3c-a11y-table">
      <summary>Read {title} as a table</summary>
      <table>
        <thead>
          <tr>
            <th scope="col">Measure</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              <td>{compactNumber(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}

function LollipopMeasures({ rows, evidence = false, label }) {
  const titleId = useId();
  return (
    <div className="phase3c-lollipop" aria-labelledby={titleId}>
      <h3 id={titleId} className="sr-only">{label}</h3>
      {rows.map(([name, value, source]) => (
        <div className="phase3c-lollipop__row" key={name}>
          <div className="phase3c-lollipop__label">
            <span>{name}</span>
            {evidence ? <small>{source}</small> : null}
          </div>
          <div className="phase3c-lollipop__track" aria-label={`${name} ${value} out of 100`}>
            <span className="phase3c-lollipop__line" style={{ width: `${value}%` }} />
            <span className="phase3c-lollipop__dot" style={{ left: `${value}%` }} />
          </div>
          <strong>{value}</strong>
        </div>
      ))}
      <NumericTable title={label} rows={rows} />
    </div>
  );
}

function RiasecRadar() {
  const chartData = useMemo(
    () =>
      profileData.riasec.map(([name, value]) => ({
        label: name.slice(0, 1),
        name,
        value,
      })),
    []
  );

  return (
    <div className="phase3c-radar" aria-label="RIASEC radar using illustrative design-lab data">
      <ResponsiveContainer width="100%" height={282}>
        <RadarChart data={chartData} outerRadius="68%">
          <PolarGrid stroke="var(--lab-mist)" />
          <PolarAngleAxis dataKey="label" tick={{ fill: 'var(--lab-secondary)', fontSize: 12, fontWeight: 650 }} />
          <Radar
            dataKey="value"
            stroke="var(--lab-ink)"
            fill="var(--lab-dark-field)"
            fillOpacity={0.12}
            strokeWidth={1.5}
            isAnimationActive={false}
          />
          <Tooltip formatter={(value) => [`${value}`, 'Illustrative value']} />
        </RadarChart>
      </ResponsiveContainer>
      <ol className="phase3c-ranked-values">
        {profileData.riasec.map(([name, value]) => (
          <li key={name}>
            <span>{name}</span>
            <strong>{value}</strong>
          </li>
        ))}
      </ol>
      <NumericTable title="Vocational interest values" rows={profileData.riasec} />
    </div>
  );
}

function RankedBars({ rows, label }) {
  return (
    <div className="phase3c-ranked-bars">
      {rows.map(([name, value]) => (
        <div className="phase3c-ranked-bars__row" key={name}>
          <span>{name}</span>
          <div aria-label={`${name} ${value} out of 100`}>
            <i style={{ width: `${value}%` }} />
          </div>
          <strong>{value}</strong>
        </div>
      ))}
      <NumericTable title={label} rows={rows} />
    </div>
  );
}

function ProfileLens({ lens }) {
  if (lens === 'personality') {
    return <LollipopMeasures label="Big Five personality measures" rows={profileData.personality} />;
  }
  if (lens === 'riasec') return <RiasecRadar />;
  if (lens === 'values') return <RankedBars label="Work values hierarchy" rows={profileData.values} />;
  return <LollipopMeasures label="Career signal measures" rows={profileData.signals} evidence />;
}

export function LivingProfileLab() {
  const [lens, setLens] = useState('personality');

  return (
    <section className="phase3c-section phase3c-profile-lab" id="profile" aria-labelledby="phase3c-profile-title">
      <div className="phase3c-section__heading">
        <p className="phase3c-section__index">04</p>
        <div>
          <h2 id="phase3c-profile-title">Living Profile</h2>
          <p>One profile field; four ways of reading the same evidence.</p>
        </div>
      </div>
      <LabDisclaimer />
      <div className="phase3c-profile-field">
        <aside className="phase3c-profile-identity" aria-label="Persistent profile identity">
          <span className="phase3c-profile-identity__monogram">AM</span>
          <div>
            <p>Assessment research specimen</p>
            <strong>Adaptive profile</strong>
          </div>
        </aside>
        <div className="phase3c-tabs" role="tablist" aria-label="Profile representations">
          {profileLenses.map(([id, label]) => (
            <button
              type="button"
              key={id}
              role="tab"
              aria-selected={lens === id}
              aria-controls={`phase3c-lens-${id}`}
              onClick={() => setLens(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="phase3c-profile-reading" id={`phase3c-lens-${lens}`} role="tabpanel">
          <p className="phase3c-profile-reading__label">{profileLenses.find(([id]) => id === lens)?.[1]}</p>
          <ProfileLens lens={lens} />
        </div>
      </div>
    </section>
  );
}

const trendData = [
  { assessment: '1', openness: 76, autonomy: 82 },
  { assessment: '2', openness: 80, autonomy: 79 },
  { assessment: '3', openness: 78, autonomy: 84 },
];

function D0Dashboard() {
  return (
    <div className="phase3c-dashboard-zero" data-testid="phase3c-dashboard-d0">
      <div>
        <p className="phase3c-dashboard__status">0 completed assessments</p>
        <h3>Begin with the work you can describe.</h3>
        <p>Context intake establishes the material for the first adaptive assessment. No scores or analytics appear before completion.</p>
        <button type="button" className="phase3c-button">Start context intake</button>
      </div>
      <div className="phase3c-pending-illustration" aria-label="Custom illustration pending">
        <span>CUSTOM ILLUSTRATION PENDING</span>
      </div>
    </div>
  );
}

function D1Dashboard() {
  return (
    <div className="phase3c-dashboard-reading">
      <div className="phase3c-dashboard-reading__current">
        <p>Current profile</p>
        <LollipopMeasures label="Current personality snapshot" rows={profileData.personality.slice(0, 3)} />
      </div>
      <div className="phase3c-dashboard-reading__career">
        <p>Career relationships</p>
        <dl>
          <div><dt>Systems Architect</dt><dd>88%</dd></div>
          <div><dt>Product &amp; UX Designer</dt><dd>84%</dd></div>
          <div><dt>Data &amp; Evidence Analyst</dt><dd>81%</dd></div>
        </dl>
      </div>
    </div>
  );
}

function D2Dashboard() {
  return (
    <div className="phase3c-dashboard-trend">
      <div>
        <p>Profile readings across three assessments</p>
        <ResponsiveContainer width="100%" height={230}>
          <LineChart data={trendData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
            <CartesianGrid vertical={false} stroke="var(--lab-mist)" />
            <XAxis dataKey="assessment" tick={{ fill: 'var(--lab-secondary)', fontSize: 12 }} />
            <YAxis domain={[0, 100]} tick={{ fill: 'var(--lab-secondary)', fontSize: 11 }} />
            <Tooltip />
            <Line type="monotone" dataKey="openness" stroke="var(--lab-ink)" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="autonomy" stroke="var(--lab-info)" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <NumericTable title="2+ assessment demonstration" rows={trendData.map((point) => [`Assessment ${point.assessment}`, `Openness ${point.openness}; Autonomy ${point.autonomy}`])} />
    </div>
  );
}

export function DashboardMaturityLab() {
  const [state, setState] = useState('D0');
  return (
    <section className="phase3c-section phase3c-dashboard-lab" id="dashboard" aria-labelledby="phase3c-dashboard-title">
      <div className="phase3c-section__heading">
        <p className="phase3c-section__index">05</p>
        <div>
          <h2 id="phase3c-dashboard-title">Dashboard maturity</h2>
          <p>The dashboard changes meaningfully as assessment history grows.</p>
        </div>
      </div>
      <LabDisclaimer />
      <div className="phase3c-tabs phase3c-tabs--maturity" role="tablist" aria-label="Dashboard maturity state">
        {['D0', 'D1', 'D2+'].map((item) => (
          <button type="button" key={item} role="tab" aria-selected={state === item} onClick={() => setState(item)}>
            {item === 'D0' ? 'D0 — no assessment' : item === 'D1' ? 'D1 — one assessment' : 'D2+ — history'}
          </button>
        ))}
      </div>
      <div className="phase3c-dashboard-stage" role="tabpanel" aria-label={`${state} dashboard fixture`}>
        {state === 'D0' ? <D0Dashboard /> : null}
        {state === 'D1' ? <D1Dashboard /> : null}
        {state === 'D2+' ? <D2Dashboard /> : null}
      </div>
    </section>
  );
}

export function ChartResearchLab() {
  const areaData = [
    { phase: 'Context', signal: 16 },
    { phase: 'Question', signal: 34 },
    { phase: 'Response', signal: 58 },
    { phase: 'Profile', signal: 74 },
  ];
  return (
    <section className="phase3c-section phase3c-chart-lab" aria-labelledby="phase3c-charts-title">
      <div className="phase3c-section__heading">
        <p className="phase3c-section__index">06</p>
        <div>
          <h2 id="phase3c-charts-title">Chart grammar research</h2>
          <p>Conventional analytical charts paired with plain-language numeric alternatives.</p>
        </div>
      </div>
      <LabDisclaimer />
      <div className="phase3c-chart-research-grid">
        <div className="phase3c-chart-figure">
          <p>Big Five lollipop</p>
          <LollipopMeasures label="Big Five chart research" rows={profileData.personality} />
        </div>
        <div className="phase3c-chart-figure">
          <p>RIASEC radar + rank</p>
          <RiasecRadar />
        </div>
        <div className="phase3c-chart-figure">
          <p>Work Values hierarchy</p>
          <RankedBars label="Work Values chart research" rows={profileData.values} />
        </div>
        <div className="phase3c-chart-figure">
          <p>2+ assessment demonstration</p>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={areaData} margin={{ top: 12, right: 8, bottom: 0, left: -20 }}>
              <CartesianGrid vertical={false} stroke="var(--lab-mist)" />
              <XAxis dataKey="phase" tick={{ fill: 'var(--lab-secondary)', fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fill: 'var(--lab-secondary)', fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="signal" stroke="var(--lab-ink)" fill="var(--lab-soft-field)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <NumericTable title="Longitudinal research chart" rows={areaData.map(({ phase, signal }) => [phase, signal])} />
        </div>
      </div>
    </section>
  );
}

