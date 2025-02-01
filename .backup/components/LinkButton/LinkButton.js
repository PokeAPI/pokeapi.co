import React from 'react';

import styles from './LinkButton.module.scss';

const LinkButton = ({className, ...props}) => (
    <button className={styles.linkbutton + ' ' + className} {...props} />
);

export default LinkButton;
