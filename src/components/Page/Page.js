import React, {useEffect} from 'react';
import {Head} from 'react-static';

import styles from './Page.module.scss';

export function Page({children, title = null}) {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (title) title = `${title} - PokéAPI`;
    else title = 'PokéAPI';

    return (
        <React.Fragment>
            <Head>
                <title>{title}</title>
            </Head>

            {children}
        </React.Fragment>
    );
}

export function PlainPage({children, title = null}) {
    return (
        <Page title={title}>
            <div className={styles.page}>
                <div className={styles.constrain_width}>{children}</div>
            </div>
        </Page>
    );
}

export function PlainPageSection({children}) {
    return (
        <div className={styles.page}>
            <div className={styles.constrain_width}>{children}</div>
        </div>
    );
}
