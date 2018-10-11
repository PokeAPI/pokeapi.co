import React from 'react';
import classNames from 'classnames';
import JSONTree from 'react-json-tree';
import SyntaxHighlighter from 'react-syntax-highlighter';

import tomorrowStyle from 'react-syntax-highlighter/styles/hljs/tomorrow';
import tomorrowTheme from './tomorrow.json';

import styles from './JsonViewer.module.scss';
import '../../utils/text-encoder-polyfill';

export default class JsonViewer extends React.Component {
    state = {
        mounted: false,
        viewRaw: true,
    };
    componentDidMount() {
        this.setState({
            mounted: true,
            viewRaw: false,
        });
    }
    handleInput = event => {
        this.setState({viewRaw: event.target.checked});
    };
    render() {
        const {mounted, viewRaw} = this.state;
        const {data = null} = this.props;

        const plainJson = JSON.stringify(data, null, 2);
        const jsonSize =
            new TextEncoder('utf-8').encode(plainJson).length / 1000; // kB
        const jsonLines = (plainJson.match(/\r?\n/g) || '').length + 1;

        return (
            <div className={styles.jsonviewer}>
                <div
                    className={classNames({
                        [styles.hidden]: !viewRaw,
                        [styles.json]: true,
                    })}
                >
                    <SyntaxHighlighter
                        language="json"
                        className={styles.code}
                        style={tomorrowStyle}
                    >
                        {plainJson}
                    </SyntaxHighlighter>
                </div>
                <div
                    className={classNames({
                        [styles.hidden]: viewRaw || !mounted,
                        [styles.json]: true,
                    })}
                >
                    <JSONTree
                        data={data}
                        hideRoot
                        theme={tomorrowTheme}
                        shouldExpandNode={(keyName, data, level) =>
                            // Collapse long arrays, large objects (except array items),
                            // and arrays that are direct children of array items
                            !(
                                (Array.isArray(data) && data.length > 3) ||
                                (!Number.isInteger(keyName[0]) &&
                                    Object.keys(data).length > 3) ||
                                (Number.isInteger(keyName[1]) &&
                                    Array.isArray(data))
                            )
                        }
                    />
                </div>


                <div className={styles.toolbar}>
                    <label title={!mounted ? 'Disabled until JavaScript loads' : null}>
                        <input
                            type="checkbox"
                            checked={this.state.viewRaw}
                            disabled={!mounted}
                            onChange={this.handleInput}
                        />{' '}
                        View raw JSON ({jsonSize} kB, {jsonLines} lines)
                    </label>
                </div>
            </div>
        );
    }
}
