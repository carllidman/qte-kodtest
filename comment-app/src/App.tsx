import React from 'react';
import logo from './assets/logo.svg';
import { CommentContainer } from './Components/CommentContainer/CommentContainer'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CommentContainer/>
      </header>
    </div>
  );
}

export default App;
