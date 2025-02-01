import React, {useState, useEffect} from 'react';

import ClipboardButton from './ClipboardButton';
import styles from './Input.module.scss';

export default function Input2({
    urlPrefix = 'https://',
    defaultValue = '',
    onSubmit = () => {},
}) {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

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
            <ClipboardButton text={`${urlPrefix}${value}`} />
            <button type="submit" className={styles.button}>
                Submit
            </button>
        </form>
    );
}
