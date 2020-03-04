import React from 'react';
import marked from 'marked';
import classNames from 'classnames';
import hashSum from 'hash-sum';

import alerts from '../../../alerts.json';
import styles from './Alerts.module.scss';
// import XSvg from '../../images/ex.svg';

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
