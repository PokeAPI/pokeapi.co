import React from 'react';
import marked from 'marked';
import classNames from 'classnames';
import hashSum from 'hash-sum';

import alerts from '../../../alerts.json';
import styles from './Alerts.module.scss';
import XSvg from '../../images/ex.svg';

class Alert extends React.Component {
    state = {dismissed: true};
    componentDidMount() {
        this.setState({dismissed: !!localStorage.getItem(this.props.id)});
    }
    dismiss = () => {
        localStorage.setItem(this.props.id, '1');
        this.setState({dismissed: true});
    };
    render() {
        if (this.state.dismissed) return null;

        return (
            <div
                className={classNames({
                    [styles.alert]: true,
                    [styles.level_important]: this.props.level === 'important',
                    [styles.level_success]: this.props.level === 'success',
                    [styles.level_info]: this.props.level === 'info',
                })}
            >
                <div className={styles.container}>
                    <div
                        className={styles.message}
                        dangerouslySetInnerHTML={{
                            __html: this.props.htmlMessage,
                        }}
                    />
                    <button
                        title="Dismiss"
                        className={styles.dismiss_button}
                        onClick={this.dismiss}
                    >
                        <span hidden>Dismiss</span>
                        <XSvg className={styles.image} aria-hidden />
                    </button>
                </div>
            </div>
        );
    }
}

const Alerts = () => {
    const activeAlerts = alerts.filter(alert => alert.active !== false);
    if (activeAlerts.length > 0) {
        return activeAlerts.map(alert => (
            <Alert
                key={alert.message}
                htmlMessage={marked(alert.message)}
                level={alert.level || 'info'}
                id={hashSum(alert)}
            />
        ));
    }
    return null;
};

export default Alerts;
