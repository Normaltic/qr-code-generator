import React from 'react';
import Section from './components/Section';
import QROptionForm from './components/QROptionForm';

function App() {
  return (
    <div style={{ padding: '15px' }}>
      <Section>
        <QROptionForm onSubmit={args => console.log(args)} />
      </Section>
    </div>
  );
}

export default App;
