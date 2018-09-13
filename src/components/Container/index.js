import React from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

export default ({children, isNarrow}) => (
    <div
        className={classNames({
            [styles.container]: true,
            [styles.narrow]: isNarrow,
        })}
    >
        {children}
    </div>
);
