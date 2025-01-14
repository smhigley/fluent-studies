import React from 'react';
import { Link, Text } from '@fluentui/react-components';

function Header() {
  return (
    <div className='header'>
      <Text as="h1" size={800}>Website management platform</Text>
      <div className='nav'>
        <Link href={'/list-study/'}>Home</Link>
        <Link href={'/list-study/metadata'}>Metadata</Link>
        <Link href={'/list-study/files'}>Files</Link>
        <Link href={'/list-study/plugins'}>Plugins</Link>
      </div>
    </div>
  );
}

export default Header;
