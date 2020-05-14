import React, {useState, useEffect} from 'react';
import JSONTree from 'react-json-tree';

import dynamicTheme from './tomorrow.json';
import styles from './JsonViewer.module.scss';
import '../../utils/text-encoder-polyfill';

function DynamicViewer({data}) {
    return (
        <JSONTree
            data={data}
            hideRoot
            theme={dynamicTheme}
            shouldExpandNode={(keyName, data, level) =>
                // Collapse long arrays, large objects (except array items),
                // and arrays that are direct children of array items
                !(
                    (Array.isArray(data) && data.length > 3) ||
                    (!Number.isInteger(keyName[0]) &&
                        Object.keys(data).length > 3) ||
                    (Number.isInteger(keyName[1]) && Array.isArray(data))
                )
            }
        />
    );
}

export default function JsonViewer({data}) {
    const [isMounted, setIsMounted] = useState(false);
    const [viewRaw, setViewRaw] = useState(true);

    useEffect(() => {
        setIsMounted(true);
        setViewRaw(false);
    }, []);

    const jsonString = JSON.stringify(data, null, 2) || '';
    const jsonSize = new TextEncoder('utf-8').encode(jsonString).length / 1000; // kB
    const jsonLines = (jsonString.match(/\r?\n/g) || '').length + 1;

    return (
        <div className={styles.jsonviewer}>
            <div className={styles.json}>
                {!isMounted || viewRaw ? (
                    <pre className={styles.code}>
                        <code>{jsonString}</code>
                    </pre>
                ) : (
                    <DynamicViewer data={data} />
                )}
            </div>
            <div className={styles.toolbar}>
                <label
                    title={
                        !isMounted ? 'Disabled until JavaScript loads' : null
                    }
                >
                    <input
                        type="checkbox"
                        checked={viewRaw}
                        disabled={!isMounted}
                        onChange={event => setViewRaw(event.target.checked)}
                    />{' '}
                    View raw JSON ({jsonSize} kB, {jsonLines} lines)
                </label>
            </div>
        </div>
    );
}
