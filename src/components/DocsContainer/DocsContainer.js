import React from 'react';

import BreadCrumbs from '../BreadCrumbs';
import TableOfContents from '../TableOfContents';

import styles from './DocsContainer.module.scss';

const DocsContainer = ({children, toc}) => (
    <div className={styles.container}>
        <nav className={styles.nav}>

            <div className={styles.breadcrumbs}>
                <h2 hidden aria-hidden="false">
                    Contents (breadcrumbs navigation)
                </h2>
                <BreadCrumbs entries={toc} />
            </div>

            <div className={styles.tableofcontents}>
                <h2 className={styles.title}>Contents</h2>
                <TableOfContents entries={toc} />
            </div>
        </nav>
        <div className={styles.content}>{children}</div>
    </div>
);

export default DocsContainer;
