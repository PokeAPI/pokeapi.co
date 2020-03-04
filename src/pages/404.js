import React from 'react';

import Layout, {PageContent} from '../components/Layout';
import TitleAndMetaTags from '../components/TitleAndMetaTags';

export default function PageNotFound() {
    return (
        <Layout>
            <PageContent>
                <TitleAndMetaTags title="PokéAPI · Page Not Found" />
                <h1>404 – Page Not Found</h1>
                <p>We couldn't find what you were looking for.</p>
                <p>
                    Please contact the owner of the site that linked you to the
                    original URL and let them know their link is broken.
                </p>
            </PageContent>
        </Layout>
    );
}
