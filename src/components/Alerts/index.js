import React from 'react';
import marked from 'marked';
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
                __html: marked(message),
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
