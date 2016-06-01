// node
// vendors
import React from 'react';
// project
import Menu from 'components/Menu';
import AppUtils from 'helpers/AppUtils';
// locals

const App = () => {
  const input = AppUtils.noOperation('World');
  return (
    <div className="mainApp">
      <Menu />
      <h1>Hello, {input}!</h1>
    </div>
  );
};

export default App;
