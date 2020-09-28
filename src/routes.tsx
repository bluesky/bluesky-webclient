import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App'
import AcquirePage from './acquire'
import Header from './header';

const Routes: React.FunctionComponent = () => {
    return (
        <Router>
            <div>
                <Header />
                <Route exact path="/" component={App} />
                <Route exact path="/acquire" component={AcquirePage} />
            </div>
        </Router>
    );
};

export default Routes;
