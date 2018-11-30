import React from 'react';

import Container from '../Container';
import TableOfContents from '../TableOfContents';

import styles from './DocsContainer.module.scss';

const DocsContainer = ({children, toc}) => (
    <Container className={styles.container}>
        <nav className={styles.nav}>
            <h2 hidden>Page Contents</h2>
            <div className={styles.tableofcontents}>
                <TableOfContents entries={toc} />
            </div>
        </nav>
        <div className={styles.content}>{children}</div>
    </Container>
);

export default DocsContainer;
