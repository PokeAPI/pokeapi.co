import React from 'react';

import styles from './Banner.module.scss';

const Banner = ({children}) => (
    <div className={styles.banner}>
        <div className={styles.container}>{children}</div>
    </div>
);

export default Banner;
