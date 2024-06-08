
import React from "react";
import Navigation from "./components/nav";

export default function Home() {

  return (
    <main style={{ 'backgroundColor': '#ffa200',
      'backgroundImage': 'linear-gradient(to right, #6eda78, #ffa200 )', 'color': '#000' }}>
      <Navigation />
    </main>
  );
}
