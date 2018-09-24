import React from 'react';
import marked from 'marked';
import classNames from 'classnames';
import Cookies from 'universal-cookie';
import hashSum from 'hash-sum';

import alerts from '../../../alerts.json';
import styles from './index.module.scss';
import Pin from '../../images/pin.svg';
import Ex from '../../images/ex.svg';

const cookies = new Cookies();

const PinButton = ({pinned, important, ...props}) => {
    const title = pinned ? 'Un-pin' : 'Pin';
    return (
        <button title={title} className={styles.pin_button} {...props}>
            <span hidden>{title}</span>
            {pinned ? (
                <Ex className={styles.image} aria-hidden />
            ) : (
                <Pin className={styles.image} aria-hidden />
            )}
        </button>
    );
};

class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pinned: props.important,
            mounted: false,
        };
    }
    componentDidMount() {
        this.setState({mounted: true});

        const userPref = cookies.get(this.id);
        if (userPref !== undefined) {
            this.setState({pinned: userPref === '1' || false});
        }
    }
    get id() {
        return 'pin-' + hashSum(this.props.htmlMessage);
    }
    togglePin = () => {
        cookies.set(this.id, !this.state.pinned ? '1' : '0', {path: '/'});
        this.setState({pinned: !this.state.pinned});
    };
    render() {
        const {htmlMessage, important} = this.props;
        const {mounted, pinned} = this.state;
        return (
            <div
                className={classNames({
                    [styles.alert]: true,
                    [styles.is_important]: important,
                    [styles.is_pinned]: pinned,
                })}
            >
                <div className={styles.container}>
                    <div className={styles.message} dangerouslySetInnerHTML={{__html: htmlMessage}} />
                    {mounted &&
                        important && (
                            <PinButton
                                pinned={pinned}
                                important={important}
                                onClick={this.togglePin}
                            />
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
            />
        ));
    }
    return;
};

export default Alerts;
