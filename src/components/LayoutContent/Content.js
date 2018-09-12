import classNames from 'classnames';
import React from 'react';

import styles from './Content.module.scss';

const Content = props => (
    <main
        className={classNames({
            'site-content': true,
            [styles.content]: true,
        })}
    >
        {props.children}
    </main>
);

export default Content;
