import React from 'react';
import classNames from 'classnames';

import storageAvailable from '../../utils/storageAvailable';
import styles from './Alert.module.scss';

export default function Alert({htmlMessage, level, id}) {
    const [isDismissed, setIsDismissed] = React.useState(true);

    React.useEffect(() => {
        if (storageAvailable('localStorage')) {
            setIsDismissed(!!localStorage.getItem('alert:' + id));
        }
    }, [id]);

    function dismiss() {
        if (storageAvailable('localStorage')) {
            localStorage.setItem('alert:' + id, '1');
        }
        setIsDismissed(true);
    }

    if (isDismissed) return null;

    return (
        <div
            className={classNames({
                [styles.alert]: true,
                [styles.level_important]: level === 'important',
                [styles.level_success]: level === 'success',
                [styles.level_info]: level === 'info',
            })}
        >
            <div className={styles.container}>
                <div
                    className={styles.message}
                    dangerouslySetInnerHTML={{__html: htmlMessage}}
                />
                <button
                    title="Dismiss"
                    className={styles.dismiss_button}
                    onClick={dismiss}
                >
                    <span hidden>Dismiss</span>

                    {/* X icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 352 512"
                        className={styles.image}
                        aria-hidden
                    >
                        <path
                            fill="currentColor"
                            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
