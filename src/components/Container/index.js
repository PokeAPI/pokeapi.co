import React from 'react';

import styles from './index.module.scss';

export default ({children, isNarrow}) => (
    <div className={styles.container}>
        {isNarrow ? <div className={styles.narrow}>{children}</div> : children}
    </div>
);
