import React from 'react';

import Container from '../Container';
import styles from './DocsContainer.module.scss';

const DocsContainer = ({children, TOC}) => (
    <Container className={styles.container}>
        <nav className={styles.nav}>
            <TOC />
        </nav>
        <div className={styles.content}>
            {children}
        </div>
    </Container>
);

export default DocsContainer;
