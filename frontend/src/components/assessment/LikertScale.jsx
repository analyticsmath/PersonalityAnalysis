import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LIKERT_OPTIONS = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
];

const LikertScale = ({ value = 0, onChange }) => {
  const optionRefs = useRef({});

  useEffect(() => {
    LIKERT_OPTIONS.forEach((item) => {
      const node = optionRefs.current[item.value];
      if (!node) return;

      const isActive = value === item.value;
      gsap.to(node, {
        duration: 0.18,
        ease: 'power2.out',
      });
    });
  }, [value]);

  return (
    <div className="scale-options scale-options--horizontal" role="radiogroup" aria-label="Likert response scale">
      {LIKERT_OPTIONS.map((item) => {
        const isActive = value === item.value;
        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            ref={(node) => {
              optionRefs.current[item.value] = node;
            }}
            className={`scale-option ${isActive ? 'scale-option--active is-selected' : ''}`}
            onClick={() => onChange(item.value)}
          >
            <span className="scale-option__value">{item.value}</span>
            <span className="scale-option__label">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LikertScale;
