import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import './indexMobile.scss';
import { HashRouter } from 'react-router-dom';
import App from './App';


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
      <HashRouter>
          <App />
      </HashRouter>
);