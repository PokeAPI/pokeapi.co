import React from 'react';
import {Link} from 'react-router-dom';

import Layout, {PageContent} from '../components/Layout';

export default ({location}) => (
    <Layout location={location}>
        <PageContent>
            <h1>Docs</h1>
            <ul>
                <li>
                    <Link to="/docs/v1.html">v1</Link>
                </li>
                <li>
                    <Link to="/docs/v2.html">v2</Link>
                </li>
            </ul>
        </PageContent>
    </Layout>
);
