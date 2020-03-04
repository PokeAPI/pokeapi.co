import React from 'react';
import Helmet from 'react-helmet';

import SiteHeader from './LayoutHeader';
import SiteFooter from './LayoutFooter';
import TitleAndMetaTags from './TitleAndMetaTags';
import Alerts from './Alerts';

import styles from './Layout.module.scss';

export default function Layout({children}) {
    return (
        <React.Fragment>
            <Helmet>
                <html lang="en" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Lato:400,700"
                />
            </Helmet>
            <TitleAndMetaTags title="PokéAPI" />
            <SiteHeader siteTitle="PokéAPI" />
            <Alerts />
            <main className="site-content">{children}</main>
            <SiteFooter />
        </React.Fragment>
    );
}

export function PageContent({children}) {
    return (
        <div className={styles.page_content}>
            <div className={styles.constrain_width}>{children}</div>
        </div>
    );
}
