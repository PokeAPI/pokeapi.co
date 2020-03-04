import React from 'react';
import {Root, Routes} from 'react-static';
import {Route} from 'react-router-dom';
import 'sanitize.css';

import './components/Layout.global.scss';

function App() {
    return (
        <Root>
            <React.Suspense fallback={<p>Loading...</p>}>
                <Route render={() => <Routes />} />
            </React.Suspense>
        </Root>
    );
}

export default App;
