import React from 'react';

import Layout from '../components/Layout';
import Container from '../components/Container';
import TitleAndMetaTags from '../components/TitleAndMetaTags';

const StatusPage = ({location}) => (
    <Layout location={location}>
        <Container isNarrow>
            <TitleAndMetaTags title="PokéAPI · Status Check" />
            <h1>Status Check</h1>
            <p>Wondering if the API is down? You can check the status using these links:</p>
            <ul>
                <li>
                    <a href="https://updown.io/pryw">
                        Documentation Status
                    </a>
                </li>
                <li>
                    <a href="https://updown.io/akzp">API Status</a>
                </li>
            </ul>
        </Container>
    </Layout>
);

export default StatusPage;
