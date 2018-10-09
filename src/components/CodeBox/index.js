import React from 'react';
import classNames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SyntaxHighlighter from 'react-syntax-highlighter';
import ReactJson from 'react-json-view';

import styles from './index.module.scss';

const CodeBox = ({children, small, language = 'json', title}) => (
    <div className={styles.container}>
        <Tabs forceRenderTabPanel>
            <div className={styles.header}>
                {title && (
                    <h4 className={styles.title}>{title}</h4>
                )}

                <TabList className={styles.tablist}>
                    <Tab className={styles.tab}>JSON Explorer</Tab>
                    <Tab className={styles.tab}>Plain Text</Tab>
                </TabList>
            </div>

            <TabPanel>
                <pre className={classNames({
                    [styles.codebox]: true,
                    [styles.json]: true,
                    [styles.small]: small,
                })}>
                    <code>
                        <ReactJson src={JSON.parse(children)} collapsed={1} style={{
                            fontFamily: 'inherit',
                        }} />
                    </code>
                </pre>
            </TabPanel>
            <TabPanel>
                <SyntaxHighlighter
                    language={language}
                    className={classNames({
                        [styles.codebox]: true,
                        [styles.small]: small,
                    })}
                >
                    {children}
                </SyntaxHighlighter>
            </TabPanel>
        </Tabs>
    </div>
);

export default CodeBox;
