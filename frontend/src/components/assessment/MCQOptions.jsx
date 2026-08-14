import React, { useEffect, useRef } from 'react';
import { FiCheck } from 'react-icons/fi';
import { gsap } from 'gsap';

const MCQOptions = ({ options = [], selectedOptionId = '', onSelect }) => {
  const optionRefs = useRef({});

  useEffect(() => {
    options.forEach((option, index) => {
      const key = option.id || String(index);
      const element = optionRefs.current[key];
      if (!element) return;

      const isActive = selectedOptionId === key;
      gsap.to(element, {
        duration: 0.18,
        ease: 'power2.out',
      });
    });
  }, [options, selectedOptionId]);

  return (
    <div className="adaptive-options-grid" role="radiogroup" aria-label="Multiple choice options">
      {options.map((option, index) => {
        const optionKey = option.id || String(index);
        const label = option.label || `Option ${index + 1}`;
        const code = option.id || String.fromCharCode(65 + index);
        const isActive = selectedOptionId === optionKey;

        return (
          <button
            key={optionKey}
            type="button"
            role="radio"
            aria-checked={isActive}
            ref={(node) => {
              optionRefs.current[optionKey] = node;
            }}
            className={`adaptive-option-card ${isActive ? 'is-active is-selected' : ''}`}
            onClick={() => onSelect(optionKey)}
          >
            <span className="adaptive-option-card__icon" aria-hidden="true">
              {code}
            </span>
            <span className="adaptive-option-card__label">{label}</span>
            {isActive && (
              <span className="adaptive-option-card__check" aria-hidden="true">
                <FiCheck />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default MCQOptions;
