// node
// vendors
import React from 'react';
import { render } from 'react-dom';
// project
import App from 'App';
// locals

const rootNode = document.createElement('DIV');
render(<App />, rootNode);
document.body.appendChild(rootNode);
