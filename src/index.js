import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ResultTable from './components/Result';
import { PageHeader } from 'antd';

const routing = (
    <div>
        <PageHeader
            style={{
                border: '1px solid rgb(235, 237, 240)',
            }}
            onBack={() => window.history.back()}
            title="Bredin Prat"
            subTitle="Démonstration d'extraction de données"
        >
            <img src="addventa-1.png" className="logo-addv" />
        </PageHeader>
        <Router>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/result" component={ResultTable} />
            </div>
        </Router></div>
)
ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
