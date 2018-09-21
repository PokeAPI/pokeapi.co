import React from 'react';
import classNames from 'classnames';
import SyntaxHighlighter from 'react-syntax-highlighter';

import styles from './index.module.scss';

const CodeBox = ({children, small, language = 'json', title}) => (
    <div className={styles.container}>
        {title && (
            <h4 className={styles.title}>{title}</h4>
        )}
        <SyntaxHighlighter
            language={language}
            className={classNames({
                [styles.codebox]: true,
                [styles.small]: small,
            })}
        >
            {children}
        </SyntaxHighlighter>
    </div>
);

export default CodeBox;
