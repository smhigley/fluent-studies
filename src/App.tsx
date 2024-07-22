import React from 'react';
import { Link, Text } from '@fluentui/react-components';
import './App.css';

function App() {
  return (
    <div style={{ padding: '2em' }}>
      <div>
        <Text size={800} as="h1">Fluent & Fable usability study</Text>
        <p><Link href={'/pageA'}>Jump to test A</Link></p>
        <p><Link href={'/pageB'}>Jump to test B</Link></p>
      </div>
    </div>
  );
}

export default App;
