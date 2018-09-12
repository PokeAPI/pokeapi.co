import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {StaticQuery, graphql} from 'gatsby';

import Header from './LayoutHeader';
import Content from './LayoutContent';
import Footer from './LayoutFooter';
import TitleAndMetaTags from './TitleAndMetaTags';
import 'Layout.global.scss';
// import ViewportSizeHint from './ViewportSizeHint';

const Layout = ({children, location}) => (
    <StaticQuery
        query={graphql`
            query SiteTitleQuery {
                site {
                    siteMetadata {
                        title
                        url
                    }
                }
            }
        `}
        render={data => (
            <React.Fragment>
                <Helmet>
                    <html lang="en" />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Lato:400,700"
                    />
                </Helmet>
                <TitleAndMetaTags
                    title={data.site.siteMetadata.title}
                    url={data.site.siteMetadata.url}
                />
                <Header
                    siteTitle={data.site.siteMetadata.title}
                    location={location}
                />
                <Content>{children}</Content>
                {/* <ViewportSizeHint /> */}

                <Footer />
            </React.Fragment>
        )}
    />
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
