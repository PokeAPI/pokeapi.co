import React from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

const LinkButton = ({className, ...props}) => (
    <button
        className={classNames({
            [styles.linkbutton]: true,
            [className]: true,
        })}
        {...props}
    />
);

export default LinkButton;
