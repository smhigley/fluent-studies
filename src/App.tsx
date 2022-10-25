import React from 'react';
import { Button, Text } from '@fluentui/react-components';
import { FormA } from './FormA';
import { FormB } from './FormB';
import './App.css';

function App() {
  const [showForm, setShowForm] = React.useState<'a' | 'b'>();
  const [formAComplete, setFormAComplete] = React.useState(false);
  const [formBComplete, setFormBComplete] = React.useState(false);
  return (
    <div style={{ padding: '2em' }}>
      {!showForm ?
        <div>
          <Text size={800} as="h1">Fluent & Fable usability study</Text>
          <p><Button onClick={() => setShowForm('a')}>Jump to Lunch Form</Button></p>
          <p><Button onClick={() => setShowForm('b')}>Jump to Dinner Form</Button></p>
        </div>
      : null}
      {showForm === 'a' ? 
        <FormA showNextForm={!formBComplete} onFormSubmit={() => {
          setFormAComplete(true);
          setShowForm(formBComplete ? undefined : 'b');
        }}></FormA>
      : null}
      {showForm === 'b' ? 
        <FormB showNextForm={!formAComplete} onFormSubmit={() => {
          setFormBComplete(true);
          setShowForm(formAComplete ? undefined : 'a');
        }}></FormB>
      : null}
    </div>
  );
}

export default App;
