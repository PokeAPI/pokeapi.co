import React from 'react';

import Layout, {PageContent} from '../components/Layout';
import TitleAndMetaTags from '../components/TitleAndMetaTags';

export default function StatusPage() {
    return (
        <Layout>
            <PageContent>
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
            </PageContent>
        </Layout>
    );
}
