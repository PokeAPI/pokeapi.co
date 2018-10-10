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
                <label>
                    <input type="checkbox" value={this.state.viewRaw} onChange={this.viewRaw} />
                    View raw data
                </label>
                {title && (
                    <h4 className={styles.title}>{title}</h4>
                )}
                {this.state.viewRaw ? this.rawRender(children, language, small) : this.explorerRender(children)}
            </div>
        )
    }
}

export default CodeBox;
