import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App'
import UserPage from './user'

const Routerss: React.FunctionComponent = () => {
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<App/>} />
                <Route path="/user" element={<UserPage/>} />
            </Routes>
        </Router>
    );
};

export default Routerss;