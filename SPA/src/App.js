import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/structure/NavigationBar';

import { BrowserRouter as Router } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="body">       
          <NavigationBar />
      </div>
      <div>
      </div>
      
    </Router>
  );
}

export default App;
