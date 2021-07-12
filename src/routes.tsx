import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App'
import AcquirePage from './acquire'
import UserPage from './user'
import Header from './header';

const Routes: React.FunctionComponent = () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={App} />
                <Route exact path="/user" component={UserPage} />
            </div>
        </Router>
    );
};

export default Routes;