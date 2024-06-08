"use client";
import React, { ChangeEvent, useState, useEffect } from 'react';
import i18next from '../i18n';
import LayoutBox from './layoutBox';

const LanguageSwitcher: React.FC = () => {
  const [helloText, setHelloText] = useState({
    layout: '',
    moveshape: '',
    moveposition: ''
  });

  useEffect(() => {
    setHelloText(i18next.t('layoutPage', { returnObjects: true }));
  }, []);

  const changeLanguage = (language: string) => {
    i18next.changeLanguage(language);
    setHelloText(i18next.t('layoutPage', { returnObjects: true }));
  };

  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  useEffect(() => {
    if (selectedLanguage === 'English') {
      changeLanguage('en');
    } else {
      changeLanguage('th');
    }
  }, [selectedLanguage]);

  return (
    <div>
      <div style={{display: "flex", justifyContent: "end"}}>
        <select name="selectLang" id="selectLang" onChange={handleChange} value={selectedLanguage}>
          <option value="English">EN</option>
          <option value="Thai">TH</option>
        </select>
      </div>

      <LayoutBox layoutText={helloText.layout} movePosition={helloText.moveposition} moveShape={helloText.moveshape} />
    </div>
  );
};

export default LanguageSwitcher;
