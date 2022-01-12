import React, {useState, useEffect} from 'react';

import useClipboard from 'react-use-clipboard';
import styles from './Input.module.scss';

export default function Input2({
    urlPrefix = 'https://',
    defaultValue = '',
    onSubmit = () => {},
}) {
    const [value, setValue] = useState(defaultValue);

    const [tooltip, setTooltip] = useState('Copy to clipboard');
    const [isCopied, setCopied] = useClipboard(`${urlPrefix}${value}`);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        if (isCopied) {
            setTooltip('Copied!');
        } else {
            setTooltip('Copy to clipboard');
        }
    }, [isCopied]);

    return (
        <form
            onSubmit={event => {
                event.preventDefault();
                onSubmit(value);
            }}
            className={styles.container}
        >
            <label htmlFor="url-input" className={styles.prefix}>
                <span hidden>Resource URL:</span>
                {urlPrefix}
            </label>
            <input
                id="url-input"
                className={styles.input}
                type="text"
                value={value}
                onChange={event => setValue(event.target.value)}
            />
            <div className={styles.tooltip}>
                <button
                    className={styles.buttoncopy}
                    type="button"
                    onClick={setCopied}
                >
                    <svg
                        className={styles.iconcopy}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                        ></path>
                    </svg>
                    <span className={styles.tooltiptext}>
                        {tooltip}
                    </span>
                </button>
            </div>
            <button type="submit" className={styles.button}>
                Submit
            </button>
        </form>
    );
}
