import React from 'react';

import styles from './Faq.module.scss';

const Faq = ({title, children}) => (
    <React.Fragment>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.body}>{children}</div>
    </React.Fragment>
);

export default Faq;
