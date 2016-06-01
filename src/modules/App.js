// node
// vendors
import React from 'react';
// project
import Menu from 'components/Menu';
import AppUtils from 'helpers/AppUtils';
// locals

import AppCSS from './App.css';

const App = () => {
  const input = AppUtils.noOperation('World');
  return (
    <div className={AppCSS.mainApp}>
      <Menu />
      <h1>Hello, {input}!</h1>
    </div>
  );
};

export default App;
