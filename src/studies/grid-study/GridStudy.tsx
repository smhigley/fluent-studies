import React from 'react';
import { Link, Text } from '@fluentui/react-components';

function GridApp() {
  return (
    <div style={{ padding: '2em' }}>
      <div>
        <Text size={800} as="h1">Fluent & Fable grid usability study</Text>
        <p><Link href={'/grid-study/pageA'}>Jump to test A</Link></p>
        <p><Link href={'/grid-study/pageB'}>Jump to test B</Link></p>
      </div>
    </div>
  );
}

export default GridApp;
