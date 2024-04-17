// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PhantomConnect from './PhantomConnect'; // Import the PhantomConnect component
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <PhantomConnect /> {/* Render the PhantomConnect component */}
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
