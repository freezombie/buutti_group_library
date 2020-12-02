import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { AppContextProvider } from "./components/AppContext";


ReactDOM.render(
    <AppContextProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
  </AppContextProvider>,
  document.getElementById('root')
);
