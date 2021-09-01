import React from 'react';
import Tabs from './Tabs';

import './style.css';

export default function App() {
  const tabs = new Array(100).fill(null).map((_, index) => `tab${index + 1}`);

  return (
    <div>
      <h1>Tabs</h1>
      <Tabs tabs={tabs} margin={5} />
    </div>
  );
}
