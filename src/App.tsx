import React from 'react';
import { Link, Text } from '@fluentui/react-components';

function App() {
  return (
    <div style={{ padding: '2em' }}>
      <div>
        <Text size={800} as="h1">Fluent & Fable studies</Text>
        <p><Link href={'/grid-study/'}>Grid usability study (July 2024)</Link></p>
      </div>
    </div>
  );
}

export default App;
