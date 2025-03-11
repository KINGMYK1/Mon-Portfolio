import React from 'react';
import useTranslation from '../../hooks/useTranslation';
import './Skills.css';

const Skills = () => {
  const t = useTranslation();

  return (
    <div>
      <h1>{t.skills.title}</h1>
      <p>{t.skills.description}</p>
    </div>
  );
};

export default Skills;