"use client";
import React, { ChangeEvent, useState, useEffect } from 'react';
import i18next from '../i18n';
import LayoutBox from './layoutBox';

const LanguageSwitcherTest1: React.FC = () => {
  const [text, setText] = useState({
    layout: '',
    moveshape: '',
    moveposition: '',
  });
  const [lng, setLng] = useState({
    en: '',
    th: '',
  })

  useEffect(() => {
    setText(i18next.t('layoutPage', { returnObjects: true }));
    setLng(i18next.t('language', { returnObjects: true }));
  }, []);

  const changeLanguage = (language: string) => {
    i18next.changeLanguage(language);
    setText(i18next.t('layoutPage', { returnObjects: true }));
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
          <option value="English">{lng.en}</option>
          <option value="Thai">{lng.th}</option>
        </select>
      </div>

      <LayoutBox layoutText={text.layout} movePosition={text.moveposition} moveShape={text.moveshape} />
    </div>
  );
};

export default LanguageSwitcherTest1;
