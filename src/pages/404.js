import React from 'react';

import Layout from '../components/Layout';
import Container from '../components/Container';
import TitleAndMetaTags from '../components/TitleAndMetaTags';

const PageNotFound = ({location}) => (
    <Layout location={location}>
        <Container isNarrow>
            <TitleAndMetaTags title="PokéAPI · Page Not Found" />
            <h1>404 – Page Not Found</h1>
            <p>We couldn't find what you were looking for.</p>
            <p>
                Please contact the owner of the site that linked you to the
                original URL and let them know their link is broken.
            </p>
        </Container>
    </Layout>
);
export default PageNotFound;
