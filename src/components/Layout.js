import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import 'sanitize.css';

import SiteHeader from './LayoutHeader';
import SiteFooter from './LayoutFooter';
import TitleAndMetaTags from './TitleAndMetaTags';

import './Layout.global.scss';

const Layout = ({children, location}) => (
    <React.Fragment>
        <Helmet>
            <html lang="en" />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Lato:400,700"
            />
        </Helmet>
        <TitleAndMetaTags title="PokéAPI" />
        <SiteHeader siteTitle="PokéAPI" location={location} />
        <main className="site-content">{children}</main>
        <SiteFooter />
    </React.Fragment>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
};

export default Layout;
