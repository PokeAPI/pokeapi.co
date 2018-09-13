import React from 'react';

import styles from './index.module.scss';

export const CellContainer = ({children}) => (
    <div className={styles.container}>{children}</div>
);

export const Cell = ({children, title}) => (
    <div className={styles.cell}>
        <h2 className={styles.cell_title}>{title}</h2>
        <div className={styles.cell_container}>{children}</div>
    </div>
);
