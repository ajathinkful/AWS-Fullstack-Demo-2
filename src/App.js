import React from 'react';
import './App.css';
import Notes from './Notes'; // Make sure the path is correct

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Notes App</h1>
      </header>
      <main>
        <Notes />
      </main>
    </div>
  );
}

export default App;
