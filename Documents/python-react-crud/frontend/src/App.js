import React, { Fragment } from 'react'
import Companies from './components/Companies';
import NavBar from './components/NavBar';

function App() {
  return (
    <Fragment>
      <NavBar />
      <div className="container p-3">
        <Companies />
      </div>
    </Fragment>
  );
}

export default App;
