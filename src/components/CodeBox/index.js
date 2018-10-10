import React from 'react';
import classNames from 'classnames';
import SyntaxHighlighter from 'react-syntax-highlighter';
import ReactJson from 'react-json-view';

import styles from './index.module.scss';

class CodeBox extends React.Component {
    state = { viewRaw: true };
    componentDidMount() {
        this.setState({ viewRaw: false });
    }
    viewRaw = e => {
        const checked = e.target.checked;
        this.setState({ viewRaw: checked });
    }
    rawRender(children, language = 'json', small) {
        return (
            <SyntaxHighlighter language={language}>
                {children}
            </SyntaxHighlighter>
        )
    }
    explorerRender(children) {
        return (
            <pre>
                <code>
                    <ReactJson src={JSON.parse(children)} collapsed={1} style={{
                        fontFamily: 'inherit',
                    }} />
                </code>
            </pre>
        )
    }
    render() {
        const { children, small, language, title } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    {title && (
                        <h4 className={styles.title}>{title}</h4>
                    )}
                    <label className={styles.checkbox}>
                        <input type="checkbox" value={this.state.viewRaw} onChange={this.viewRaw} />
                        View raw data
                    </label>
                </div>
                <div className={classNames({
                    [styles.codebox]: true,
                    [styles.small]: small,
                })}>
                    {this.state.viewRaw ? (
                        this.rawRender(children, language, small)
                        ) : (
                        this.explorerRender(children)
                    )}
                </div>
            </div>
        )
    }
}

export default CodeBox;
