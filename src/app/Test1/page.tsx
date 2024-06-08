
import React from "react";
import LanguageSwitcher from '../components/lngTest1'

export default function Test1() {

  return (
    <main className="min-h-screen p-10" style={{ 'backgroundColor': '#ffa200',
      'backgroundImage': 'linear-gradient(to right, #6eda78, #ffa200 )', 'color': '#000'}}>
      <LanguageSwitcher />
    </main>
  );
}
