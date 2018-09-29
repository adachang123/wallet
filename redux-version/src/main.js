import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './component/App';
import walletApp from './reducer/Reducers'

const store = createStore(walletApp);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('app'));
