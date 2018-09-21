import React from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

const Container = ({children, isNarrow, className, ...props}) => (
    <div
        className={classNames({
            [styles.container]: true,
            [className]: true,
        })}
        {...props}
    >
        {isNarrow ? <div className={styles.narrow}>{children}</div> : children}
    </div>
);

export default Container;
