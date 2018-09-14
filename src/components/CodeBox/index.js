import React from 'react';
import classNames from 'classnames';
import SyntaxHighlighter from 'react-syntax-highlighter';

import styles from './index.module.scss';

export default ({children, small, language = 'json'}) => (
    <SyntaxHighlighter
        language={language}
        className={classNames({
            [styles.codebox]: true,
            [styles.small]: small,
        })}
    >
        {children}
    </SyntaxHighlighter>
);
