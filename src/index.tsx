import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'typeface-roboto'
import * as ReactDOMClient from 'react-dom/client';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
