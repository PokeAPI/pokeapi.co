import React from 'react';
import marked from 'marked';
import classNames from 'classnames';
import Cookies from 'universal-cookie';
import hashSum from 'hash-sum';

import alerts from '../../../alerts.json';
import styles from './index.module.scss';
import XSvg from '../../images/ex.svg';

const cookies = new Cookies();

class Alert extends React.Component {
    constructor() {
        super();
        this.state = {
            mounted: false,
            dismissed: false,
        };
    }
    componentDidMount() {
        this.setState({
            mounted: true,
            dismissed: cookies.get(this.props.id),
        });
    }
    dismiss = () => {
        cookies.set(this.props.id, '1', {path: '/'});
        this.setState({dismissed: true});
    };
    render() {
        if (this.state.dismissed) return null;

        return (
            <div
                className={classNames({
                    [styles.alert]: true,
                    [styles.is_important]: this.props.important,
                })}
            >
                <div className={styles.container}>
                    <div
                        className={styles.message}
                        dangerouslySetInnerHTML={{
                            __html: this.props.htmlMessage,
                        }}
                    />
                    {this.state.mounted && (
                        <button
                            title="Dismiss"
                            className={styles.dismiss_button}
                            onClick={this.dismiss}
                        >
                            <span hidden>Dismiss</span>
                            <XSvg className={styles.image} aria-hidden />
                        </button>
                    )}
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
                important={alert.important}
                id={hashSum(alert)}
            />
        ));
    }
    return;
};

export default Alerts;
