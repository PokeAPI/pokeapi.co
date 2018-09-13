import React from 'react';

import styles from './index.module.scss';

const CallToAction = props => (
    <div className={styles.cta}>
        <div className={styles.container}>{props.children}</div>
    </div>
);

export default CallToAction;
