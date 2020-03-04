import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

import styles from './HeaderLink.module.scss';

export default class HeaderLink extends React.Component {
    componentDidMount() {
        if (this.props.isActive) {
            this.scrollIntoView();
        }
    }
    scrollIntoView = () => {
        if (this.button.scrollIntoView) {
            this.button.scrollIntoView({
                behaviour: 'smooth',
                inline: 'center',
            });
        }
    };
    render() {
        const {isActive, title, to} = this.props;
        return (
            <Link
                to={to}
                className={classNames({
                    [styles.link]: true,
                    [styles.link_active]: isActive,
                })}
                innerRef={node => (this.button = node)}
            >
                {title}
            </Link>
        );
    }
}
