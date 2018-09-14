import React from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

export default ({className, ...props}) => (
    <button
        className={classNames({
            [styles.linkbutton]: true,
            [className]: true,
        })}
        {...props}
    />
);
