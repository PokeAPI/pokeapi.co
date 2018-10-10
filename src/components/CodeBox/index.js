import React from 'react';
import classNames from 'classnames';
import SyntaxHighlighter from 'react-syntax-highlighter';
import JSONTree from 'react-json-tree';

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
    renderRaw = (children, language = 'json', small) => (
        <SyntaxHighlighter language={language}>
            {children}
        </SyntaxHighlighter>
    )
    renderExplorer = children => (
        <pre>
            <code>
                <JSONTree
                    data={JSON.parse(children)}
                    keyPath={[]}
                    invertTheme={false}
                    theme={{
                        base00: 'transparent',
                        base03: '#aaa',
                        base08: '#78a960',
                        base09: '#800',
                        base0B: '#800',
                        base0D: '#444',
                    }}
                    shouldExpandNode={() => true}
                />
            </code>
        </pre>
    )
    render() {
        const { children, small, language, title } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    {title && (
                        <h4 className={styles.title}>{title}</h4>
                    )}
                    <label className={styles.checkbox}>
                        <input type="checkbox" checked={this.state.viewRaw} onChange={this.viewRaw} />
                        View raw data
                    </label>
                </div>
                <div className={classNames({
                    [styles.codebox]: true,
                    [styles.small]: small,
                })}>
                    {this.state.viewRaw ? (
                        this.renderRaw(children, language, small)
                        ) : (
                        this.renderExplorer(children)
                    )}
                </div>
            </div>
        )
    }
}

export default CodeBox;
