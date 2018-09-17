import React from 'react';

import styles from './index.module.scss';

export default ({title, children}) => (
    <React.Fragment>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.body}>{children}</div>
    </React.Fragment>
);
