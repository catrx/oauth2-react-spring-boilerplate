import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import App from "./app/App";
import {Provider} from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

registerServiceWorker();
