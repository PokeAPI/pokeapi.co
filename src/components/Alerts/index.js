import React from 'react';
import marky from 'marky-markdown';
import classNames from 'classnames';

import alerts from '../../../alerts.json';
import styles from './index.module.scss';

const Alert = ({message, important}) => (
    <div
        className={classNames({
            [styles.alert]: true,
            [styles.important]: important,
        })}
    >
        <div
            className={styles.container}
            dangerouslySetInnerHTML={{
                __html: marky(message, {sanitize: true}),
            }}
        />
    </div>
);

export default () => {
    const activeAlerts = alerts.filter(alert => alert.active !== false);
    if (activeAlerts.length > 0) {
        return activeAlerts.map(alert => (
            <Alert key={alert.message} {...alert} />
        ));
    }
    return;
};
