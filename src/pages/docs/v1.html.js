import React from 'react';
import {Link} from 'gatsby';

import Layout from '../../components/Layout';
import Container from '../../components/Container';

export default ({location}) => (
    <Layout location={location}>
        <Container>
            <h1>v1 Docs</h1>
            <ul>
                <li>
                    <Link to="/docs/v1.html">v1</Link>
                </li>
                <li>
                    <Link to="/docs/v2.html">v2</Link>
                </li>
            </ul>
        </Container>
    </Layout>
);
