import React from 'react';
import classNames from 'classnames';
import SyntaxHighlighter from 'react-syntax-highlighter';
import ReactJson from 'react-json-view';

import styles from './index.module.scss';

class CodeBox extends React.Component {
    state = { loaded: false };
    componentDidMount() {
        this.setState({ loaded: !this.state.loaded });
    }
    rawRender(children, language = 'json', small) {
        return (
            <SyntaxHighlighter
                language={language}
                className={classNames({
                    [styles.codebox]: true,
                    [styles.small]: small,
                })}
            >
                {children}
            </SyntaxHighlighter>
        )
    }
    explorerRender(children) {
        return <ReactJson src={JSON.parse(children)} collapsed={1} />
    }
    render() {
        const { children, small, language, title } = this.props;
        return (
            <div className={styles.container}>
                {title && (
                    <h4 className={styles.title}>{title}</h4>
                )}
                {this.state.loaded ? this.explorerRender(children) : this.rawRender(children, language, small)}
            </div>
        )
    }
}

export default CodeBox;
