import React from 'react';

import Layout from 'components/Layout';
import Container from 'components/Container';
// import Header from 'components/Header';
import TitleAndMetaTags from 'components/TitleAndMetaTags';

const PageNotFound = ({location}) => (
    <Layout location={location}>
        <Container>
            {/* <Header>404 – Page Not Found</Header> */}
            <TitleAndMetaTags title="PokéAPI · Page Not Found" />
            <div>
                <p>We couldn't find what you were looking for.</p>
                <p>
                    Please contact the owner of the site that linked you to the
                    original URL and let them know their link is broken.
                </p>
            </div>
        </Container>
    </Layout>
);
export default PageNotFound;
